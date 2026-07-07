'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { siteContent } from '@/content/site'

interface LockScreenProps {
  onUnlock: () => void
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const { theme } = useTheme()
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [password, setPassword] = useState('')
  const [showPasswordField, setShowPasswordField] = useState(false)
  const [error, setError] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const isMacOS = theme === 'macos'
  const correctPassword = 'password'

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      }).replace(' ', ''))
      setDate(now.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric'
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showPasswordField && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showPasswordField])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password.toLowerCase() === correctPassword) {
      setIsUnlocking(true)
      setTimeout(() => {
        onUnlock()
      }, 800)
    } else {
      setError(true)
      setPassword('')
      setTimeout(() => setError(false), 600)
    }
  }

  const handleScreenClick = () => {
    if (!showPasswordField && !isUnlocking) {
      setShowPasswordField(true)
    }
  }

  return (
    <AnimatePresence>
      {!isUnlocking ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
          onClick={handleScreenClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Background */}
          <div 
            className="absolute inset-0 transition-all duration-1000"
            style={{
              background: isMacOS 
                ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
                : 'linear-gradient(135deg, #0c0c1e 0%, #1a1a3e 30%, #2d1b4e 60%, #0c0c1e 100%)',
            }}
          />

          {/* Animated gradient orbs */}
          <motion.div 
            className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
            animate={{
              x: ['-20%', '20%', '-20%'],
              y: ['-10%', '10%', '-10%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: isMacOS 
                ? 'radial-gradient(circle, #007aff 0%, #5856d6 50%, transparent 70%)'
                : 'radial-gradient(circle, #0078d4 0%, #5c2d91 50%, transparent 70%)',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
          
          <motion.div 
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            animate={{
              x: ['20%', '-20%', '20%'],
              y: ['10%', '-10%', '10%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: isMacOS 
                ? 'radial-gradient(circle, #ff375f 0%, #ff9f0a 50%, transparent 70%)'
                : 'radial-gradient(circle, #ff4081 0%, #ff6d00 50%, transparent 70%)',
              bottom: '20%',
              right: '10%',
            }}
          />

          {/* Subtle noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Time Display */}
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div 
                className="text-white font-light tracking-tight"
                style={{
                  fontSize: isMacOS ? '96px' : '108px',
                  fontFamily: isMacOS ? '-apple-system, BlinkMacSystemFont, sans-serif' : '"Segoe UI Light", sans-serif',
                  textShadow: '0 2px 40px rgba(0,0,0,0.3)',
                }}
              >
                {time}
              </div>
            </motion.div>

            {/* Date Display */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div 
                className="text-white/80 font-light tracking-wide"
                style={{
                  fontSize: isMacOS ? '22px' : '20px',
                  fontFamily: isMacOS ? '-apple-system, BlinkMacSystemFont, sans-serif' : '"Segoe UI", sans-serif',
                }}
              >
                {date}
              </div>
            </motion.div>

            {/* User Profile Section */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* Avatar */}
              <motion.div
                className="relative mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div 
                  className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl"
                >
                  <img 
                    src="/imgs/Somark.jpg" 
                    alt={siteContent.meta.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white/30 shadow-lg" />
              </motion.div>

              {/* User Name */}
              <motion.h2
                className="text-white text-2xl font-medium mb-6 tracking-wide"
                style={{
                  fontFamily: isMacOS ? '-apple-system, BlinkMacSystemFont, sans-serif' : '"Segoe UI", sans-serif',
                  textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                }}
              >
                {siteContent.meta.name}
              </motion.h2>

              {/* Password Section */}
              <AnimatePresence mode="wait">
                {!showPasswordField ? (
                  <motion.div
                    key="prompt"
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p 
                      className="text-white/60 text-sm mb-4"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click anywhere to unlock
                    </motion.p>
                    
                    {/* Animated arrow */}
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
                        <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="password"
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                      {/* Password Input */}
                      <motion.div
                        className="relative"
                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        <input
                          ref={inputRef}
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter Password"
                          className={`w-64 h-12 px-4 pr-12 rounded-xl bg-white/10 backdrop-blur-md border text-white placeholder-white/40 outline-none transition-all duration-300 ${
                            error 
                              ? 'border-red-500/50 bg-red-500/10' 
                              : 'border-white/20 focus:border-white/40 focus:bg-white/15'
                          }`}
                          style={{
                            fontFamily: isMacOS ? '-apple-system, BlinkMacSystemFont, sans-serif' : '"Segoe UI", sans-serif',
                          }}
                        />
                        
                        {/* Submit button inside input */}
                        <button
                          type="submit"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </motion.div>

                      {/* Error message */}
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            className="text-red-400 text-sm mt-2"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                          >
                            Incorrect password
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Hint button */}
                      <motion.button
                        type="button"
                        className="mt-4 text-white/50 text-sm hover:text-white/70 transition-colors underline underline-offset-2"
                        onClick={() => setShowHint(!showHint)}
                        whileHover={{ scale: 1.02 }}
                      >
                        {showHint ? 'Hide hint' : 'Need a hint?'}
                      </motion.button>

                      {/* Password Hint */}
                      <AnimatePresence>
                        {showHint && (
                          <motion.div
                            className="mt-4 max-w-sm text-center"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                              <p className="text-white/70 text-sm leading-relaxed">
                                <span className="text-amber-400 font-medium">Hint:</span> The password is literally "password" 😉
                              </p>
                              <p className="text-white/50 text-xs mt-2 italic">
                                Feel free to use my laptop to know me well.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Bottom status bar */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* WiFi icon */}
            <div className="flex items-center gap-2 text-white/50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-4c2.2 0 4.2.9 5.7 2.3l-1.4 1.4C15.2 16.7 13.7 16 12 16s-3.2.7-4.3 1.7l-1.4-1.4C7.8 14.9 9.8 14 12 14zm0-4c3.3 0 6.3 1.3 8.5 3.5l-1.4 1.4C17.2 13 14.7 12 12 12s-5.2 1-7.1 2.9l-1.4-1.4C5.7 11.3 8.7 10 12 10z"/>
              </svg>
            </div>

            {/* Battery icon */}
            <div className="flex items-center gap-2 text-white/50">
              <svg width="24" height="18" viewBox="0 0 24 14" fill="none" className="text-white/50">
                <rect x="1" y="1" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="3" y="3" width="12" height="8" rx="1" fill="currentColor" opacity="0.8"/>
                <rect x="20" y="4" width="3" height="6" rx="1" fill="currentColor" opacity="0.5"/>
              </svg>
              <span className="text-xs">100%</span>
            </div>

            {/* Power button hint */}
            <div className="text-white/30 text-xs">
              Press Enter to submit
            </div>
          </motion.div>

          {/* Subtle vignette effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        </motion.div>
      ) : (
        /* Unlock animation */
        <motion.div
          className="fixed inset-0 z-[100] bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        />
      )}
    </AnimatePresence>
  )
}

