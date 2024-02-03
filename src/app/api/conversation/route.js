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
    const { messages } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!key) {
      return new NextResponse('OpenAI API key not configured', { status: 500 })
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    return NextResponse.json(response.choices[0].message)
  } catch (err) {
    console.error('[CONVERSATION_ERROR]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
