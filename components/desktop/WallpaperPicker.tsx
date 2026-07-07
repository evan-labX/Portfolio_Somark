'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useWallpaper, wallpaperOptions } from '@/context/WallpaperContext'

export default function WallpaperPicker() {
  const { theme } = useTheme()
  const { wallpaper, setWallpaper, pickerOpen, closePicker } = useWallpaper()
  const isMacOS = theme === 'macos'

  return (
    <AnimatePresence>
      {pickerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePicker}
          />
          <motion.div
            className="fixed z-[91] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(520px,92vw)] rounded-2xl border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: isMacOS ? 'rgba(45,45,58,0.95)' : 'rgba(22,27,34,0.95)',
              borderColor: isMacOS ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(24px)',
            }}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-white font-medium">Choose Wallpaper</h2>
                <p className="text-xs text-white/45 mt-0.5">Personalize your desktop background</p>
              </div>
              <button
                onClick={closePicker}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto terminal-scroll">
              {wallpaperOptions.map((option) => {
                const selected = wallpaper === option.id
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      setWallpaper(option.id)
                      closePicker()
                    }}
                    className={`rounded-xl overflow-hidden text-left border-2 transition-all ${
                      selected
                        ? 'border-sky-400 shadow-lg shadow-sky-500/20'
                        : 'border-transparent hover:border-white/20'
                    }`}
                  >
                    <div
                      className="h-20 w-full relative"
                      style={{ background: option.preview }}
                    >
                      {selected && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="w-6 h-6 rounded-full bg-sky-400 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 bg-white/[0.03]">
                      <p className="text-xs font-medium text-white/85">{option.name}</p>
                      <p className="text-[10px] text-white/40 mt-0.5 line-clamp-1">{option.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="px-5 py-3 border-t border-white/10 text-[11px] text-white/35">
              Right-click the desktop anytime to change wallpaper
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
