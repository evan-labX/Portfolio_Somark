import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { WindowProvider } from '@/context/WindowContext'
import { WallpaperProvider } from '@/context/WallpaperContext'

export const metadata: Metadata = {
  title: 'Somark | AI Model Evaluation Specialist',
  description: 'Feel free to use my laptop to learn about me. AI Model Evaluation Specialist specializing in building and evaluating AI systems.',
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
          <WallpaperProvider>
            <WindowProvider>
              {children}
            </WindowProvider>
          </WallpaperProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

