'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface WindowState {
  id: string
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  prevPosition?: { x: number; y: number }
  prevSize?: { width: number; height: number }
  zIndex: number
  minSize?: { width: number; height: number }
}

interface WindowContextType {
  windows: WindowState[]
  openWindow: (id: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updatePosition: (id: string, position: { x: number; y: number }) => void
  updateSize: (id: string, size: { width: number; height: number }) => void
  getWindow: (id: string) => WindowState | undefined
  activeWindowId: string | null
}

const defaultWindows: WindowState[] = [
  {
    id: 'terminal',
    title: 'Terminal',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 80 },
    size: { width: 700, height: 450 },
    minSize: { width: 400, height: 300 },
    zIndex: 10,
  },
  {
    id: 'projects',
    title: 'Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 100 },
    size: { width: 900, height: 600 },
    minSize: { width: 500, height: 400 },
    zIndex: 1,
  },
  {
    id: 'architecture',
    title: 'Architecture',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 120, y: 60 },
    size: { width: 1000, height: 650 },
    minSize: { width: 700, height: 500 },
    zIndex: 1,
  },
  {
    id: 'gallery',
    title: 'System Design Gallery',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 80, y: 40 },
    size: { width: 1100, height: 700 },
    minSize: { width: 800, height: 500 },
    zIndex: 1,
  },
]

const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows)
  const [activeWindowId, setActiveWindowId] = useState<string | null>('terminal')
  const [maxZIndex, setMaxZIndex] = useState(10)

  const openWindow = useCallback((id: string) => {
    const newZ = maxZIndex + 1
    setMaxZIndex(newZ)
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: newZ }
          : w
      )
    )
    setActiveWindowId(id)
  }, [maxZIndex])

  const closeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, isOpen: false, isMinimized: false }
          : w
      )
    )
    if (activeWindowId === id) {
      const openWindows = windows.filter(w => w.isOpen && w.id !== id && !w.isMinimized)
      if (openWindows.length > 0) {
        const topWindow = openWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b))
        setActiveWindowId(topWindow.id)
      } else {
        setActiveWindowId(null)
      }
    }
  }, [activeWindowId, windows])

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, isMinimized: true }
          : w
      )
    )
    if (activeWindowId === id) {
      const openWindows = windows.filter(w => w.isOpen && w.id !== id && !w.isMinimized)
      if (openWindows.length > 0) {
        const topWindow = openWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b))
        setActiveWindowId(topWindow.id)
      } else {
        setActiveWindowId(null)
      }
    }
  }, [activeWindowId, windows])

  const focusWindow = useCallback((id: string) => {
    const newZ = maxZIndex + 1
    setMaxZIndex(newZ)
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, zIndex: newZ, isMinimized: false }
          : w
      )
    )
    setActiveWindowId(id)
  }, [maxZIndex])

  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, position, isMaximized: false }
          : w
      )
    )
  }, [])

  const updateSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev =>
      prev.map(w => {
        if (w.id !== id) return w
        const minWidth = w.minSize?.width || 300
        const minHeight = w.minSize?.height || 200
        return {
          ...w,
          size: {
            width: Math.max(size.width, minWidth),
            height: Math.max(size.height, minHeight),
          },
          isMaximized: false,
        }
      })
    )
  }, [])

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => {
        if (w.id !== id) return w
        if (w.isMaximized) {
          // Restore to previous size and position
          return {
            ...w,
            isMaximized: false,
            position: w.prevPosition || w.position,
            size: w.prevSize || w.size,
          }
        } else {
          // Maximize: store current state and go fullscreen
          return {
            ...w,
            isMaximized: true,
            prevPosition: w.position,
            prevSize: w.size,
            position: { x: 0, y: 0 },
            size: { width: window.innerWidth, height: window.innerHeight - 48 },
          }
        }
      })
    )
  }, [])

  const getWindow = useCallback((id: string) => {
    return windows.find(w => w.id === id)
  }, [windows])

  return (
    <WindowContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updatePosition,
        updateSize,
        getWindow,
        activeWindowId,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export function useWindows() {
  const context = useContext(WindowContext)
  if (context === undefined) {
    throw new Error('useWindows must be used within a WindowProvider')
  }
  return context
}

