'use client'

import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Music } from 'lucide-react'
import Heading from '@/components/heading'
import Empty from '@/components/empty'
import Loader from '@/components/loader'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const MusicPage = () => {
  const router = useRouter()
  const [music, setMusic] = useState()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data) => {
    try {
      setMusic(undefined)
      const response = await axios.post('/api/music', data)
      setMusic(response.data.audio)
      form.reset()
    } catch (err) {
      console.error(err)
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title='Geração de Música'
        description='Transforme seu texto em uma música.'
        icon={Music}
        iconColor='text-emerald-500'
        bgColor='bg-emerald-500/10'
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
          {!music && !isLoading && <Empty label='Nenhuma música gerada.' />}
          {music && (
            <audio controls className='w-full'>
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  )
}

export default MusicPage
