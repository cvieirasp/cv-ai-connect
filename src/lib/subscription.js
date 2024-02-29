import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

const DAY_IN_MS = 1000 * 60 * 60 * 24

const checkSubscription = async () => {
  const { userId } = auth()

  if (!userId) {
    return false
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
    },
  })

  if (!userSubscription) {
    return false
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now()

  return !!isValid
}

export { checkSubscription }
