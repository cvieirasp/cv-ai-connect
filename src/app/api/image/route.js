import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { auth } from '@clerk/nextjs'
import { increaseApiLimit, hasApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const key = process.env.OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: key,
})

export async function POST(req) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, amount = '1', resolution = '1024x1024' } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!key) {
      return new NextResponse('OpenAI API key not configured', { status: 500 })
    }

    if (!prompt) {
      return new NextResponse('Prompt are required', { status: 400 })
    }

    const isFreeTrial = await hasApiLimit()
    const isPro = await checkSubscription()

    if (!isFreeTrial && !isPro) {
      return new NextResponse('Free trial has expired', { status: 403 })
    }

    const response = await openai.images.generate({
      model: 'dall-e-2', // 'dall-e-3' or 'dall-e-2'
      prompt: prompt,
      n: parseInt(amount),
      size: resolution,
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.data)
  } catch (err) {
    console.error('[IMAGE_ERROR]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
