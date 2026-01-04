'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
  context: string
  description: string
  keyTakeaways: string[]
}

interface GalleryViewerProps {
  item: GalleryItem
  items: GalleryItem[]
  onClose: () => void
  onNavigate: (item: GalleryItem) => void
}

export default function GalleryViewer({
  item,
  items,
  onClose,
  onNavigate,
}: GalleryViewerProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageError, setImageError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentIndex = items.findIndex(i => i.id === item.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < items.length - 1

  // Reset zoom and position when item changes
  useEffect(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
    setImageError(false)
  }, [item.id])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (hasPrev) onNavigate(items[currentIndex - 1])
          break
        case 'ArrowRight':
          if (hasNext) onNavigate(items[currentIndex + 1])
          break
        case '+':
        case '=':
          setScale(prev => Math.min(prev + 0.25, 3))
          break
        case '-':
          setScale(prev => Math.max(prev - 0.25, 0.5))
          break
        case '0':
          setScale(1)
          setPosition({ x: 0, y: 0 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasPrev, hasNext, currentIndex, items, onClose, onNavigate])

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5))
  const handleResetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }, [scale, position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }, [isDragging, scale, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md flex"
    >
      {/* Main image area */}
      <div className="flex-1 relative flex flex-col">
        {/* Top toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Close (ESC)"
            >
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="h-5 w-px bg-white/20" />
            <span className="text-sm font-mono text-white/50">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Zoom out (-)"
            >
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>
            <button
              onClick={handleResetZoom}
              className="px-3 py-1 hover:bg-white/10 rounded-lg transition-colors text-sm font-mono text-white/70"
              title="Reset zoom (0)"
            >
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Zoom in (+)"
            >
              <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image container */}
        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <div 
            className="absolute inset-0 flex items-center justify-center p-8"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
          >
            {!imageError ? (
              <div className="relative max-w-full max-h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1200}
                  height={800}
                  className="object-contain max-w-full max-h-[calc(100vh-300px)] rounded-lg shadow-2xl"
                  onError={() => setImageError(true)}
                  priority
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-white/30">
                <svg 
                  className="w-24 h-24 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <p className="text-sm font-mono">Image not available</p>
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          {hasPrev && (
            <button
              onClick={() => onNavigate(items[currentIndex - 1])}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors border border-white/10"
              title="Previous (←)"
            >
              <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {hasNext && (
            <button
              onClick={() => onNavigate(items[currentIndex + 1])}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors border border-white/10"
              title="Next (→)"
            >
              <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Info panel */}
      <div className="w-80 border-l border-white/10 bg-black/30 flex flex-col">
        <div className="p-6 overflow-y-auto flex-1">
          {/* Category & context */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/10 text-white/70 rounded">
              {item.category}
            </span>
            <span className="px-2 py-1 text-[10px] font-mono bg-blue-500/20 text-blue-300 rounded">
              {item.context}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-medium text-white mb-4">
            {item.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Key takeaways */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white/40">
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {item.keyTakeaways.map((takeaway, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-sm text-white/70"
                >
                  <span className="text-green-400 mt-1">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="text-[10px] font-mono text-white/30 space-y-1">
            <div className="flex justify-between">
              <span>Navigation</span>
              <span>← →</span>
            </div>
            <div className="flex justify-between">
              <span>Zoom</span>
              <span>+ - 0</span>
            </div>
            <div className="flex justify-between">
              <span>Close</span>
              <span>ESC</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

