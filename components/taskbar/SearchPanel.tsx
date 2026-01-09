'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindows } from '@/context/WindowContext'
import { siteContent } from '@/content/site'

interface SearchPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface AppItem {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  action: () => void
  type: 'app' | 'link'
}

export default function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [recentApps, setRecentApps] = useState<string[]>(['terminal', 'projects'])
  const inputRef = useRef<HTMLInputElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const { openWindow } = useWindows()

  const apps: AppItem[] = [
    {
      id: 'terminal',
      name: 'Terminal',
      description: 'Command line interface',
      type: 'app',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#00a4ef]">
          <rect x="2" y="3" width="20" height="18" rx="2" fill="currentColor" opacity="0.2"/>
          <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <polyline points="6 15 10 11 6 7" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="12" y1="17" x2="18" y2="17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      action: () => { openWindow('terminal'); addToRecent('terminal'); onClose(); }
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'View portfolio projects',
      type: 'app',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      action: () => { openWindow('projects'); addToRecent('projects'); onClose(); }
    },
    {
      id: 'architecture',
      name: 'Architecture',
      description: 'System design patterns',
      type: 'app',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-400">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      ),
      action: () => { openWindow('architecture'); addToRecent('architecture'); onClose(); }
    },
    {
      id: 'gallery',
      name: 'Gallery',
      description: 'System design diagrams',
      type: 'app',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      ),
      action: () => { openWindow('gallery'); addToRecent('gallery'); onClose(); }
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'View source code',
      type: 'link',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/90">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      action: () => { window.open(siteContent.contact.github, '_blank'); onClose(); }
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Professional profile',
      type: 'link',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0077b5]">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      action: () => { window.open(siteContent.contact.linkedin, '_blank'); onClose(); }
    },
    {
      id: 'resume',
      name: 'Resume',
      description: 'Download resume',
      type: 'link',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
          <path d="M8 12h8v2H8v-2zm0 4h8v2H8v-2z"/>
        </svg>
      ),
      action: () => { window.open(siteContent.contact.resume, '_blank'); onClose(); }
    },
  ]

  const addToRecent = (appId: string) => {
    setRecentApps(prev => {
      const filtered = prev.filter(id => id !== appId)
      return [appId, ...filtered].slice(0, 4)
    })
  }

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
    if (!isOpen) {
      setSearchQuery('')
    }
  }, [isOpen])

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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const recentAppItems = recentApps
    .map(id => apps.find(app => app.id === id))
    .filter(Boolean) as AppItem[]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          className="fixed z-50 rounded-xl overflow-hidden"
          style={{
            width: 600,
            maxHeight: 500,
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
          {/* Search Input */}
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search apps..."
                className="w-full h-12 pl-12 pr-4 bg-white/5 rounded-lg text-white placeholder-white/40 outline-none focus:bg-white/10 transition-colors"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[380px] overflow-y-auto terminal-scroll">
            {searchQuery === '' ? (
              <>
                {/* Recent Apps */}
                {recentAppItems.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs text-white/50 mb-3 px-1">Recent</div>
                    <div className="grid grid-cols-4 gap-2">
                      {recentAppItems.map((app, index) => (
                        <motion.button
                          key={app.id}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors"
                          onClick={app.action}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                            {app.icon}
                          </div>
                          <span className="text-xs text-white/70 text-center">{app.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Apps */}
                <div>
                  <div className="text-xs text-white/50 mb-3 px-1">All apps</div>
                  <div className="space-y-1">
                    {apps.map((app, index) => (
                      <motion.button
                        key={app.id}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={app.action}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                          {app.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm text-white/90">{app.name}</div>
                          <div className="text-xs text-white/50">{app.description}</div>
                        </div>
                        <div className="text-xs text-white/30 px-2 py-1 rounded bg-white/5">
                          {app.type === 'app' ? 'App' : 'Link'}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </>
            ) : filteredApps.length > 0 ? (
              <div className="space-y-1">
                {filteredApps.map((app, index) => (
                  <motion.button
                    key={app.id}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={app.action}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      {app.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm text-white/90">{app.name}</div>
                      <div className="text-xs text-white/50">{app.description}</div>
                    </div>
                    <div className="text-xs text-white/30 px-2 py-1 rounded bg-white/5">
                      {app.type === 'app' ? 'App' : 'Link'}
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 mx-auto mb-3">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <div className="text-sm text-white/50">No results found</div>
                <div className="text-xs text-white/30 mt-1">Try a different search term</div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

