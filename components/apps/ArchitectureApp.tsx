'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '@/content/site'
import { useTheme } from '@/context/ThemeContext'
import ArchitectureDiagram from './ArchitectureDiagram'
import ArchitectureSidebar from './ArchitectureSidebar'

export default function ArchitectureApp() {
  const { theme } = useTheme()
  const [selectedTopicId, setSelectedTopicId] = useState(siteContent.architecture.topics[0]?.id || '')
  
  const isMacOS = theme === 'macos'
  const { topics } = siteContent.architecture
  
  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[0]

  const sidebarTopics = topics.map(t => ({ id: t.id, title: t.title }))

  return (
    <div 
      className="h-full flex"
      style={{ backgroundColor: isMacOS ? 'var(--macos-window)' : 'var(--windows-window)' }}
    >
      {/* Sidebar */}
      <ArchitectureSidebar
        topics={sidebarTopics}
        selectedId={selectedTopicId}
        onSelect={setSelectedTopicId}
        isMacOS={isMacOS}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto terminal-scroll">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTopicId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 space-y-6"
          >
            {/* Header */}
            <div className="space-y-3">
              <h1 className="text-xl font-semibold text-white font-mono">
                {selectedTopic.title}
              </h1>
              <p className="text-white/70 leading-relaxed text-sm">
                {selectedTopic.overview}
              </p>
            </div>

            {/* Diagram */}
            <div className="space-y-2">
              <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider font-mono">
                System Diagram
              </h2>
              <ArchitectureDiagram 
                config={selectedTopic.diagram as any} 
                isMacOS={isMacOS} 
              />
            </div>

            {/* Flow Explanation */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider font-mono">
                Component Flow
              </h2>
              <div 
                className="rounded-lg p-4 space-y-2"
                style={{
                  backgroundColor: isMacOS ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isMacOS ? 'var(--macos-border)' : 'var(--windows-border)'}`,
                }}
              >
                {selectedTopic.flowExplanation.map((step, i) => {
                  const [label, ...rest] = step.split(':')
                  const description = rest.join(':')
                  
                  return (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-white/30 font-mono text-xs mt-0.5 w-4">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <div>
                        <span 
                          className="font-medium"
                          style={{ color: isMacOS ? '#007aff' : '#58a6ff' }}
                        >
                          {label}:
                        </span>
                        <span className="text-white/60">{description}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Design Principles */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider font-mono">
                Design Principles
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {selectedTopic.principles.map((principle, i) => (
                  <div 
                    key={i}
                    className="p-3 rounded-lg text-sm"
                    style={{
                      backgroundColor: isMacOS ? 'rgba(0, 122, 255, 0.08)' : 'rgba(88, 166, 255, 0.08)',
                      border: `1px solid ${isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)'}`,
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <span style={{ color: isMacOS ? '#007aff' : '#58a6ff' }}>✓</span>
                      <span className="text-white/70">{principle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Failure Modes */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider font-mono">
                Common Failure Modes
              </h2>
              <div 
                className="rounded-lg p-4"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                <ul className="space-y-2">
                  {selectedTopic.failureModes.map((failure, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-red-400 mt-0.5">⚠</span>
                      <span className="text-white/60">{failure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trade-offs */}
            <div className="space-y-3">
              <h2 className="text-xs font-medium text-white/40 uppercase tracking-wider font-mono">
                Trade-offs & Constraints
              </h2>
              <div 
                className="rounded-lg p-4"
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                }}
              >
                <ul className="space-y-2">
                  {selectedTopic.tradeoffs.map((tradeoff, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-amber-400 mt-0.5">⇄</span>
                      <span className="text-white/60">{tradeoff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div 
              className="pt-4 mt-6 border-t text-xs text-white/30 font-mono"
              style={{ borderColor: isMacOS ? 'var(--macos-border)' : 'var(--windows-border)' }}
            >
              <p>
                This documentation reflects internal engineering thinking. 
                Diagrams and explanations are based on real production systems.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
