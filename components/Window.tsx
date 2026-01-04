'use client'

import { motion, useDragControls } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useWindows } from '@/context/WindowContext'
import { ReactNode, useRef, useState, useEffect } from 'react'

interface WindowProps {
  id: string
  children: ReactNode
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw' | null

export default function Window({ id, children }: WindowProps) {
  const { theme } = useTheme()
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition, updateSize, activeWindowId } = useWindows()
  const dragControls = useDragControls()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [isHoveringButtons, setIsHoveringButtons] = useState(false)
  const [resizeDir, setResizeDir] = useState<ResizeDirection>(null)
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; width: number; height: number; posX: number; posY: number } | null>(null)
  
  const windowState = windows.find(w => w.id === id)
  
  // Get values safely for the effect (use defaults if window not found)
  const size = windowState?.size || { width: 800, height: 600 }
  const position = windowState?.position || { x: 0, y: 0 }
  const minSize = windowState?.minSize
  
  // Handle resize mouse move - MUST be called before any early returns
  useEffect(() => {
    if (!resizeDir || !resizeStart) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      
      let newWidth = resizeStart.width
      let newHeight = resizeStart.height
      let newPosX = resizeStart.posX
      let newPosY = resizeStart.posY

      // Handle horizontal resize
      if (resizeDir.includes('e')) {
        newWidth = resizeStart.width + deltaX
      } else if (resizeDir.includes('w')) {
        newWidth = resizeStart.width - deltaX
        newPosX = resizeStart.posX + deltaX
      }

      // Handle vertical resize
      if (resizeDir.includes('s')) {
        newHeight = resizeStart.height + deltaY
      } else if (resizeDir.includes('n')) {
        newHeight = resizeStart.height - deltaY
        newPosY = resizeStart.posY + deltaY
      }

      // Apply minimum size constraints
      const minWidth = minSize?.width || 300
      const minHeight = minSize?.height || 200

      if (newWidth < minWidth) {
        if (resizeDir.includes('w')) {
          newPosX = resizeStart.posX + (resizeStart.width - minWidth)
        }
        newWidth = minWidth
      }
      if (newHeight < minHeight) {
        if (resizeDir.includes('n')) {
          newPosY = resizeStart.posY + (resizeStart.height - minHeight)
        }
        newHeight = minHeight
      }

      updateSize(id, { width: newWidth, height: newHeight })
      if (resizeDir.includes('w') || resizeDir.includes('n')) {
        updatePosition(id, { x: newPosX, y: newPosY })
      }
    }

    const handleMouseUp = () => {
      setResizeDir(null)
      setResizeStart(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [resizeDir, resizeStart, id, updateSize, updatePosition, minSize])
  
  // Early return AFTER all hooks
  if (!windowState || !windowState.isOpen || windowState.isMinimized) {
    return null
  }

  const { title, zIndex, isMaximized } = windowState
  const isFocused = activeWindowId === id
  const isMacOS = theme === 'macos'

  const handleDragStart = (e: React.PointerEvent) => {
    // Don't start drag if clicking on buttons or if maximized
    const target = e.target as HTMLElement
    if (target.closest('.traffic-lights') || target.closest('.win-buttons') || isMaximized) {
      return
    }
    dragControls.start(e)
  }

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.preventDefault()
    e.stopPropagation()
    setResizeDir(direction)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y,
    })
    focusWindow(id)
  }

  // Double-click title bar to maximize
  const handleTitleDoubleClick = () => {
    maximizeWindow(id)
  }

  return (
    <motion.div
      className={`absolute rounded-xl overflow-hidden shadow-window theme-transition ${
        isFocused ? 'shadow-window-focused' : 'opacity-95'
      } ${isMaximized ? 'rounded-none' : ''}`}
      style={{
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? 'calc(100vh - 48px)' : size.height,
        zIndex,
        backgroundColor: isMacOS ? 'var(--macos-window)' : 'var(--windows-window)',
        border: isMaximized ? 'none' : `1px solid ${isMacOS ? 'var(--macos-border)' : 'var(--windows-border)'}`,
        left: isMaximized ? 0 : undefined,
        top: isMaximized ? 0 : undefined,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragListener={false}
      onDragEnd={(_, info) => {
        if (!isMaximized) {
          updatePosition(id, {
            x: position.x + info.offset.x,
            y: position.y + info.offset.y,
          })
        }
      }}
      onMouseDown={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div
        className={`window-drag flex items-center h-10 px-3 no-select ${
          isMacOS ? 'justify-start' : 'justify-between'
        }`}
        style={{
          backgroundColor: isMacOS 
            ? (isFocused ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)')
            : (isFocused ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)'),
          borderBottom: `1px solid ${isMacOS ? 'var(--macos-border)' : 'var(--windows-border)'}`,
          cursor: isMaximized ? 'default' : 'grab',
        }}
        onPointerDown={handleDragStart}
        onDoubleClick={handleTitleDoubleClick}
      >
        {isMacOS ? (
          <>
            {/* macOS Traffic Lights */}
            <div 
              className="traffic-lights flex items-center gap-2 mr-4"
              onMouseEnter={() => setIsHoveringButtons(true)}
              onMouseLeave={() => setIsHoveringButtons(false)}
            >
              {/* Close - Red */}
              <button
                className="traffic-light group relative flex items-center justify-center"
                style={{ backgroundColor: isFocused ? '#ff5f57' : '#4a4a4a' }}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  closeWindow(id)
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {isHoveringButtons && isFocused && (
                  <svg width="8" height="8" viewBox="0 0 8 8" className="absolute">
                    <path d="M1 1l6 6M7 1L1 7" stroke="#4a0000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
              
              {/* Minimize - Yellow */}
              <button
                className="traffic-light group relative flex items-center justify-center"
                style={{ backgroundColor: isFocused ? '#febc2e' : '#4a4a4a' }}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  minimizeWindow(id)
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {isHoveringButtons && isFocused && (
                  <svg width="8" height="2" viewBox="0 0 8 2" className="absolute">
                    <path d="M1 1h6" stroke="#995700" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
              
              {/* Maximize - Green */}
              <button
                className="traffic-light group relative flex items-center justify-center"
                style={{ backgroundColor: isFocused ? '#28c840' : '#4a4a4a' }}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  maximizeWindow(id)
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {isHoveringButtons && isFocused && (
                  <svg width="8" height="8" viewBox="0 0 8 8" className="absolute">
                    {isMaximized ? (
                      <path d="M2 3V2h4v4H5M1 4v3h3V4H1" stroke="#006500" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    ) : (
                      <path d="M1 3V1h2M5 1h2v2M7 5v2H5M3 7H1V5" stroke="#006500" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    )}
                  </svg>
                )}
              </button>
            </div>
            <span className="text-sm text-white/70 flex-1 text-center -ml-16">{title}</span>
          </>
        ) : (
          <>
            {/* Windows Title */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/70">{title}</span>
            </div>
            {/* Windows Buttons */}
            <div className="win-buttons flex items-center -mr-3">
              <button
                className="win-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  minimizeWindow(id)
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <svg width="10" height="1" viewBox="0 0 10 1" fill="currentColor" className="text-white/70">
                  <rect width="10" height="1" />
                </svg>
              </button>
              <button
                className="win-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  maximizeWindow(id)
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {isMaximized ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/70">
                    <rect x="2.5" y="0.5" width="7" height="7" />
                    <rect x="0.5" y="2.5" width="7" height="7" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/70">
                    <rect x="0.5" y="0.5" width="9" height="9" />
                  </svg>
                )}
              </button>
              <button
                className="win-btn win-btn-close"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  closeWindow(id)
                }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.2" className="text-white/70">
                  <line x1="1" y1="1" x2="9" y2="9" />
                  <line x1="9" y1="1" x2="1" y2="9" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Window Content */}
      <div 
        className="overflow-auto"
        style={{ height: `calc(100% - 40px)` }}
      >
        {children}
      </div>

      {/* Resize Handles - Only show when not maximized */}
      {!isMaximized && (
        <>
          {/* Edge handles */}
          <div
            className="absolute top-0 left-2 right-2 h-1 cursor-n-resize hover:bg-white/10"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize hover:bg-white/10"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize hover:bg-white/10"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize hover:bg-white/10"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          
          {/* Corner handles */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
        </>
      )}
    </motion.div>
  )
}
