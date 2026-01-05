'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { siteContent } from '@/content/site'
import { useWindows } from '@/context/WindowContext'

interface TerminalLine {
  type: 'input' | 'output'
  content: string
  isTyping?: boolean
}

export default function Terminal() {
  const { openWindow } = useWindows()
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingText, setCurrentTypingText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasInitialized = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const prompt = siteContent.terminal.prompt

  // Typewriter effect
  const typeText = useCallback((text: string, onComplete?: () => void) => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    setIsTyping(true)
    setCurrentTypingText('')

    let index = 0
    intervalRef.current = setInterval(() => {
      if (index < text.length) {
        setCurrentTypingText(text.slice(0, index + 1))
        index++
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setIsTyping(false)
        setLines(prev => [...prev, { type: 'output', content: text }])
        setCurrentTypingText('')
        onComplete?.()
      }
    }, 5) // Faster typing

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  // Initial welcome message
  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true
    
    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      typeText(siteContent.terminal.welcome)
    }, 100)
    
    return () => {
      clearTimeout(timer)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [typeText])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines, currentTypingText])

  // Focus input on click
  const handleContainerClick = () => {
    if (!isTyping) {
      inputRef.current?.focus()
    }
  }

  const formatSkills = () => {
    const { skills } = siteContent
    let output = '\nSkill Clusters:\n─────────────────\n'
    
    Object.values(skills).forEach(category => {
      output += `\n▸ ${category.title}\n`
      category.items.forEach(item => {
        output += `  • ${item}\n`
      })
    })
    
    return output
  }

  const formatProjects = () => {
    const { projects } = siteContent
    let output = '\nProjects:\n─────────────────\n'
    
    projects.forEach(project => {
      output += `\n▸ ${project.title} [${project.category}]\n`
      output += `  ${project.description}\n`
    })
    
    output += '\nUse "project <name>" for details (e.g., "project agentic-rag")'
    return output
  }

  const formatProjectDetail = (projectId: string) => {
    const project = siteContent.projects.find(p => p.id === projectId) as any
    if (!project) return `Project "${projectId}" not found. Use "projects" to see available projects.`
    
    let output = `\n${project.title}\n${'═'.repeat(project.title.length)}\n`
    output += `Category: ${project.category}\n\n`
    output += `Problem:\n${project.problem}\n\n`
    output += `Approach:\n${project.approach}\n\n`
    
    // Handle both 'contributions' and 'learnings'
    const items = project.contributions || project.learnings || []
    const itemsLabel = project.contributions ? 'Key Contributions' : 'Key Learnings'
    output += `${itemsLabel}:\n`
    items.forEach((l: string) => {
      output += `  • ${l}\n`
    })
    
    if (project.metrics && project.metrics.length > 0) {
      output += `\nMetrics:\n`
      project.metrics.forEach((m: string) => {
        output += `  ✓ ${m}\n`
      })
    }
    
    if (project.tech && project.tech.length > 0) {
      output += `\nTech: ${project.tech.join(', ')}`
    }
    
    if (project.whyItMatters) {
      output += `\n\n💡 ${project.whyItMatters}`
    }
    
    return output
  }

  const formatExperience = () => {
    const { experience } = siteContent
    let output = '\nWork Experience:\n─────────────────\n'
    
    experience.forEach(job => {
      output += `\n▸ ${job.role} @ ${job.company}\n`
      output += `  ${job.period}\n`
      job.highlights.forEach(h => {
        output += `  • ${h}\n`
      })
    })
    
    return output
  }

  const formatContact = () => {
    const { contact } = siteContent
    return `
Contact Information:
─────────────────
  Email:    ${contact.email}
  GitHub:   ${contact.github}
  LinkedIn: ${contact.linkedin}
  Resume:   ${contact.resume}

${contact.message}
`
  }

  const formatArchitecture = () => {
    const { architecture } = siteContent
    let output = `\n${architecture.summary}\n\nTopics:\n─────────────────\n`
    
    architecture.topics.forEach(topic => {
      output += `\n▸ ${topic.title}\n`
      output += `  ${topic.overview}\n`
      if (topic.principles && topic.principles.length > 0) {
        output += `  Key principles:\n`
        topic.principles.slice(0, 2).forEach(p => {
          output += `    • ${p}\n`
        })
      }
    })
    
    return output
  }

  const processCommand = (input: string) => {
    const trimmed = input.trim().toLowerCase()
    const parts = trimmed.split(' ')
    const command = parts[0]
    const args = parts.slice(1).join(' ')

    let output = ''

    switch (command) {
      case 'help':
        output = siteContent.terminal.help
        break
      case 'about':
        output = `\n${siteContent.about.summary}`
        break
      case 'skills':
        output = formatSkills()
        break
      case 'projects':
        output = formatProjects()
        break
      case 'project':
        if (args) {
          output = formatProjectDetail(args)
        } else {
          output = 'Usage: project <project-id>\nExample: project agentic-rag'
        }
        break
      case 'experience':
        output = formatExperience()
        break
      case 'architecture':
        output = formatArchitecture()
        // Also open the architecture window
        openWindow('architecture')
        break
      case 'contact':
        output = formatContact()
        break
      case 'resume':
        output = `\nResume: ${siteContent.contact.resume}\nOpening in new tab...`
        window.open(siteContent.contact.resume, '_blank')
        break
      case 'clear':
        setLines([])
        return
      case '':
        return
      default:
        output = siteContent.terminal.unknownCommand(input)
    }

    typeText(output)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping) {
      const input = currentInput
      setLines(prev => [...prev, { type: 'input', content: `${prompt} ${input}` }])
      setCurrentInput('')
      processCommand(input)
    }
  }

  return (
    <div 
      className="h-full bg-[#0d1117] font-mono text-sm cursor-text"
      onClick={handleContainerClick}
    >
      <div 
        ref={scrollRef}
        className="h-full overflow-y-auto p-4 terminal-scroll"
      >
        {/* Previous lines */}
        {lines.map((line, index) => (
          <div 
            key={index} 
            className={`whitespace-pre-wrap ${
              line.type === 'input' ? 'text-[#58a6ff]' : 'text-[#e6edf3]'
            }`}
          >
            {line.content}
          </div>
        ))}

        {/* Currently typing output */}
        {isTyping && (
          <div className="text-[#e6edf3] whitespace-pre-wrap">
            {currentTypingText}
            <span className="cursor-blink">█</span>
          </div>
        )}

        {/* Input line */}
        {!isTyping && (
          <div className="flex items-center text-[#58a6ff]">
            <span>{prompt}&nbsp;</span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none text-[#e6edf3] caret-transparent"
                autoFocus
                spellCheck={false}
              />
              {/* Custom cursor */}
              <span 
                className="absolute top-0 text-[#e6edf3]"
                style={{ left: `${currentInput.length}ch` }}
              >
                <span className="cursor-blink">█</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

