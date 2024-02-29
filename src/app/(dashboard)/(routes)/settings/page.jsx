import { Settings } from 'lucide-react'
import Heading from '@/components/heading'
import { checkSubscription } from '@/lib/subscription'
import SubscriptionButton from '@/components/subscription-button'

const SettingsPage = async () => {
  const isPro = await checkSubscription()

  return (
    <div>
      <Heading
        title='Configurações'
        description='Gerencie as configurações da sua conta'
        icon={Settings}
        iconColor='text-gray-700'
        bgColor='bg-gray-700/10'
      />
      <div className='space-y-4 px-4 lg:px-8'>
        <div className='text-sm text-muted-foreground'>
          {isPro
            ? 'Você está atualmente no plano PRO.'
            : 'Você está atualmente no plano gratuito'}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}

export default SettingsPage
