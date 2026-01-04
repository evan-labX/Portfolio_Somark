'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '@/content/site'
import { useTheme } from '@/context/ThemeContext'

type TabId = 'about' | 'skills' | 'experience' | 'projects'

export default function ProjectsApp() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<TabId>('about')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const isMacOS = theme === 'macos'
  const tabs: { id: TabId; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
  ]

  const renderAbout = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">{siteContent.meta.name}</h2>
        <p className="text-lg text-white/60">{siteContent.meta.title}</p>
      </div>
      
      <p className="text-white/80 leading-relaxed whitespace-pre-line">
        {siteContent.about.summary}
      </p>
      
      <div>
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">Focus Areas</h3>
        <div className="flex flex-wrap gap-2">
          {siteContent.about.focus.map((area, i) => (
            <span 
              key={i}
              className="px-3 py-1 rounded-full text-sm"
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
    </div>
  )

  const renderSkills = () => (
    <div className="grid grid-cols-2 gap-6">
      {Object.values(siteContent.skills).map((category, i) => (
        <div key={i} className="space-y-3">
          <h3 className="text-sm font-medium text-white/90">{category.title}</h3>
          <ul className="space-y-1.5">
            {category.items.map((skill, j) => (
              <li key={j} className="text-sm text-white/60 flex items-start gap-2">
                <span className="text-white/30 mt-1">•</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )

  const renderExperience = () => (
    <div className="space-y-6">
      {siteContent.experience.map((job, i) => (
        <div key={i} className="relative pl-6 border-l-2 border-white/10">
          <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-white/30" />
          
          <div className="space-y-2">
            <div>
              <h3 className="text-white font-medium">{job.role}</h3>
              <p className="text-white/60 text-sm">{job.company} • {job.period}</p>
            </div>
            
            <ul className="space-y-1">
              {job.highlights.map((highlight, j) => (
                <li key={j} className="text-sm text-white/70 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-4">
      {selectedProject ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {(() => {
            const project = siteContent.projects.find(p => p.id === selectedProject)!
            return (
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-sm text-white/60 hover:text-white flex items-center gap-1"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Back to projects
                </button>
                
                <div>
                  <span 
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)',
                      color: isMacOS ? '#007aff' : '#58a6ff',
                    }}
                  >
                    {project.category}
                  </span>
                  <h2 className="text-xl font-semibold text-white mt-2">{project.title}</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Problem</h3>
                    <p className="text-white/70">{project.problem}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Approach</h3>
                    <p className="text-white/70">{project.approach}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">
                      {(project as any).contributions ? 'Key Contributions' : 'Key Learnings'}
                    </h3>
                    <ul className="space-y-1">
                      {((project as any).contributions || (project as any).learnings || []).map((item: string, i: number) => (
                        <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {(project as any).differentiators && (
                    <div>
                      <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">What Makes It Different</h3>
                      <ul className="space-y-1">
                        {(project as any).differentiators.map((item: string, i: number) => (
                          <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Metrics</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.metrics.map((metric, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 rounded text-sm bg-green-500/10 text-green-400"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 rounded text-sm bg-white/5 text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {(project as any).whyItMatters && (
                    <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: isMacOS ? 'rgba(0, 122, 255, 0.1)' : 'rgba(88, 166, 255, 0.1)' }}>
                      <h3 className="text-sm font-medium text-white/60 mb-2">Why It Matters</h3>
                      <p className="text-white/80 italic">{(project as any).whyItMatters}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {siteContent.projects.map((project) => (
            <motion.button
              key={project.id}
              className="p-4 rounded-lg text-left transition-colors"
              style={{
                backgroundColor: isMacOS ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
              }}
              whileHover={{
                backgroundColor: isMacOS ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)',
              }}
              onClick={() => setSelectedProject(project.id)}
            >
              <span 
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)',
                  color: isMacOS ? '#007aff' : '#58a6ff',
                }}
              >
                {project.category}
              </span>
              <h3 className="text-white font-medium mt-2">{project.title}</h3>
              <p className="text-white/50 text-sm mt-1 line-clamp-2">{project.description}</p>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div 
      className="h-full flex"
      style={{
        backgroundColor: isMacOS ? 'var(--macos-window)' : 'var(--windows-window)',
      }}
    >
      {/* Sidebar */}
      <div 
        className="w-48 border-r flex flex-col py-2"
        style={{
          backgroundColor: isMacOS ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.3)',
          borderColor: isMacOS ? 'var(--macos-border)' : 'var(--windows-border)',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-left text-sm transition-colors ${
              activeTab === tab.id 
                ? 'text-white' 
                : 'text-white/50 hover:text-white/70'
            }`}
            style={{
              backgroundColor: activeTab === tab.id 
                ? (isMacOS ? 'rgba(0, 122, 255, 0.3)' : 'rgba(88, 166, 255, 0.2)')
                : 'transparent',
            }}
            onClick={() => {
              setActiveTab(tab.id)
              setSelectedProject(null)
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto terminal-scroll">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'about' && renderAbout()}
            {activeTab === 'skills' && renderSkills()}
            {activeTab === 'experience' && renderExperience()}
            {activeTab === 'projects' && renderProjects()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

