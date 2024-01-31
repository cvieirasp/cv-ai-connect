'use client'

import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  MessageSquare,
  Code,
  ImageIcon,
  Music,
  VideoIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const tools = [
  {
    label: 'Conversação',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation',
  },
  {
    label: 'Geração de Imagem',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image',
  },
  {
    label: 'Geração de Vídeo',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/video',
  },
  {
    label: 'Geração de Áudio',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    href: '/audio',
  },
  {
    label: 'Geração de Código',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
]

const DashboardPage = () => {
  const router = useRouter()

  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-center text-2xl font-bold md:text-4xl'>
          Explore o poder da Inteligência Artificial
        </h2>
        <p className='text-center text-sm font-light text-muted-foreground md:text-lg'>
          Converse com a Inteligência Artificial mais inteligente e experimente
          seu poder
        </p>
      </div>
      <div className='space-y-4 px-4 md:px-20 lg:px-32'>
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className='flex cursor-pointer items-center justify-between border-black/5 p-4 transition hover:shadow-md'
          >
            <div className='flex items-center gap-x-4'>
              <div className={cn('w-fit rounded-md p-2', tool.bgColor)}>
                <tool.icon className={cn('h-8 w-8', tool.color)} />
              </div>
              <div className='font-semibold'>{tool.label}</div>
            </div>
            <ArrowRight className='h-5 w-5' />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
