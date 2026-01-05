'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '@/content/site'
import { useTheme } from '@/context/ThemeContext'

export default function MobileFallback() {
  const { theme, toggleTheme } = useTheme()
  const [expandedSection, setExpandedSection] = useState<string | null>('about')
  
  const isMacOS = theme === 'macos'

  const sections = [
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'architecture', title: 'Architecture' },
    { id: 'contact', title: 'Contact' },
  ]

  const renderContent = (sectionId: string) => {
    switch (sectionId) {
      case 'about':
        return (
          <div className="space-y-4">
            <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
              {siteContent.about.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {siteContent.about.focus.map((area, i) => (
                <span 
                  key={i}
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)',
                    color: isMacOS ? '#007aff' : '#58a6ff',
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )
      
      case 'skills':
        return (
          <div className="space-y-4">
            {Object.values(siteContent.skills).map((category, i) => (
              <div key={i}>
                <h4 className="text-white/90 text-sm font-medium mb-2">{category.title}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((skill, j) => (
                    <span key={j} className="px-2 py-1 rounded text-xs bg-white/5 text-white/60">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'experience':
        return (
          <div className="space-y-4">
            {siteContent.experience.map((job, i) => (
              <div key={i} className="border-l-2 border-white/10 pl-3">
                <div className="text-white text-sm font-medium">{job.role}</div>
                <div className="text-white/50 text-xs">{job.company} • {job.period}</div>
                <ul className="mt-2 space-y-1">
                  {job.highlights.slice(0, 2).map((h, j) => (
                    <li key={j} className="text-white/60 text-xs flex items-start gap-1.5">
                      <span className="text-green-400">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      
      case 'projects':
        return (
          <div className="space-y-3">
            {siteContent.projects.map((project) => (
              <div 
                key={project.id}
                className="p-3 rounded-lg bg-white/5"
              >
                <span 
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)',
                    color: isMacOS ? '#007aff' : '#58a6ff',
                  }}
                >
                  {project.category}
                </span>
                <h4 className="text-white text-sm font-medium mt-1.5">{project.title}</h4>
                <p className="text-white/50 text-xs mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        )
      
      case 'architecture':
        return (
          <div className="space-y-3">
            <p className="text-white/70 text-sm">{siteContent.architecture.summary}</p>
            {siteContent.architecture.topics.slice(0, 3).map((topic) => (
              <div key={topic.id} className="p-2 rounded bg-white/5">
                <div className="text-white text-sm font-medium">{topic.title}</div>
                <div className="text-white/50 text-xs mt-1">{topic.overview}</div>
                {topic.principles && topic.principles.length > 0 && (
                  <div className="text-white/40 text-xs mt-2">
                    {topic.principles[0]}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      
      case 'contact':
        return (
          <div className="space-y-3">
            <a 
              href={`mailto:${siteContent.contact.email}`}
              className="flex items-center gap-2 text-white/80 text-sm hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {siteContent.contact.email}
            </a>
            <a 
              href={siteContent.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 text-sm hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a 
              href={siteContent.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 text-sm hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a 
              href={siteContent.contact.resume}
              className="flex items-center gap-2 text-white/80 text-sm hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              Resume
            </a>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div 
      className="min-h-screen p-4 pb-20"
      style={{
        background: isMacOS 
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
          : 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
      }}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-white">{siteContent.meta.name}</h1>
        <p className="text-white/60 text-sm mt-1">{siteContent.meta.title}</p>
        <p className="text-white/40 text-xs mt-2 italic">{siteContent.meta.welcomeMessage}</p>
      </div>

      {/* Terminal Preview */}
      <div 
        className="mb-4 p-3 rounded-lg font-mono text-xs"
        style={{
          backgroundColor: isMacOS ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.5)',
        }}
      >
        <div className="text-green-400">{siteContent.terminal.prompt}</div>
        <div className="text-white/70 mt-1">
          Building autonomous systems that think, act, and learn.
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-2">
        {sections.map((section) => (
          <div 
            key={section.id}
            className="rounded-lg overflow-hidden"
            style={{
              backgroundColor: isMacOS ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isMacOS ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
            }}
          >
            <button
              className="w-full px-4 py-3 flex items-center justify-between text-left"
              onClick={() => setExpandedSection(
                expandedSection === section.id ? null : section.id
              )}
            >
              <span className="text-white font-medium text-sm">{section.title}</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/40"
                animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </motion.svg>
            </button>
            
            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 pb-4">
                    {renderContent(section.id)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{
          backgroundColor: isMacOS ? 'rgba(0, 122, 255, 0.9)' : 'rgba(88, 166, 255, 0.9)',
        }}
      >
        {isMacOS ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        )}
      </button>
    </div>
  )
}

