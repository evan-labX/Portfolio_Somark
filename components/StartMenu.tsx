'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useWindows } from '@/context/WindowContext'
import { siteContent } from '@/content/site'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const { theme } = useTheme()
  const { openWindow } = useWindows()
  
  const isMacOS = theme === 'macos'

  const menuApps = [
    {
      id: 'about-me',
      label: 'About Me',
      badge: siteContent.badges.aboutMe,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      action: () => { openWindow('about-me'); onClose(); },
    },
    {
      id: 'ai-evaluations',
      label: 'AI Evaluations',
      badge: siteContent.badges.aiEvaluations,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-400">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      action: () => { openWindow('ai-evaluations'); onClose(); },
    },
    {
      id: 'coding-reviews',
      label: 'Coding Reviews',
      badge: siteContent.badges.codingReviews,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      action: () => { openWindow('coding-reviews'); onClose(); },
    },
    {
      id: 'llm-projects',
      label: 'LLM Projects',
      badge: siteContent.badges.llmProjects,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      action: () => { openWindow('llm-projects'); onClose(); },
    },
    {
      id: 'ml-projects',
      label: 'ML Projects',
      badge: siteContent.badges.mlProjects,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-400">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      action: () => { openWindow('ml-projects'); onClose(); },
    },
    {
      id: 'scientific-examples',
      label: 'Scientific Examples',
      badge: siteContent.badges.scientificExamples,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      action: () => { openWindow('scientific-examples'); onClose(); },
    },
    {
      id: 'github',
      label: 'Github',
      badge: siteContent.badges.github,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-white/90">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      action: () => { window.open(siteContent.contact.github, '_blank'); onClose(); },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      badge: siteContent.badges.linkedin,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#0077b5]">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      action: () => { window.open(siteContent.contact.linkedin, '_blank'); onClose(); },
    },
    {
      id: 'resume',
      label: 'Resume',
      badge: null,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
          <path d="M8 12h8v2H8v-2zm0 4h8v2H8v-2z"/>
        </svg>
      ),
      action: () => { window.open(siteContent.contact.resume, '_blank'); onClose(); },
    },
  ]

  // Curated top skills - most important ones
  const topSkills = [
    'Machine Learning',
    'AI Model Evaluation',
    'Artificial Intelligence (AI)',
    'Python',
    'PyTorch',
    'Deep Learning',
    'Data Analysis',
    'LLM Applications',
    'Scientific Reasoning',
    'Technical Writing',
  ]

  // macOS Apple Menu items
  const macOSMenuItems = [
    { label: 'About This Mac', action: () => { openWindow('about-me'); onClose(); }, shortcut: null },
    { type: 'divider' },
    { label: 'System Preferences...', action: () => { openWindow('ai-evaluations'); onClose(); }, shortcut: null },
    { label: 'App Store...', action: () => { window.open(siteContent.contact.github, '_blank'); onClose(); }, shortcut: null },
    { type: 'divider' },
    { label: 'Recent Items', action: () => {}, shortcut: '►', submenu: true },
    { type: 'divider' },
    { label: 'Force Quit...', action: () => {}, shortcut: '⌥⌘⎋' },
    { type: 'divider' },
    { label: 'Sleep', action: () => {}, shortcut: null },
    { label: 'Restart...', action: () => window.location.reload(), shortcut: null },
    { label: 'Shut Down...', action: () => window.close(), shortcut: null },
    { type: 'divider' },
    { label: 'Lock Screen', action: () => window.location.reload(), shortcut: '⌃⌘Q' },
    { label: 'Log Out Atadzhan...', action: () => window.location.reload(), shortcut: '⇧⌘Q' },
  ]

  if (isMacOS) {
    // macOS Apple Menu (dropdown from top-left)
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            
            {/* macOS Style Dropdown Menu */}
            <motion.div
              className="fixed z-50 rounded-md overflow-hidden py-1"
              style={{
                width: 240,
                top: 28,
                left: 8,
                backgroundColor: 'rgba(40, 40, 45, 0.98)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255,255,255,0.1)',
              }}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {macOSMenuItems.map((item, index) => (
                item.type === 'divider' ? (
                  <div key={index} className="h-px bg-white/10 my-1 mx-2" />
                ) : (
                  <button
                    key={index}
                    className="w-full px-3 py-1 flex items-center justify-between hover:bg-[#0058d0] group transition-colors"
                    onClick={item.action}
                  >
                    <span className="text-[13px] text-white/90 group-hover:text-white">
                      {item.label}
                    </span>
                    {item.shortcut && (
                      <span className="text-[12px] text-white/40 group-hover:text-white/70 ml-4">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                )
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  // Windows 11 Start Menu (centered at bottom)
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Windows 11 Start Menu */}
          <motion.div
            className="fixed z-50 rounded-xl overflow-hidden"
            style={{
              width: 380,
              bottom: 68,
              left: '50%',
              x: '-50%',
              backgroundColor: 'rgba(32, 32, 32, 0.95)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* App Icons Row */}
            <div className="p-4 flex justify-center gap-3">
              {menuApps.map((app) => (
                <button
                  key={app.id}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors relative"
                  onClick={app.action}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      {app.icon}
                    </div>
                    {app.badge && (
                      <span 
                        className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-red-500"
                      >
                        {app.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-white/80 text-center leading-tight max-w-[60px]">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mx-4" />

            {/* Contact Info */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-sm w-24">Phone</span>
                <span className="text-white/90 text-sm">{siteContent.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-sm w-24">Email</span>
                <a href={`mailto:${siteContent.contact.email}`} className="text-white/90 text-sm hover:text-white">
                  {siteContent.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/50 text-sm w-24">Location</span>
                <span className="text-white/90 text-sm">{siteContent.contact.location}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mx-4" />

            {/* Experience & Skills */}
            <div className="p-4 space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-white/50 text-sm w-24">Experience</span>
                <span className="text-white/90 text-sm font-medium">6+ years</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white/50 text-sm w-24 shrink-0">Skills</span>
                <div className="text-white/90 text-sm leading-relaxed">
                  {topSkills.join(', ')}
                </div>
              </div>
            </div>

            {/* Footer - Profile */}
            <div 
              className="p-3 flex items-center justify-between"
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                  <img 
                    src="/imgs/Somark.jpg" 
                    alt={siteContent.meta.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-white text-sm font-medium">{siteContent.meta.name}</div>
                  <div className="text-white/50 text-xs">AI Model Evaluation Specialist</div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  onClick={() => window.open(`tel:${siteContent.contact.phone}`, '_blank')}
                  title="Call"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </button>
                <button 
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  onClick={() => window.open(`mailto:${siteContent.contact.email}`, '_blank')}
                  title="Email"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </button>
                <button 
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  onClick={() => window.open(siteContent.contact.github, '_blank')}
                  title="GitHub"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
                <button 
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  onClick={() => window.open(siteContent.contact.linkedin, '_blank')}
                  title="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

