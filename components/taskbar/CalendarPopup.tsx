'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CalendarPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function CalendarPopup({ isOpen, onClose }: CalendarPopupProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewDate, setViewDate] = useState(new Date())
  const popupRef = useRef<HTMLDivElement>(null)

  const today = new Date()
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days: (number | null)[] = []
    
    // Add empty slots for days before the first day
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }

  const isToday = (day: number | null) => {
    if (!day) return false
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    )
  }

  const navigateMonth = (direction: number) => {
    setViewDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const goToToday = () => {
    setViewDate(new Date())
  }

  const days = getDaysInMonth(viewDate)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          className="absolute bottom-14 right-0 z-50 rounded-lg overflow-hidden"
          style={{
            width: 320,
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
          {/* Current Time Display */}
          <div className="p-4 border-b border-white/10">
            <div className="text-4xl font-light text-white/90 tracking-tight">
              {currentDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </div>
            <div className="text-sm text-white/60 mt-1">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>

          {/* Calendar Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => navigateMonth(-1)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button 
              onClick={goToToday}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
            >
              {months[viewDate.getMonth()]} {viewDate.getFullYear()}
            </button>
            
            <button
              onClick={() => navigateMonth(1)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 px-4">
            {daysOfWeek.map(day => (
              <div key={day} className="h-8 flex items-center justify-center text-xs text-white/40 font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 px-4 pb-4 gap-y-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`h-8 flex items-center justify-center text-sm rounded-full transition-colors ${
                  day === null 
                    ? '' 
                    : isToday(day)
                      ? 'bg-[#0078d4] text-white font-medium'
                      : 'text-white/80 hover:bg-white/10 cursor-pointer'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="border-t border-white/10 p-3 flex gap-2">
            <button 
              onClick={goToToday}
              className="flex-1 py-2 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              Go to today
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

