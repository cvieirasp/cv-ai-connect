import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { auth } from '@clerk/nextjs'
import { increaseApiLimit, hasApiLimit } from '@/lib/api-limit'

const key = process.env.REPLICATE_API_TOKEN
const replicate = new Replicate({
  auth: key,
})

export async function POST(req) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!key) {
      return new NextResponse('Replicate API key not configured', {
        status: 500,
      })
    }

    if (!prompt) {
      return new NextResponse('Prompt are required', { status: 400 })
    }

    const isFreeTrial = await hasApiLimit()

    if (!isFreeTrial) {
      return new NextResponse('Free trial has expired', { status: 403 })
    }

    const response = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          /*fps: 24,
          model: "xl",
          width: 1024,
          height: 576,*/
          prompt: prompt,
          /*batch_size: 1,
          num_frames: 24,
          init_weight: 0.5,
          guidance_scale: 17.5,
          negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken",
          remove_watermark: false,
          num_inference_steps: 50*/
        },
      }
    )

    await increaseApiLimit()

    return NextResponse.json(response)
  } catch (err) {
    console.error('[VIDEO_ERROR]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
