'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Desktop from '@/components/Desktop'
import MobileFallback from '@/components/MobileFallback'
import LockScreen from '@/components/LockScreen'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLocked, setIsLocked] = useState(true)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleUnlock = () => {
    setIsLocked(false)
  }

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-[#0d1117] flex items-center justify-center">
        {/* Boot screen animation */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {/* Spinning loader */}
            <div className="w-12 h-12 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
          </div>
          <div className="text-white/40 font-light text-sm tracking-wider">
            Starting up...
          </div>
        </div>
      </div>
    )
  }

  // Mobile doesn't get lock screen for better UX
  if (isMobile) {
    return <MobileFallback />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLocked && <LockScreen onUnlock={handleUnlock} />}
      </AnimatePresence>
      
      {/* Desktop is always rendered but hidden behind lock screen */}
      <Desktop />
    </>
  )
}

