'use client'

import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const font = Montserrat({
  weight: '600',
  subsets: ['latin'],
})

const LandingNavbar = () => {
  const { isSignedIn } = useAuth()

  return (
    <nav className='flex items-center justify-between bg-transparent p-4'>
      <Link href='/' className='flex items-center'>
        <div className='relative mr-4 h-8 w-8'>
          <Image fill alt='Logo' src='/logo.png' />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', font.className)}>
          CV-AI-Coonect
        </h1>
      </Link>
      <div className='flex items-center gap-x-2'>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant='outline' className='rounded-full'>
            Iniciar
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default LandingNavbar
