'use client'

import { useState, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useWindows } from '@/context/WindowContext'
import { siteContent } from '@/content/site'
import Taskbar from './Taskbar'
import Window from './Window'
import AppIcon from './AppIcon'
import Terminal from './Terminal'
import AboutMeApp from './apps/AboutMeApp'
import PortfolioExamplesApp from './apps/PortfolioExamplesApp'
import DesktopBackground from './desktop/DesktopBackground'
import DesktopWidgets from './desktop/DesktopWidgets'
import WallpaperPicker from './desktop/WallpaperPicker'
import DesktopContextMenu from './desktop/DesktopContextMenu'
import { AnimatePresence } from 'framer-motion'

const folderIcon = (colorClass: string) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={colorClass}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
)

export default function Desktop() {
  const { theme } = useTheme()
  const { windows } = useWindows()
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

  const isMacOS = theme === 'macos'

  const handleDesktopContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }, [])

  const desktopIcons = [
    {
      id: 'about-me',
      label: 'About Me',
      action: 'window' as const,
      badge: siteContent.badges.aboutMe,
      badgeColor: 'bg-blue-500',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      id: 'ai-evaluations',
      label: 'AI Evaluations',
      action: 'window' as const,
      badge: siteContent.badges.aiEvaluations,
      badgeColor: 'bg-red-500',
      icon: folderIcon('text-red-400'),
    },
    {
      id: 'coding-reviews',
      label: 'Code Reviews',
      action: 'window' as const,
      badge: siteContent.badges.codingReviews,
      badgeColor: 'bg-orange-500',
      icon: folderIcon('text-orange-400'),
    },
    {
      id: 'llm-projects',
      label: 'LLM Projects',
      action: 'window' as const,
      badge: siteContent.badges.llmProjects,
      badgeColor: 'bg-purple-500',
      icon: folderIcon('text-purple-400'),
    },
    {
      id: 'ml-projects',
      label: 'ML Projects',
      action: 'window' as const,
      badge: siteContent.badges.mlProjects,
      badgeColor: 'bg-green-500',
      icon: folderIcon('text-green-400'),
    },
    {
      id: 'scientific-examples',
      label: 'Scientific Examples',
      action: 'window' as const,
      badge: siteContent.badges.scientificExamples,
      badgeColor: 'bg-cyan-500',
      icon: folderIcon('text-cyan-400'),
    },
  ]

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

  const isWindowVisible = (id: string) => {
    const window = windows.find(w => w.id === id)
    return window?.isOpen && !window?.isMinimized
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden relative theme-transition"
      style={{
        paddingTop: isMacOS ? '28px' : '0',
        paddingBottom: isMacOS ? '0' : '60px',
      }}
      onContextMenu={handleDesktopContextMenu}
    >
      <DesktopBackground />
      <DesktopWidgets />
      <WallpaperPicker />
      <DesktopContextMenu
        x={contextMenu?.x ?? 0}
        y={contextMenu?.y ?? 0}
        open={contextMenu !== null}
        onClose={() => setContextMenu(null)}
      />

      <Taskbar />

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
            badge={icon.badge}
            badgeColor={icon.badgeColor}
          />
        ))}

        <AppIcon
          id={themeToggleIcon.id}
          label={themeToggleIcon.label}
          icon={themeToggleIcon.icon}
          action={themeToggleIcon.action}
          badge={themeToggleIcon.badge}
        />
      </div>

      <AnimatePresence>
        {isWindowVisible('terminal') && (
          <Window id="terminal">
            <Terminal />
          </Window>
        )}

        {isWindowVisible('about-me') && (
          <Window id="about-me">
            <AboutMeApp />
          </Window>
        )}

        {isWindowVisible('ai-evaluations') && (
          <Window id="ai-evaluations">
            <PortfolioExamplesApp sectionKey="aiEvaluations" />
          </Window>
        )}

        {isWindowVisible('coding-reviews') && (
          <Window id="coding-reviews">
            <PortfolioExamplesApp sectionKey="codingReviews" />
          </Window>
        )}

        {isWindowVisible('llm-projects') && (
          <Window id="llm-projects">
            <PortfolioExamplesApp sectionKey="llmProjects" />
          </Window>
        )}

        {isWindowVisible('ml-projects') && (
          <Window id="ml-projects">
            <PortfolioExamplesApp sectionKey="mlProjects" />
          </Window>
        )}

        {isWindowVisible('scientific-examples') && (
          <Window id="scientific-examples">
            <PortfolioExamplesApp sectionKey="scientificExamples" />
          </Window>
        )}
      </AnimatePresence>
    </div>
  )
}
