'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type WallpaperId =
  | 'midnight-code'
  | 'aurora-lights'
  | 'sunset-desk'
  | 'ocean-calm'
  | 'neural-glow'
  | 'forest-night'

export interface WallpaperOption {
  id: WallpaperId
  name: string
  description: string
  preview: string
}

export const wallpaperOptions: WallpaperOption[] = [
  {
    id: 'midnight-code',
    name: 'Midnight Code',
    description: 'Classic dark developer desk',
    preview: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
  },
  {
    id: 'aurora-lights',
    name: 'Aurora Lights',
    description: 'Soft northern lights glow',
    preview: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #064e3b 100%)',
  },
  {
    id: 'sunset-desk',
    name: 'Sunset Desk',
    description: 'Warm evening workspace',
    preview: 'linear-gradient(135deg, #1c1917 0%, #7c2d12 45%, #431407 100%)',
  },
  {
    id: 'ocean-calm',
    name: 'Ocean Calm',
    description: 'Deep blue, focused mood',
    preview: 'linear-gradient(135deg, #0c4a6e 0%, #164e63 50%, #0f172a 100%)',
  },
  {
    id: 'neural-glow',
    name: 'Neural Glow',
    description: 'AI-inspired purple pulse',
    preview: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #0f172a 100%)',
  },
  {
    id: 'forest-night',
    name: 'Forest Night',
    description: 'Quiet green night study',
    preview: 'linear-gradient(135deg, #052e16 0%, #14532d 45%, #0f172a 100%)',
  },
]

interface WallpaperContextType {
  wallpaper: WallpaperId
  setWallpaper: (id: WallpaperId) => void
  pickerOpen: boolean
  openPicker: () => void
  closePicker: () => void
}

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined)

export function WallpaperProvider({ children }: { children: ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<WallpaperId>('midnight-code')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('os-wallpaper') as WallpaperId | null
    if (stored && wallpaperOptions.some((w) => w.id === stored)) {
      setWallpaperState(stored)
    }
  }, [])

  const setWallpaper = (id: WallpaperId) => {
    setWallpaperState(id)
    localStorage.setItem('os-wallpaper', id)
  }

  if (!mounted) {
    return (
      <WallpaperContext.Provider
        value={{
          wallpaper: 'midnight-code',
          setWallpaper: () => {},
          pickerOpen: false,
          openPicker: () => {},
          closePicker: () => {},
        }}
      >
        {children}
      </WallpaperContext.Provider>
    )
  }

  return (
    <WallpaperContext.Provider
      value={{
        wallpaper,
        setWallpaper,
        pickerOpen,
        openPicker: () => setPickerOpen(true),
        closePicker: () => setPickerOpen(false),
      }}
    >
      {children}
    </WallpaperContext.Provider>
  )
}

export function useWallpaper() {
  const context = useContext(WallpaperContext)
  if (context === undefined) {
    throw new Error('useWallpaper must be used within a WallpaperProvider')
  }
  return context
}
