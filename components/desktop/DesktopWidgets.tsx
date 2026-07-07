'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useWindows } from '@/context/WindowContext'
import { siteContent } from '@/content/site'

function glassStyle(isMacOS: boolean) {
  return {
    backgroundColor: isMacOS ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
    borderColor: isMacOS ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(16px)',
  }
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function ClockWidget({ isMacOS }: { isMacOS: boolean }) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      )
      setDate(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="rounded-2xl border p-4 w-52 shadow-lg"
      style={glassStyle(isMacOS)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{getGreeting()}</p>
      <p className="text-3xl font-light text-white tabular-nums">{time}</p>
      <p className="text-xs text-white/50 mt-1">{date}</p>
      <p className="text-[11px] text-white/35 mt-3 flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {siteContent.meta.location}
      </p>
    </motion.div>
  )
}

function StickyNote({ isMacOS }: { isMacOS: boolean }) {
  return (
    <motion.div
      className="rounded-lg p-3 w-52 shadow-md rotate-[-1.5deg] border border-amber-200/20"
      style={{
        background: 'linear-gradient(145deg, rgba(251,191,36,0.18) 0%, rgba(245,158,11,0.12) 100%)',
        backdropFilter: 'blur(8px)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
    >
      <p className="text-[10px] uppercase tracking-wider text-amber-200/60 mb-1.5 font-medium">Sticky note</p>
      <p className="text-sm text-amber-50/90 leading-snug font-medium">
        Open to collab on AI eval, LLM systems &amp; ML work.
      </p>
      <p className="text-xs text-amber-100/50 mt-2">☕ Coffee always brewing</p>
      <p className="text-[10px] text-amber-100/35 mt-2 italic">— Somark</p>
    </motion.div>
  )
}

function QuickStatsWidget({ isMacOS }: { isMacOS: boolean }) {
  const { openWindow } = useWindows()
  const stats = [
    { label: 'AI Evaluations', count: siteContent.badges.aiEvaluations, window: 'ai-evaluations' },
    { label: 'Code Reviews', count: siteContent.badges.codingReviews, window: 'coding-reviews' },
    { label: 'LLM Projects', count: siteContent.badges.llmProjects, window: 'llm-projects' },
    { label: 'ML Projects', count: siteContent.badges.mlProjects, window: 'ml-projects' },
    { label: 'Scientific', count: siteContent.badges.scientificExamples, window: 'scientific-examples' },
  ]

  return (
    <motion.div
      className="rounded-2xl border p-3 w-52 shadow-lg"
      style={glassStyle(isMacOS)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Portfolio at a glance</p>
      <div className="space-y-1">
        {stats.map((s) => (
          <button
            key={s.window}
            onClick={() => openWindow(s.window)}
            className="w-full flex items-center justify-between text-left px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <span className="text-xs text-white/60 group-hover:text-white/80">{s.label}</span>
            <span
              className="text-xs font-mono px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: isMacOS ? 'rgba(0,122,255,0.15)' : 'rgba(88,166,255,0.15)',
                color: isMacOS ? '#60a5fa' : '#58a6ff',
              }}
            >
              {s.count}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

function DeskGadgets() {
  return (
    <div className="absolute bottom-20 right-8 flex items-end gap-4 pointer-events-none select-none">
      {/* Coffee mug */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative"
      >
        <svg width="48" height="56" viewBox="0 0 48 56" className="drop-shadow-lg">
          <ellipse cx="24" cy="52" rx="18" ry="3" fill="rgba(0,0,0,0.3)" />
          <path d="M10 20h24v26a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V20z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <path d="M34 24h4a6 6 0 0 1 0 12h-4" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <rect x="12" y="24" width="20" height="14" rx="2" fill="rgba(120,53,15,0.5)" />
          {[0, 1, 2].map((i) => (
            <motion.ellipse
              key={i}
              cx={18 + i * 4}
              cy={14 - i * 3}
              rx="2"
              ry="3"
              fill="rgba(255,255,255,0.15)"
              animate={{ cy: [14 - i * 3, 8 - i * 3, 14 - i * 3], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Small plant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
      >
        <svg width="40" height="52" viewBox="0 0 40 52" className="drop-shadow-lg">
          <path d="M8 44h24v6a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-6z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" />
          <rect x="10" y="36" width="20" height="8" rx="1" fill="rgba(120,53,15,0.35)" />
          <motion.path
            d="M20 36 Q12 28 14 18 Q16 8 20 4 Q24 8 26 18 Q28 28 20 36"
            fill="rgba(74,222,128,0.25)"
            stroke="rgba(74,222,128,0.4)"
            strokeWidth="1"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '20px 36px' }}
          />
          <path d="M20 30 Q8 24 10 16" fill="none" stroke="rgba(74,222,128,0.35)" strokeWidth="1.5" />
          <path d="M20 28 Q30 22 28 14" fill="none" stroke="rgba(74,222,128,0.35)" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Headphones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <svg width="44" height="40" viewBox="0 0 44 40" className="drop-shadow-lg opacity-80">
          <path d="M8 28 V20 a14 14 0 0 1 28 0 v8" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="4" y="24" width="8" height="12" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
          <rect x="32" y="24" width="8" height="12" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
        </svg>
      </motion.div>
    </div>
  )
}

function WelcomeChip({ isMacOS }: { isMacOS: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 rounded-full border px-5 py-2 shadow-lg pointer-events-none"
      style={{
        top: isMacOS ? '44px' : '16px',
        ...glassStyle(isMacOS),
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <p className="text-xs text-white/70">
        <span className="text-white/90 font-medium">{siteContent.meta.welcomeMessage}</span>
        <span className="text-white/30 mx-2">·</span>
        <span className="text-white/45">Double-click icons to open</span>
      </p>
    </motion.div>
  )
}

export default function DesktopWidgets() {
  const { theme } = useTheme()
  const isMacOS = theme === 'macos'

  return (
    <>
      <WelcomeChip isMacOS={isMacOS} />

      <div
        className="absolute right-6 flex flex-col gap-3 z-[5] pointer-events-auto"
        style={{ top: isMacOS ? '52px' : '24px' }}
      >
        <ClockWidget isMacOS={isMacOS} />
        <StickyNote isMacOS={isMacOS} />
        <QuickStatsWidget isMacOS={isMacOS} />
      </div>

      <DeskGadgets />
    </>
  )
}
