'use client'

import { useTheme } from '@/context/ThemeContext'
import { useWindows } from '@/context/WindowContext'
import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'

interface AppIconProps {
  id: string
  label: string
  icon: React.ReactNode
  action?: 'window' | 'link' | 'toggle'
  href?: string
  badge?: string | null
  badgeColor?: string
}

export default function AppIcon({ 
  id, 
  label, 
  icon, 
  action = 'window', 
  href,
  badge,
  badgeColor = 'bg-red-500'
}: AppIconProps) {
  const { theme, toggleTheme } = useTheme()
  const { openWindow } = useWindows()
  const [lastClick, setLastClick] = useState(0)

  const handleClick = useCallback(() => {
    const now = Date.now()
    const isDoubleClick = now - lastClick < 300
    setLastClick(now)

    if (isDoubleClick) {
      if (action === 'window') {
        openWindow(id)
      } else if (action === 'link' && href) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else if (action === 'toggle') {
        toggleTheme()
      }
    }
  }, [lastClick, action, id, href, openWindow, toggleTheme])

  const isMacOS = theme === 'macos'

  return (
    <motion.button
      className="desktop-icon flex flex-col items-center gap-1 p-2 rounded-lg w-20 no-select relative"
      onClick={handleClick}
      whileHover={{ 
        backgroundColor: isMacOS ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <div 
          className={`w-12 h-12 flex items-center justify-center rounded-xl ${
            isMacOS ? 'bg-gradient-to-b from-white/20 to-white/5' : ''
          }`}
          style={{
            backgroundColor: isMacOS ? undefined : 'rgba(255,255,255,0.1)',
          }}
        >
          {icon}
        </div>
        {badge && (
          <motion.span 
            className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white ${badgeColor}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          >
            {badge}
          </motion.span>
        )}
      </div>
      <span className="text-xs text-white/90 text-center leading-tight">{label}</span>
    </motion.button>
  )
}
