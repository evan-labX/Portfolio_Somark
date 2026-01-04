'use client'

import GalleryItem from './GalleryItem'

interface GalleryItemData {
  id: string
  title: string
  category: string
  image: string
  context: string
  description: string
  keyTakeaways: string[]
}

interface GalleryGridProps {
  items: GalleryItemData[]
  onItemClick: (item: GalleryItemData) => void
}

export default function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <svg 
            className="w-16 h-16 mx-auto mb-4 text-white/20" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
            />
          </svg>
          <p className="text-white/40 text-sm">No diagrams match the selected filter</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {items.map((item, index) => (
        <GalleryItem
          key={item.id}
          id={item.id}
          title={item.title}
          category={item.category}
          image={item.image}
          context={item.context}
          onClick={() => onItemClick(item)}
          index={index}
        />
      ))}
    </div>
  )
}

