import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { AppLocaleProvider } from '@/shared/ui/locale-provider'
import './globals.css'
import '@/shared/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Za Ideyu - Build Teams Around Ideas',
  description: 'A structured environment for forming and maintaining IT teams around ideas. Join projects, commit to small tasks, work in short stages, and show public progress.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AppLocaleProvider>
          {children}
        </AppLocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
