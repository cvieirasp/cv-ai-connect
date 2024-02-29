'use client'

import { useState } from 'react'
import axios from 'axios'
import { Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SubscriptionButton = ({ isPro = false }) => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (err) {
      console.error('BILLING_ERROR', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      disabled={loading}
      variant={isPro ? 'default' : 'premium'}
      onClick={onClick}
    >
      {isPro ? 'Gerenciar Assinatura' : 'Atualizar'}
      {!isPro && <Zap className='ml-2 h-4 w-4 fill-white' />}
    </Button>
  )
}

export default SubscriptionButton
