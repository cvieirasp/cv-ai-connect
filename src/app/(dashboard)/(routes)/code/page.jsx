'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Code } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import Heading from '@/components/heading'
import Empty from '@/components/empty'
import Loader from '@/components/loader'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/user-avatar'
import BotAvatar from '@/components/bot-avatar'
import useProModal from '@/hooks/use-pro-modal'

const CodePage = () => {
  const proModal = useProModal()
  const router = useRouter()
  const [messages, setMessages] = useState([])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data) => {
    try {
      const userMessage = {
        role: 'user',
        content: data.prompt,
      }

      const newMessages = [...messages, userMessage]

      const response = await axios.post('/api/code', {
        messages: newMessages,
      })

      setMessages((current) => [...current, userMessage, response.data])

      form.reset()
    } catch (err) {
      if (err?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error('Ocorreu um erro ao enviar a mensagem.')
      }
      console.error(err)
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title='Geração de Código'
        description='Gere código usando texto descritivo.'
        icon={Code}
        iconColor='text-green-700'
        bgColor='bg-green-700/10'
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6'
            >
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='Digite aqui sua mensagem...'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className='col-span-12 w-full lg:col-span-2'
                disabled={isLoading}
              >
                Enviar
              </Button>
            </form>
          </Form>
        </div>
        <div className='mt-4 space-y-4'>
          {isLoading && (
            <div className='flex w-full items-center justify-center rounded-lg bg-muted p-8'>
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label='Inicie uma conversa com nossa IA.' />
          )}
          <div className='flex flex-col-reverse gap-y-4'>
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  'flex w-full items-start gap-x-8 rounded-lg p-8',
                  message.role === 'user'
                    ? 'border border-black/10 bg-white'
                    : 'bg-muted'
                )}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className='my-2 w-full overflow-auto rounded-lg bg-black/10 p-2'>
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className='rounded-lg bg-black/10 p-1' {...props} />
                    ),
                  }}
                  className='overflow-hidden text-sm leading-7'
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodePage
