'use client'

import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Download, ImageIcon } from 'lucide-react'
import { Card, CardFooter } from '@/components/ui/card'
import Heading from '@/components/heading'
import Empty from '@/components/empty'
import Loader from '@/components/loader'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { amountOptions, formSchema, resolutionOptions } from './constants'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import useProModal from '@/hooks/use-pro-modal'

const ImagePage = () => {
  const proModal = useProModal()
  const router = useRouter()
  const [images, setImages] = useState([])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '1024x1024',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data) => {
    try {
      setImages([])
      const response = await axios.post('/api/image', data)
      const urls = response.data.map((image) => image.url)
      setImages(urls)
      form.reset()
    } catch (err) {
      if (err?.response?.status === 403) {
        proModal.onOpen()
      }
      console.error(err)
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title='Geração de Imagem'
        description='Transforme seu texto em uma imagem.'
        icon={ImageIcon}
        iconColor='text-pink-700'
        bgColor='bg-pink-700/10'
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
                  <FormItem className='col-span-12 lg:col-span-6'>
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
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='resolution'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className='p-20'>
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label='Nenhuma imagem gerada.' />
          )}
          <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {images.map((image) => (
              <Card key={image} className='overflow-hidden rounded-lg'>
                <div className='relative aspect-square'>
                  <Image alt='Imagem gerada' fill src={image} />
                </div>
                <CardFooter className='p-2'>
                  <Button
                    onClick={() => window.open(image, '_blank')}
                    variant='secondary'
                    className='w-full'
                  >
                    <Download className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePage
