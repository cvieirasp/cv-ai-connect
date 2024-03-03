import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from '@/components/modal-provider'
import ToasterProvider from '@/components/toaster.provider'
import CrispProvider from '@/components/crisp-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CV AI Connection',
  description: 'Plataforma de Inteligência Artificial',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='pt-BR'>
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
