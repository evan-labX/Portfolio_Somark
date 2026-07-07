'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindows } from '@/context/WindowContext'

interface CortanaPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function CortanaPanel({ isOpen, onClose }: CortanaPanelProps) {
  const [isListening, setIsListening] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const { openWindow } = useWindows()

  const suggestions = [
    { text: 'Show me AI evaluations', command: 'projects' },
    { text: 'Tell me about yourself', command: 'about' },
    { text: 'What are your skills?', command: 'skills' },
    { text: 'Open About Me', command: 'about' },
  ]

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

  const handleSuggestionClick = (command: string) => {
    // Open terminal with the command
    openWindow('terminal')
    onClose()
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // Auto-stop after 3 seconds (decorative)
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000)
    }
  }

  // Animated bars for voice visualization
  const VoiceWave = () => (
    <div className="flex items-center justify-center gap-1 h-16">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-[#00b4d8] to-[#0077b6]"
          animate={isListening ? {
            height: [16, 40, 24, 48, 16],
          } : {
            height: 16,
          }}
          transition={{
            duration: 0.5,
            repeat: isListening ? Infinity : 0,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )

  // Pulsing circle animation
  const PulsingCircle = () => (
    <div className="relative w-24 h-24">
      {/* Outer pulsing rings */}
      {isListening && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-[#0078d4]/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-[#0078d4]/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.3,
            }}
          />
        </>
      )}
      
      {/* Main circle */}
      <motion.button
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00b4d8] to-[#0077b6] flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        animate={isListening ? {
          boxShadow: [
            '0 0 20px rgba(0, 180, 216, 0.4)',
            '0 0 40px rgba(0, 180, 216, 0.6)',
            '0 0 20px rgba(0, 180, 216, 0.4)',
          ],
        } : {}}
        transition={{
          duration: 1,
          repeat: isListening ? Infinity : 0,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </motion.button>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          className="fixed z-50 rounded-xl overflow-hidden"
          style={{
            width: 400,
            bottom: 68,
            left: '50%',
            x: '-50%',
            backgroundColor: 'rgba(32, 32, 32, 0.95)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 text-center border-b border-white/10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-light text-white/90 mb-1">
                Hi, I&apos;m Cortana
              </h3>
              <p className="text-sm text-white/50">
                {isListening ? 'Listening...' : 'How can I help you?'}
              </p>
            </motion.div>
          </div>

          {/* Voice Visualization */}
          <div className="py-8 flex flex-col items-center gap-6">
            <PulsingCircle />
            
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <VoiceWave />
              </motion.div>
            )}
            
            <motion.p 
              className="text-xs text-white/40 text-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isListening 
                ? 'Speak now...' 
                : 'Tap the microphone to start (decorative only)'}
            </motion.p>
          </div>

          {/* Suggestions */}
          <div className="p-4 border-t border-white/10">
            <div className="text-xs text-white/50 mb-3">Try saying:</div>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion.command}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion.command)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#00b4d8]">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M5 11c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92"/>
                  </svg>
                  <span className="text-sm text-white/70">&ldquo;{suggestion.text}&rdquo;</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-white/5 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-xs text-white/40">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/30">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <span>Voice recognition is decorative for this portfolio</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

