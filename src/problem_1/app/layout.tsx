import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sum to N',
  description: 'Sum to N Calculator',
  generator: 'sum-to-n-calculator',
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
