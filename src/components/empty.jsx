import Image from 'next/image'

const Empty = ({ label }) => {
  return (
    <div className='flex h-full flex-col items-center justify-center p-20'>
      <div className='relative h-72 w-72'>
        <Image
          src='/empty.png'
          fill
          alt='Imagem representando nenhum envio de mensagem'
        />
      </div>
      <p className='text-center text-sm text-muted-foreground'>{label}</p>
    </div>
  )
}

export default Empty
