import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Custumer Management System',
  description: 'Top notch custumer management system',
  generator: 'mern stack with ankit',
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
