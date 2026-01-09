'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VolumePopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function VolumePopup({ isOpen, onClose }: VolumePopupProps) {
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(75)
  const popupRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Load saved volume from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('portfolio_volume')
    const savedMuted = localStorage.getItem('portfolio_muted')
    if (savedVolume) setVolume(parseInt(savedVolume))
    if (savedMuted) setIsMuted(savedMuted === 'true')
  }, [])

  // Save volume to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_volume', volume.toString())
    localStorage.setItem('portfolio_muted', isMuted.toString())
  }, [volume, isMuted])

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

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setVolume(Math.round(percentage))
    if (isMuted && percentage > 0) {
      setIsMuted(false)
    }
  }

  const handleSliderDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return
    handleSliderClick(e)
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      setVolume(previousVolume > 0 ? previousVolume : 50)
    } else {
      setPreviousVolume(volume)
      setIsMuted(true)
    }
  }

  const getVolumeIcon = () => {
    const effectiveVolume = isMuted ? 0 : volume

    if (effectiveVolume === 0) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
        </svg>
      )
    } else if (effectiveVolume < 33) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
        </svg>
      )
    } else if (effectiveVolume < 66) {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        </svg>
      )
    } else {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      )
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          className="absolute bottom-14 right-0 z-50 rounded-lg overflow-hidden"
          style={{
            width: 280,
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
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0078d4] flex items-center justify-center">
                {getVolumeIcon()}
              </div>
              <div>
                <div className="text-sm font-medium text-white/90">Volume</div>
                <div className="text-xs text-white/50">
                  {isMuted ? 'Muted' : `${volume}%`}
                </div>
              </div>
            </div>
          </div>

          {/* Volume Slider */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
                  isMuted ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                {getVolumeIcon()}
              </button>

              {/* Slider */}
              <div
                ref={sliderRef}
                className="flex-1 h-8 flex items-center cursor-pointer group"
                onClick={handleSliderClick}
                onMouseMove={handleSliderDrag}
              >
                <div className="w-full h-1.5 bg-white/20 rounded-full relative">
                  {/* Filled portion */}
                  <div
                    className="absolute left-0 top-0 h-full bg-[#0078d4] rounded-full transition-all"
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  />
                  
                  {/* Thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${isMuted ? 0 : volume}% - 8px)` }}
                  />
                </div>
              </div>

              {/* Volume Percentage */}
              <span className="text-xs text-white/50 w-8 text-right">
                {isMuted ? '0' : volume}
              </span>
            </div>
          </div>

          {/* Output Device */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
              <div className="flex-1">
                <div className="text-sm text-white/80">Speakers (Default)</div>
                <div className="text-xs text-white/40">High Definition Audio</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

