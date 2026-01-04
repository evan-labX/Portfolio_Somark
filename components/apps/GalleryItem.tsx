'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface GalleryItemProps {
  id: string
  title: string
  category: string
  image: string
  context: string
  onClick: () => void
  index: number
}

export default function GalleryItem({
  id,
  title,
  category,
  image,
  context,
  onClick,
  index,
}: GalleryItemProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div 
        className="relative overflow-hidden rounded-lg border border-white/10 bg-black/30 backdrop-blur-sm transition-all duration-300"
        style={{
          boxShadow: isHovered 
            ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)' 
            : '0 4px 16px rgba(0, 0, 0, 0.2)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50">
          {!imageError ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
              onError={() => setImageError(true)}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700/30 to-gray-800/30">
              <div className="text-center">
                <svg 
                  className="w-12 h-12 mx-auto mb-2 text-white/20" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <span className="text-xs text-white/30 font-mono">Diagram</span>
              </div>
            </div>
          )}
          
          {/* Gradient overlay on hover */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0.6 }}
          />
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-black/50 backdrop-blur-sm text-white/70 rounded border border-white/10">
              {category}
            </span>
          </div>
          
          {/* Context badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-[10px] font-mono bg-blue-500/20 backdrop-blur-sm text-blue-300 rounded border border-blue-500/30">
              {context}
            </span>
          </div>
        </div>
        
        {/* Info panel */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-white/90 leading-tight line-clamp-2 mb-2">
            {title}
          </h3>
          
          {/* View indicator */}
          <div 
            className="flex items-center gap-2 text-xs text-white/40 transition-all duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Click to view</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

