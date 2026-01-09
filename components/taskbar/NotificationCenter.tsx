'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '@/content/site'

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

interface QuickSetting {
  id: string
  label: string
  icon: React.ReactNode
  active: boolean
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  icon: React.ReactNode
  color: string
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [settings, setSettings] = useState<QuickSetting[]>([
    {
      id: 'wifi',
      label: 'Wi-Fi',
      active: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-4c2.2 0 4.2.9 5.7 2.3l-1.4 1.4C15.2 16.7 13.7 16 12 16s-3.2.7-4.3 1.7l-1.4-1.4C7.8 14.9 9.8 14 12 14zm0-4c3.3 0 6.3 1.3 8.5 3.5l-1.4 1.4C17.2 13 14.7 12 12 12s-5.2 1-7.1 2.9l-1.4-1.4C5.7 11.3 8.7 10 12 10z"/>
        </svg>
      ),
    },
    {
      id: 'bluetooth',
      label: 'Bluetooth',
      active: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>
        </svg>
      ),
    },
    {
      id: 'airplane',
      label: 'Airplane',
      active: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      ),
    },
    {
      id: 'focus',
      label: 'Focus',
      active: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
    },
    {
      id: 'nightlight',
      label: 'Night light',
      active: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
      ),
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      active: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
        </svg>
      ),
    },
  ])

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Experience Milestone',
      message: '13+ years in software engineering, AI/ML, and system design',
      time: 'Just now',
      color: '#0078d4',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
    },
    {
      id: '2',
      title: 'New Project Added',
      message: `Check out the latest AI architecture: ${siteContent.projects[0]?.title || 'Agentic RAG'}`,
      time: '2 minutes ago',
      color: '#107c10',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      id: '3',
      title: 'Skills Update',
      message: 'Expertise in Multi-agent architectures, LangGraph, and MLOps',
      time: '5 minutes ago',
      color: '#5c2d91',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17" fill="none" stroke="currentColor" strokeWidth="2"/>
          <polyline points="2 12 12 17 22 12" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      id: '4',
      title: 'Contact Available',
      message: 'Open to new opportunities and collaborations',
      time: '10 minutes ago',
      color: '#d83b01',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
    },
  ]

  const popupRef = useRef<HTMLDivElement>(null)

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, active: !setting.active } : setting
      )
    )
  }

  const clearAllNotifications = () => {
    // In a real app, this would clear notifications
    // For this portfolio, we'll just close the panel
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          className="absolute bottom-14 right-0 z-50 rounded-lg overflow-hidden"
          style={{
            width: 360,
            maxHeight: 500,
            backgroundColor: 'rgba(32, 32, 32, 0.95)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
          }}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Quick Settings Grid */}
          <div className="p-3 border-b border-white/10">
            <div className="grid grid-cols-3 gap-2">
              {settings.map((setting, index) => (
                <motion.button
                  key={setting.id}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                    setting.active 
                      ? 'bg-[#0078d4]' 
                      : 'bg-white/10 hover:bg-white/15'
                  }`}
                  onClick={() => toggleSetting(setting.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-white">{setting.icon}</div>
                  <span className="text-[10px] text-white/80 text-center leading-tight">
                    {setting.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Sliders */}
            <div className="mt-3 space-y-3">
              {/* Brightness */}
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                </svg>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-white/60 rounded-full" />
                </div>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-white/60 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <span className="text-sm text-white/70">Notifications</span>
            <button 
              className="text-xs text-white/50 hover:text-white/70 transition-colors"
              onClick={clearAllNotifications}
            >
              Clear all
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-60 overflow-y-auto terminal-scroll">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: notification.color }}
                  >
                    <div className="text-white">{notification.icon}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm text-white/90 font-medium">
                        {notification.title}
                      </span>
                      <span className="text-[10px] text-white/40 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-white/10">
            <button className="w-full flex items-center justify-center gap-2 p-2 rounded hover:bg-white/10 transition-colors">
              <span className="text-xs text-white/50">Notification settings</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

