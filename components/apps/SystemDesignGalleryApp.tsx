'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { siteContent } from '@/content/site'
import GalleryGrid from './GalleryGrid'
import GalleryViewer from './GalleryViewer'

interface GalleryItemData {
  id: string
  title: string
  category: string
  image: string
  context: string
  description: string
  keyTakeaways: string[]
}

export default function SystemDesignGalleryApp() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const [selectedItem, setSelectedItem] = useState<GalleryItemData | null>(null)

  const galleryItems = siteContent.systemDesignGallery as GalleryItemData[]
  const categories = siteContent.galleryCategories as string[]

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return galleryItems
    return galleryItems.filter(item => item.category === selectedCategory)
  }, [galleryItems, selectedCategory])

  const getCategoryCount = (category: string) => {
    return galleryItems.filter(item => item.category === category).length
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title={showSidebar ? 'Hide filters' : 'Show filters'}
          >
            <svg 
              className="w-5 h-5 text-white/70" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
              />
            </svg>
          </button>
          <div className="h-5 w-px bg-white/20" />
          <h1 className="text-sm font-medium text-white/80">
            System Design Gallery
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-white/40">
            {filteredItems.length} diagram{filteredItems.length !== 1 ? 's' : ''}
            {selectedCategory && (
              <span className="text-white/30"> in {selectedCategory}</span>
            )}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {showSidebar && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-r border-white/10 bg-black/20 flex-shrink-0 overflow-hidden"
            >
              <div className="w-[220px] p-4">
                <div className="mb-4">
                  <h2 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                    Categories
                  </h2>
                  
                  {/* All items */}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-colors mb-1 ${
                      selectedCategory === null
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                    }`}
                  >
                    <span>All Diagrams</span>
                    <span className="text-xs font-mono opacity-60">
                      {galleryItems.length}
                    </span>
                  </button>
                </div>
                
                {/* Category list */}
                <div className="space-y-1">
                  {categories.map((category) => {
                    const count = getCategoryCount(category)
                    const isSelected = selectedCategory === category
                    
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                          isSelected
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                        }`}
                      >
                        <span className="truncate">{category}</span>
                        <span className="text-xs font-mono opacity-60 flex-shrink-0 ml-2">
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>
                
                {/* Info box */}
                <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start gap-2">
                    <svg 
                      className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <p className="text-[10px] text-white/40 leading-relaxed">
                      Visual artifacts from real system design work, including architecture diagrams, 
                      data flows, and technical documentation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery grid */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <GalleryGrid 
            items={filteredItems} 
            onItemClick={setSelectedItem}
          />
        </div>
      </div>

      {/* Viewer modal */}
      <AnimatePresence>
        {selectedItem && (
          <GalleryViewer
            item={selectedItem}
            items={filteredItems}
            onClose={() => setSelectedItem(null)}
            onNavigate={setSelectedItem}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

