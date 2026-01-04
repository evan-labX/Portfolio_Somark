'use client'

import { useTheme } from '@/context/ThemeContext'
import { useWindows } from '@/context/WindowContext'
import { siteContent } from '@/content/site'
import Taskbar from './Taskbar'
import Window from './Window'
import AppIcon from './AppIcon'
import Terminal from './Terminal'
import ProjectsApp from './apps/ProjectsApp'
import ArchitectureApp from './apps/ArchitectureApp'
import SystemDesignGalleryApp from './apps/SystemDesignGalleryApp'
import { AnimatePresence, motion } from 'framer-motion'

export default function Desktop() {
  const { theme } = useTheme()
  const { windows } = useWindows()

  const isMacOS = theme === 'macos'

  const desktopIcons = [
    {
      id: 'projects',
      label: 'Projects',
      action: 'window' as const,
      badge: siteContent.badges.projects,
      badgeColor: 'bg-red-500',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
    {
      id: 'architecture',
      label: 'Architecture',
      action: 'window' as const,
      badge: '7',
      badgeColor: 'bg-blue-500',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-400">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      ),
    },
    {
      id: 'gallery',
      label: 'Gallery',
      action: 'window' as const,
      badge: '8',
      badgeColor: 'bg-purple-500',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      ),
    },
    {
      id: 'github',
      label: 'Github',
      action: 'link' as const,
      href: siteContent.contact.github,
      badge: siteContent.badges.github,
      badgeColor: 'bg-red-500',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      action: 'link' as const,
      href: siteContent.contact.linkedin,
      badge: siteContent.badges.linkedin,
      badgeColor: 'bg-red-500',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0077b5]">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      id: 'resume',
      label: 'Resume',
      action: 'link' as const,
      href: siteContent.contact.resume,
      badge: null,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"/>
          <path d="M8 12h8v2H8v-2zm0 4h8v2H8v-2z"/>
        </svg>
      ),
    },
  ]

  // Theme toggle icon (separate from desktop icons)
  const themeToggleIcon = {
    id: 'theme',
    label: isMacOS ? 'Windows' : 'macOS',
    action: 'toggle' as const,
    badge: null,
    icon: isMacOS ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#00a4ef]">
        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
      </svg>
    ) : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/80">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative theme-transition"
      style={{
        paddingTop: isMacOS ? '28px' : '0',
        paddingBottom: isMacOS ? '0' : '60px',
      }}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: isMacOS 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
            : 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
        }}
      >
        {/* Subtle noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Gradient accent */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          animate={{
            x: isMacOS ? '60%' : '70%',
            y: isMacOS ? '20%' : '30%',
          }}
          transition={{ duration: 0.5 }}
          style={{
            background: isMacOS 
              ? 'radial-gradient(circle, #007aff 0%, transparent 70%)'
              : 'radial-gradient(circle, #58a6ff 0%, transparent 70%)',
            right: 0,
            top: 0,
          }}
        />
      </div>

      {/* Taskbar */}
      <Taskbar />

      {/* Desktop Icons */}
      <div 
        className="absolute left-4 flex flex-col gap-2 z-10"
        style={{
          top: isMacOS ? '44px' : '16px',
        }}
      >
        {desktopIcons.map((icon) => (
          <AppIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            action={icon.action}
            href={icon.href}
            badge={icon.badge}
            badgeColor={icon.badgeColor}
          />
        ))}
        
        {/* Theme Toggle - Below Resume */}
        <AppIcon
          id={themeToggleIcon.id}
          label={themeToggleIcon.label}
          icon={themeToggleIcon.icon}
          action={themeToggleIcon.action}
          badge={themeToggleIcon.badge}
        />
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.find(w => w.id === 'terminal')?.isOpen && !windows.find(w => w.id === 'terminal')?.isMinimized && (
          <Window id="terminal">
            <Terminal />
          </Window>
        )}
        
        {windows.find(w => w.id === 'projects')?.isOpen && !windows.find(w => w.id === 'projects')?.isMinimized && (
          <Window id="projects">
            <ProjectsApp />
          </Window>
        )}
        
        {windows.find(w => w.id === 'architecture')?.isOpen && !windows.find(w => w.id === 'architecture')?.isMinimized && (
          <Window id="architecture">
            <ArchitectureApp />
          </Window>
        )}
        
        {windows.find(w => w.id === 'gallery')?.isOpen && !windows.find(w => w.id === 'gallery')?.isMinimized && (
          <Window id="gallery">
            <SystemDesignGalleryApp />
          </Window>
        )}
      </AnimatePresence>
    </div>
  )
}
