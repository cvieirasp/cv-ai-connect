'use client'

import { useEffect, useState } from 'react'
import { Zap } from 'lucide-react'
import { MAX_FREE_COUNTS } from '@/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import useProModal from '@/hooks/use-pro-modal'

const FreeCounter = ({ apiLimitCount = 0, isPro = false }) => {
  const [isMounted, setIsMounted] = useState(false)
  const proModal = useProModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || isPro) {
    return null
  }

  return (
    <div className='px-3'>
      <Card className='border-0 bg-white/10'>
        <CardContent className='py-6'>
          <div className='mb-4 space-y-2 text-center text-sm text-white'>
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} requisições restantes
            </p>
            <Progress
              className='h-3'
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            className='w-full'
            variant='premium'
            onClick={proModal.onOpen}
          >
            Atualizar
            <Zap className='ml-2 h-4 w-4 fill-white' />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default FreeCounter
