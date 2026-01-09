'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NetworkPopupProps {
  isOpen: boolean
  onClose: () => void
}

interface Network {
  name: string
  strength: 'excellent' | 'good' | 'fair' | 'weak'
  secured: boolean
  connected?: boolean
}

export default function NetworkPopup({ isOpen, onClose }: NetworkPopupProps) {
  const [isAirplaneMode, setIsAirplaneMode] = useState(false)
  const [isWifiEnabled, setIsWifiEnabled] = useState(true)
  const popupRef = useRef<HTMLDivElement>(null)

  const networks: Network[] = [
    { name: 'Atajan-Portfolio-5G', strength: 'excellent', secured: true, connected: true },
    { name: 'NETGEAR-Guest', strength: 'good', secured: true },
    { name: 'CoffeeShop_WiFi', strength: 'good', secured: false },
    { name: 'xfinitywifi', strength: 'fair', secured: false },
    { name: 'HP-Print-A4', strength: 'weak', secured: true },
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

  const getSignalIcon = (strength: Network['strength']) => {
    const bars = {
      excellent: 4,
      good: 3,
      fair: 2,
      weak: 1,
    }[strength]

    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
        <rect x="2" y="16" width="4" height="6" rx="1" opacity={bars >= 1 ? 1 : 0.3} />
        <rect x="8" y="12" width="4" height="10" rx="1" opacity={bars >= 2 ? 1 : 0.3} />
        <rect x="14" y="8" width="4" height="14" rx="1" opacity={bars >= 3 ? 1 : 0.3} />
        <rect x="20" y="4" width="4" height="18" rx="1" opacity={bars >= 4 ? 1 : 0.3} />
      </svg>
    )
  }

  const toggleAirplaneMode = () => {
    setIsAirplaneMode(!isAirplaneMode)
    if (!isAirplaneMode) {
      setIsWifiEnabled(false)
    }
  }

  const toggleWifi = () => {
    if (isAirplaneMode) return
    setIsWifiEnabled(!isWifiEnabled)
  }

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
          {/* Quick Toggles */}
          <div className="p-3 border-b border-white/10">
            <div className="flex gap-2">
              {/* WiFi Toggle */}
              <button
                onClick={toggleWifi}
                className={`flex-1 p-3 rounded-lg transition-colors ${
                  isWifiEnabled && !isAirplaneMode
                    ? 'bg-[#0078d4]'
                    : 'bg-white/10 hover:bg-white/15'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-4c2.2 0 4.2.9 5.7 2.3l-1.4 1.4C15.2 16.7 13.7 16 12 16s-3.2.7-4.3 1.7l-1.4-1.4C7.8 14.9 9.8 14 12 14zm0-4c3.3 0 6.3 1.3 8.5 3.5l-1.4 1.4C17.2 13 14.7 12 12 12s-5.2 1-7.1 2.9l-1.4-1.4C5.7 11.3 8.7 10 12 10zm0-4c4.4 0 8.4 1.8 11.3 4.7l-1.4 1.4C19.3 9.5 15.8 8 12 8S4.7 9.5 2.1 12.1L.7 10.7C3.6 7.8 7.6 6 12 6z"/>
                  </svg>
                  <span className="text-sm text-white/90">Wi-Fi</span>
                </div>
              </button>

              {/* Airplane Mode */}
              <button
                onClick={toggleAirplaneMode}
                className={`flex-1 p-3 rounded-lg transition-colors ${
                  isAirplaneMode
                    ? 'bg-[#0078d4]'
                    : 'bg-white/10 hover:bg-white/15'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                  <span className="text-sm text-white/90">Airplane</span>
                </div>
              </button>
            </div>
          </div>

          {/* Network List */}
          {isWifiEnabled && !isAirplaneMode ? (
            <div className="p-2 max-h-64 overflow-y-auto terminal-scroll">
              <div className="text-xs text-white/50 px-2 py-1 mb-1">Available networks</div>
              {networks.map((network, index) => (
                <motion.button
                  key={network.name}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    network.connected 
                      ? 'bg-white/10' 
                      : 'hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Signal Strength */}
                  {getSignalIcon(network.strength)}

                  {/* Network Name */}
                  <div className="flex-1 text-left">
                    <div className="text-sm text-white/90 flex items-center gap-2">
                      {network.name}
                      {network.secured && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/40">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                        </svg>
                      )}
                    </div>
                    {network.connected && (
                      <div className="text-xs text-[#0078d4]">Connected</div>
                    )}
                  </div>

                  {/* Connection Status */}
                  {network.connected && (
                    <div className="w-2 h-2 rounded-full bg-[#0078d4]" />
                  )}
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-white/20 mx-auto mb-3">
                {isAirplaneMode ? (
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                ) : (
                  <path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7L12 21.5l3.07-3.94 4.7 4.7 1.27-1.28-4-4.76z"/>
                )}
              </svg>
              <div className="text-sm text-white/50">
                {isAirplaneMode ? 'Airplane mode is on' : 'Wi-Fi is off'}
              </div>
              <div className="text-xs text-white/30 mt-1">
                {isAirplaneMode 
                  ? 'Turn off airplane mode to connect' 
                  : 'Turn on Wi-Fi to see available networks'}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-3 border-t border-white/10">
            <button className="w-full flex items-center justify-between p-2 rounded hover:bg-white/10 transition-colors">
              <span className="text-sm text-white/70">Network & Internet settings</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

