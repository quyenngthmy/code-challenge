import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wallet Dashboard',
  description: 'wallet dashboard',
  generator: 'wallet-dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
