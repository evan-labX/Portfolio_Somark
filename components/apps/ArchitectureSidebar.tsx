'use client'

import { motion } from 'framer-motion'

interface ArchitectureTopic {
  id: string
  title: string
}

interface ArchitectureSidebarProps {
  topics: ArchitectureTopic[]
  selectedId: string
  onSelect: (id: string) => void
  isMacOS: boolean
}

const topicIcons: Record<string, JSX.Element> = {
  'agent-lifecycle': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M21 20a9 9 0 1 1-2.29-8.48L23 10"/>
    </svg>
  ),
  'multi-agent': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="5" r="3"/>
      <circle cx="5" cy="19" r="3"/>
      <circle cx="19" cy="19" r="3"/>
      <line x1="12" y1="8" x2="5" y2="16"/>
      <line x1="12" y1="8" x2="19" y2="16"/>
    </svg>
  ),
  'tool-first': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  'long-context-rag': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  'memory-context': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  'evaluation-observability': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  'production-governance': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
}

export default function ArchitectureSidebar({ 
  topics, 
  selectedId, 
  onSelect, 
  isMacOS 
}: ArchitectureSidebarProps) {
  return (
    <div 
      className="w-56 border-r flex flex-col py-3 overflow-y-auto terminal-scroll"
      style={{
        backgroundColor: isMacOS ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.3)',
        borderColor: isMacOS ? 'var(--macos-border)' : 'var(--windows-border)',
      }}
    >
      <div className="px-4 pb-3 mb-2 border-b" style={{ borderColor: isMacOS ? 'var(--macos-border)' : 'var(--windows-border)' }}>
        <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider">
          Architecture Topics
        </h2>
      </div>
      
      <div className="flex flex-col gap-0.5 px-2">
        {topics.map((topic, index) => {
          const isSelected = selectedId === topic.id
          
          return (
            <motion.button
              key={topic.id}
              className={`px-3 py-2.5 text-left text-sm rounded-md transition-colors flex items-start gap-2.5 ${
                isSelected ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
              style={{
                backgroundColor: isSelected 
                  ? (isMacOS ? 'rgba(0, 122, 255, 0.25)' : 'rgba(88, 166, 255, 0.2)')
                  : 'transparent',
              }}
              onClick={() => onSelect(topic.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              whileHover={{ x: 2 }}
            >
              <span 
                className="mt-0.5 flex-shrink-0"
                style={{ 
                  color: isSelected 
                    ? (isMacOS ? '#007aff' : '#58a6ff') 
                    : 'rgba(255,255,255,0.4)' 
                }}
              >
                {topicIcons[topic.id] || (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                  </svg>
                )}
              </span>
              <span className="leading-tight">{topic.title}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Footer hint */}
      <div className="mt-auto px-4 pt-4 border-t" style={{ borderColor: isMacOS ? 'var(--macos-border)' : 'var(--windows-border)' }}>
        <p className="text-[10px] text-white/30 leading-relaxed">
          Internal engineering documentation. Not marketing material.
        </p>
      </div>
    </div>
  )
}

