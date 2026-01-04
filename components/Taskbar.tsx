'use client'

import { useTheme } from '@/context/ThemeContext'
import { useWindows } from '@/context/WindowContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import StartMenu from './StartMenu'

export default function Taskbar() {
  const { theme } = useTheme()
  const { windows, focusWindow, openWindow, minimizeWindow, activeWindowId } = useWindows()
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: theme === 'windows'
      }))
      setDate(now.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [theme])

  const isMacOS = theme === 'macos'
  const openWindows = windows.filter(w => w.isOpen)

  if (isMacOS) {
    // macOS Menu Bar (Top)
    return (
      <>
        <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
        <div
          className="fixed top-0 left-0 right-0 h-7 flex items-center justify-between px-4 taskbar-glass theme-transition z-50"
          style={{
            backgroundColor: 'rgba(30, 30, 40, 0.8)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Apple Menu */}
          <div className="flex items-center gap-4">
            <button 
              className="text-white/90 text-sm font-medium hover:text-white"
              onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </button>
            <span className="text-white/90 text-sm font-semibold">Finder</span>
            <span className="text-white/60 text-sm">File</span>
            <span className="text-white/60 text-sm">Edit</span>
            <span className="text-white/60 text-sm">View</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <span className="text-white/80 text-xs">{date}</span>
            <span className="text-white/90 text-sm font-medium">{time}</span>
          </div>
        </div>
      </>
    )
  }

  // Windows 11 Taskbar (Bottom - Floating Centered Style)
  return (
    <>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      
      {/* Windows 11 Floating Taskbar Container */}
      <div className="fixed bottom-0 left-0 right-0 h-14 flex items-end justify-center pb-2 z-50">
        {/* Main Taskbar Pill */}
        <motion.div
          className="flex items-center gap-1 px-2 h-12 rounded-lg"
          style={{
            backgroundColor: 'rgba(32, 32, 32, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
          }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {/* Start Button */}
          <motion.button
            className={`w-11 h-11 flex items-center justify-center rounded-md transition-all duration-150 ${
              isStartMenuOpen ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#00a4ef]">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
            </svg>
          </motion.button>

          {/* Search Button */}
          <motion.button
            className="w-11 h-11 flex items-center justify-center rounded-md hover:bg-white/10 transition-all duration-150"
            whileTap={{ scale: 0.92 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </motion.button>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Pinned & Open Windows */}
          <AnimatePresence>
            {openWindows.map((window) => (
              <motion.button
                key={window.id}
                className={`w-11 h-11 flex items-center justify-center rounded-md transition-all duration-150 relative group ${
                  activeWindowId === window.id 
                    ? 'bg-white/15' 
                    : 'hover:bg-white/10'
                }`}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  if (window.isMinimized) {
                    openWindow(window.id)
                  } else if (activeWindowId === window.id) {
                    minimizeWindow(window.id)
                  } else {
                    focusWindow(window.id)
                  }
                }}
              >
                {/* Icon */}
                {window.id === 'terminal' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#00a4ef]">
                    <rect x="2" y="3" width="20" height="18" rx="2" fill="currentColor" opacity="0.2"/>
                    <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <polyline points="6 15 10 11 6 7" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <line x1="12" y1="17" x2="18" y2="17" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                {window.id === 'projects' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#ffb900]">
                    <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
                  </svg>
                )}
                {window.id === 'architecture' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#00a4ef]">
                    <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" opacity="0.3"/>
                    <path d="M21 14h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3zM3 3h7v7H3V3zm2 2v3h3V5H5zm-2 9h7v7H3v-7zm2 2v3h3v-3H5zm9-13h7v7h-7V3zm2 2v3h3V5h-3z"/>
                  </svg>
                )}
                
                {/* Active Indicator - Windows 11 style underline */}
                {window.isOpen && !window.isMinimized && (
                  <motion.div
                    className={`absolute -bottom-0.5 rounded-full ${
                      activeWindowId === window.id 
                        ? 'w-4 h-[3px] bg-[#00a4ef]' 
                        : 'w-1.5 h-[3px] bg-white/50'
                    }`}
                    layoutId={`indicator-${window.id}`}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  />
                )}

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#2d2d2d] rounded-md text-xs text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-white/10">
                  {window.title}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* System Tray (Separate floating section) */}
        <motion.div
          className="absolute right-3 bottom-2 flex items-center gap-1 px-3 h-10 rounded-md"
          style={{
            backgroundColor: 'rgba(32, 32, 32, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.1 }}
        >
          {/* Hidden icons indicator */}
          <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          
          {/* WiFi */}
          <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
              <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-4c2.2 0 4.2.9 5.7 2.3l-1.4 1.4C15.2 16.7 13.7 16 12 16s-3.2.7-4.3 1.7l-1.4-1.4C7.8 14.9 9.8 14 12 14zm0-4c3.3 0 6.3 1.3 8.5 3.5l-1.4 1.4C17.2 13 14.7 12 12 12s-5.2 1-7.1 2.9l-1.4-1.4C5.7 11.3 8.7 10 12 10zm0-4c4.4 0 8.4 1.8 11.3 4.7l-1.4 1.4C19.3 9.5 15.8 8 12 8S4.7 9.5 2.1 12.1L.7 10.7C3.6 7.8 7.6 6 12 6z"/>
            </svg>
          </button>

          {/* Volume */}
          <button className="p-1.5 hover:bg-white/10 rounded transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4zM14 3.2v2.1c2.9.9 5 3.5 5 6.7s-2.1 5.8-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z"/>
            </svg>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Date/Time */}
          <button className="hover:bg-white/10 rounded px-2 py-1 transition-colors text-right">
            <div className="text-[11px] text-white/90 leading-tight">{time}</div>
            <div className="text-[11px] text-white/70 leading-tight">{date}</div>
          </button>

          {/* Notification */}
          <button className="p-1.5 hover:bg-white/10 rounded transition-colors relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00a4ef] rounded-full" />
          </button>
        </motion.div>
      </div>
    </>
  )
}
