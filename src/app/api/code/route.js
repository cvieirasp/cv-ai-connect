import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { auth } from '@clerk/nextjs'
import { increaseApiLimit, hasApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const key = process.env.OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: key,
})

const instructionMessage = {
  role: 'system',
  content:
    'You are a code generator. You must asnwer only in markdown code snippets. Use code comments for explanation.',
}

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

    const isFreeTrial = await hasApiLimit()
    const isPro = await checkSubscription()

    if (!isFreeTrial && !isPro) {
      return new NextResponse('Free trial has expired', { status: 403 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [instructionMessage, ...messages],
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.choices[0].message)
  } catch (err) {
    console.error('[CODE_ERROR]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
