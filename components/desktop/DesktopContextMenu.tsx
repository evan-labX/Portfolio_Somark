'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useWallpaper } from '@/context/WallpaperContext'

interface DesktopContextMenuProps {
  x: number
  y: number
  open: boolean
  onClose: () => void
}

export default function DesktopContextMenu({ x, y, open, onClose }: DesktopContextMenuProps) {
  const { theme, toggleTheme } = useTheme()
  const { openPicker } = useWallpaper()
  const menuRef = useRef<HTMLDivElement>(null)
  const isMacOS = theme === 'macos'

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  const items = [
    {
      label: 'Change Wallpaper…',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
      action: () => {
        openPicker()
        onClose()
      },
    },
    {
      label: isMacOS ? 'Switch to Windows' : 'Switch to macOS',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
      ),
      action: () => {
        toggleTheme()
        onClose()
      },
    },
    {
      label: 'Refresh Desktop',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 4v6h-6M1 20v-6h6" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      ),
      action: () => {
        window.location.reload()
      },
    },
  ]

  const clampedX = Math.min(x, window.innerWidth - 200)
  const clampedY = Math.min(y, window.innerHeight - 160)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          className="fixed z-[85] min-w-[180px] rounded-xl border py-1.5 shadow-2xl"
          style={{
            left: clampedX,
            top: clampedY,
            backgroundColor: isMacOS ? 'rgba(45,45,58,0.96)' : 'rgba(32,36,44,0.96)',
            borderColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.12 }}
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors text-left"
            >
              <span className="text-white/50">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
