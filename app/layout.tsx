import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { WindowProvider } from '@/context/WindowContext'

export const metadata: Metadata = {
  title: 'Atajan | Principal AI/ML Engineer',
  description: 'Feel free to use my laptop to learn about me. Principal AI/ML Engineer specializing in Agentic AI and autonomous systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <WindowProvider>
            {children}
          </WindowProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

