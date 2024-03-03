'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const testimonials = [
  {
    id: 1,
    name: 'Jill Valentine',
    avatar: 'AS',
    title: 'Designer Gráfica',
    description:
      'A plataforma revolucionou a maneira como eu crio conteúdo visual. A geração de imagens e vídeos é rápida e eficiente. Estou muito satisfeita com os resultados!',
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    avatar: 'CO',
    title: 'Engenheiro de Software',
    description:
      'Como desenvolvedor, sempre busquei maneiras de facilitar a codificação de aplicativos. Essa plataforma superou minhas expectativas, tornando a criação de código e a implementação em meus projetos extremamente simples e eficazes.',
  },
  {
    id: 3,
    name: 'Claire Redfield',
    avatar: 'CR',
    title: 'Jornalista',
    description:
      'A capacidade dessa plataforma de gerar conversações naturais é impressionante. Utilizo para criar roteiros e simular entrevistas, economizando tempo e obtendo diálogos realistas. Recomendo para profissionais de comunicação!',
  },
  {
    id: 4,
    name: 'Leon Scott Kennedy',
    avatar: 'LK',
    title: 'Youtuber',
    description:
      'A geração de músicas dessa plataforma é um salva-vidas para youtubers. Estou muito contente com a qualidade dos resultados!',
  },
]

const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
      <h2 className='mb-10 text-center text-4xl font-extrabold text-white'>
        Depoimentos
      </h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {testimonials.map((item) => (
          <Card key={item.id} className='border-none bg-[#192339] text-white'>
            <CardHeader>
              <CardTitle className='flex items-center gap-x-2'>
                <div>
                  <p className='text-lg'>{item.name}</p>
                  <p className='text-sm text-zinc-400'>{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className='px-0 pt-4'>
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LandingContent
