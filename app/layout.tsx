import { Header } from '@/components/header'
import { HeaderFallback } from '@/components/header/fallback'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'

export const experimental_ppr = true

export const metadata: Metadata = {
  title: 'Emojify',
  description: 'Generate emojis from photos or text.',
}

export default function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className='bg-background text-foreground min-h-screen font-sans antialiased'>
        <div className='sticky top-0 z-20'>
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
        </div>
        {auth}
        {children}
      </body>
    </html>
  )
}
