import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'
import { MAX_FREE_COUNTS } from '@/constants'

const increaseApiLimit = async () => {
  const { userId } = auth()

  if (!userId) {
    return
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    })
  } else {
    await prismadb.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    })
  }
}

const hasApiLimit = async () => {
  const { userId } = auth()

  if (!userId) {
    return false
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  return !userApiLimit || userApiLimit.count < MAX_FREE_COUNTS
}

const getApiLimitCount = async () => {
  const { userId } = auth()

  if (!userId) {
    return 0
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  return userApiLimit?.count || 0
}

export { increaseApiLimit, hasApiLimit, getApiLimitCount }
