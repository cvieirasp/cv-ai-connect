import * as z from 'zod'

export const formSchema = z.object({
  prompt: z.string().min(1, { message: 'Mensagem é obrigatória' }),
  amount: z.string().min(1, { message: 'Quantidade é obrigatória' }),
  resolution: z.string().min(1, { message: 'Resolução é obrigatória' }),
})

export const amountOptions = [
  { value: '1', label: '1 Imagem' },
  { value: '2', label: '2 Imagens' },
  { value: '3', label: '3 Imagens' },
  { value: '4', label: '4 Imagens' },
  { value: '5', label: '5 Imagens' },
]

export const resolutionOptions = [
  { value: '1024x1024', label: '1024x1024' },
  { value: '1024x1792', label: '1024x1792' },
  { value: '1792x1024', label: '1792x1024' },
]
