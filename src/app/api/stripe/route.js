import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
import stripe from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'

const settingsUrl = absoluteUrl('/settings')

export async function GET() {
  try {
    const { userId } = auth()
    const user = await currentUser()

    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items: [
        {
          price_data: {
            currency: 'BRL',
            product_data: {
              name: 'CV-AI-Connect PRO',
              description: 'Tenha acesso ilimitado à plataforma CV-AI-Connect',
            },
            unit_amount: 5000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      customer_email: user.emailAddresses[0].emailAddress,
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      metadata: {
        userId,
      },
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (err) {
    console.error('[STRIPE_ERROR]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
