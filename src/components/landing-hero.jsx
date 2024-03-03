'use client'

import { useAuth } from '@clerk/nextjs'
import TypewriterComponent from 'typewriter-effect'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const LandingHero = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className='space-y-5 py-36 text-center font-bold text-white'>
      <div className='space-y-5 text-4xl font-extrabold sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight'>
        <h1>A melhor ferramenta de IA para</h1>
        <div className='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent'>
          <TypewriterComponent
            options={{
              strings: [
                'Chatbot',
                'Gerador de Código',
                'Gerador de Imagem',
                'Gerador de Vídeo',
                'Gerador de Música',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='text-sm font-light text-zinc-400 md:text-xl'>
        Crie conteúdo utilizando inteligência artificial de forma simples e
        rápida.
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button
            variant='premium'
            className='rounded-full p-4 font-bold md:p-6 md:text-lg'
          >
            Comece de Forma Gratuita
          </Button>
        </Link>
      </div>
      <div className='text-xs font-normal text-zinc-400 md:text-sm'>
        Nenhum cartão de crédito é requerido.
      </div>
    </div>
  )
}

export default LandingHero
