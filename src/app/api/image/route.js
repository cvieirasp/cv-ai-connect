import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { auth } from '@clerk/nextjs'

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

    const response = await openai.images.generate({
      model: 'dall-e-2', // 'dall-e-3' or 'dall-e-2'
      prompt: prompt,
      n: parseInt(amount),
      size: resolution,
    })

    return NextResponse.json(response.data)
  } catch (err) {
    console.error('[IMAGE_ERROR]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
