'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScientificExampleDiagram from './ScientificExampleDiagram'
import { useTheme } from '@/context/ThemeContext'
import type { ScientificExample } from '@/content/scientificExamples'

interface ScientificExampleDetailProps {
  item: ScientificExample
  onBack: () => void
  sectionTitle: string
}

type TabId = 'context' | 'evaluation' | 'impact'

function ScoreBadge({ score, critical }: { score: string; critical?: boolean }) {
  const num = parseFloat(score.split('/')[0])
  let color = num >= 8 ? '#10b981' : num >= 6 ? '#f59e0b' : '#ef4444'
  if (critical && num < 5) color = '#ef4444'
  return <span className="text-lg font-mono font-bold" style={{ color }}>{score}</span>
}

export default function ScientificExampleDetail({ item, onBack, sectionTitle }: ScientificExampleDetailProps) {
  const { theme } = useTheme()
  const [tab, setTab] = useState<TabId>('evaluation')
  const isMacOS = theme === 'macos'
  const accentBg = isMacOS ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.12)'
  const accentColor = '#0ea5e9'
  const isCritical = item.safetyCritical || parseFloat(item.overallScore) < 5

  const tabs: { id: TabId; label: string }[] = [
    { id: 'context', label: 'Background & Prompt' },
    { id: 'evaluation', label: 'Evaluation Review' },
    { id: 'impact', label: 'Platform Impact' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button onClick={onBack} className="text-sm text-white/60 hover:text-white flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to {sectionTitle}
        </button>
        <div className="flex items-center gap-3">
          {isCritical && (
            <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
              Safety Critical
            </span>
          )}
          <span className="text-xs text-white/40">Overall</span>
          <ScoreBadge score={item.overallScore} critical={isCritical} />
        </div>
      </div>

      <div className={`relative rounded-xl overflow-hidden border ${isCritical ? 'border-red-500/30' : 'border-sky-500/20'}`}>
        <div className={`absolute inset-0 pointer-events-none ${isCritical ? 'bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/5' : 'bg-gradient-to-br from-sky-500/10 via-transparent to-cyan-500/5'}`} />
        <div className="relative p-5 grid lg:grid-cols-2 gap-4 items-center">
          <div>
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: accentBg, color: accentColor }}>
              {item.category}
            </span>
            <h2 className="text-xl font-semibold text-white mt-2">{item.title}</h2>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">{item.description}</p>
          </div>
          <ScientificExampleDiagram diagramType={item.diagramType} isMacOS={isMacOS} />
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-lg bg-white/5 border border-white/10 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              tab === t.id ? 'text-white' : 'text-white/50 hover:text-white/70'
            }`}
            style={{ backgroundColor: tab === t.id ? accentBg : 'transparent' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'context' && (
            <div className="space-y-4">
              <div className="rounded-lg p-4 border border-sky-500/20 bg-sky-500/5">
                <h3 className="text-xs uppercase tracking-wider text-sky-400/80 mb-2">Real Background Anchor</h3>
                <p className="text-sm text-white/80 leading-relaxed">{item.backgroundAnchor}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Evaluation Task</h3>
                <p className="text-white/80 text-sm">{item.task}</p>
              </div>
              <div className="rounded-lg p-4 border border-white/10 bg-white/[0.03]">
                <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Prompt</h3>
                <p className="text-white/80 text-sm italic">&ldquo;{item.prompt}&rdquo;</p>
              </div>
              <div className={`rounded-lg p-4 border ${isCritical ? 'border-red-500/25 bg-red-500/5' : 'border-white/10 bg-white/[0.03]'}`}>
                <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Model Response</h3>
                <p className="text-white/75 text-sm leading-relaxed">{item.modelResponse}</p>
              </div>
            </div>
          )}

          {tab === 'evaluation' && (
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-green-400/80 uppercase tracking-wider mb-2">Strengths</h3>
                  <ul className="space-y-1.5">
                    {item.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-white/70 flex gap-2">
                        <span className="text-green-400 shrink-0">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={`text-sm font-medium uppercase tracking-wider mb-2 ${isCritical ? 'text-red-400/90' : 'text-red-400/80'}`}>
                    {isCritical ? 'Critical Issues Found' : 'Issues Found'}
                  </h3>
                  <ul className="space-y-1.5">
                    {item.issues.map((issue, i) => (
                      <li key={i} className="text-sm text-white/70 flex gap-2">
                        <span className="text-red-400 shrink-0">✗</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">Evaluation Scorecard</h3>
                  <div className="rounded-lg overflow-hidden border border-white/10">
                    <table className="w-full text-sm">
                      <tbody>
                        {item.rubric.map((row, i) => (
                          <tr key={i} className="border-b border-white/5">
                            <td className="px-3 py-2 text-white/75">{row.category}</td>
                            <td className="px-3 py-2 text-right font-mono"><ScoreBadge score={row.score} /></td>
                          </tr>
                        ))}
                        <tr className="bg-white/5">
                          <td className="px-3 py-2 font-medium text-white">Overall</td>
                          <td className="px-3 py-2 text-right"><ScoreBadge score={item.overallScore} critical={isCritical} /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="rounded-lg p-4 border border-emerald-500/25 bg-emerald-500/5">
                  <h3 className="text-xs uppercase tracking-wider text-emerald-400/80 mb-2">Better Answer Direction</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{item.betterAnswerDirection}</p>
                </div>
                <div className="rounded-lg p-4" style={{ backgroundColor: accentBg }}>
                  <h3 className="text-sm font-medium text-sky-200/80 mb-2">Final Evaluation</h3>
                  <p className="text-sm text-white/85 leading-relaxed">{item.finalEvaluation}</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'impact' && (
            <div className="space-y-4">
              <p className="text-sm text-white/60">
                This example demonstrates scientific and healthcare AI evaluation skills relevant to Mercor, micro1, and Alignerr.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {item.platformValue.map((v) => (
                  <div key={v} className="px-3 py-2.5 rounded-lg text-sm text-white/75 bg-sky-500/5 border border-sky-500/15 flex items-center gap-2">
                    <span className="text-sky-400">✓</span>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
