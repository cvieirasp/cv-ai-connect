'use client'

import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  Check,
  MessageSquare,
  Code,
  ImageIcon,
  Music,
  VideoIcon,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import useProModal from '@/hooks/use-pro-modal'
import { cn } from '@/lib/utils'

const tools = [
  {
    label: 'Conversação',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Geração de Imagem',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
  },
  {
    label: 'Geração de Vídeo',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
  },
  {
    label: 'Geração de Áudio',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Geração de Código',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
  },
]

const ProModal = () => {
  const proModal = useProModal()
  const [loading, setLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = axios.get('/api/stripe')
      window.location.href = (await response).data.url
    } catch (err) {
      toast.error('Ocorreu um erro enviar solicitação.')
      console.error(err, 'STRIPE_CLIENT_ERROR')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex flex-col items-center justify-center gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 py-1 font-bold'>
              Atualize para o plano
              <Badge variant='premium' className='py-1 text-sm uppercase'>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='space-y-2 pt-2 text-center font-medium text-zinc-900'>
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className='flex items-center justify-between border-black/5 p-3'
              >
                <div className='flex items-center gap-x-4'>
                  <div className={cn('w-fit rounded-md p-2', tool.bgColor)}>
                    <tool.icon className={cn('h-6 w-6', tool.color)} />
                  </div>
                  <div className='text-sm font-semibold'>{tool.label}</div>
                </div>
                <Check className='h-5 w-5 text-primary' />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            size='lg'
            variant='premium'
            className='fill-white'
            onClick={onSubscribe}
          >
            Atualizar
            <Zap className='ml-2 h-4 w-4 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal
