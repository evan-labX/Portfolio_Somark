'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CodingReviewDiagram from './CodingReviewDiagram'
import { useTheme } from '@/context/ThemeContext'
import type { CodingReviewExample } from '@/content/codingReviews'

interface CodingReviewDetailProps {
  item: CodingReviewExample
  onBack: () => void
  sectionTitle: string
}

function ScoreBadge({ score }: { score: string }) {
  const num = parseFloat(score.split('/')[0])
  const color = num >= 8 ? '#10b981' : num >= 6 ? '#f59e0b' : '#ef4444'
  return <span className="text-sm font-mono font-semibold" style={{ color }}>{score}</span>
}

function CodeBlock({ code, label, variant }: { code: string; label: string; variant: 'submitted' | 'improved' }) {
  const border = variant === 'submitted' ? 'rgba(239,68,68,0.35)' : 'rgba(16,185,129,0.35)'
  const headerBg = variant === 'submitted' ? 'rgba(239,68,68,0.12)' : 'rgba(16,185,129,0.12)'
  const headerColor = variant === 'submitted' ? '#fca5a5' : '#6ee7b7'

  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: border }}>
      <div className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: headerBg, color: headerColor }}>
        {label}
      </div>
      <pre className="p-3 text-xs leading-relaxed whitespace-pre-wrap font-mono text-white/75 overflow-x-auto max-h-80 overflow-y-auto terminal-scroll">
        {code}
      </pre>
    </div>
  )
}

export default function CodingReviewDetail({ item, onBack, sectionTitle }: CodingReviewDetailProps) {
  const { theme } = useTheme()
  const [view, setView] = useState<'split' | 'compare'>('split')
  const isMacOS = theme === 'macos'
  const accentBg = isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)'
  const accentColor = isMacOS ? '#007aff' : '#58a6ff'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="text-sm text-white/60 hover:text-white flex items-center gap-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to {sectionTitle}
        </button>
        <div className="flex rounded-lg overflow-hidden border border-white/10 text-xs">
          {(['split', 'compare'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-3 py-1.5 transition-colors ${view === mode ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
              style={{ backgroundColor: view === mode ? accentBg : 'transparent' }}
            >
              {mode === 'split' ? 'Review Layout' : 'Code Compare'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: accentBg, color: accentColor }}>
          {item.category}
        </span>
        <h2 className="text-xl font-semibold text-white mt-2">{item.title}</h2>
        <p className="text-white/50 text-sm mt-1">{item.reviewType}</p>
      </div>

      <CodingReviewDiagram diagramType={item.diagramType} isMacOS={isMacOS} />

      <div
        className="rounded-lg px-4 py-3 text-sm text-white/70 italic border border-white/8"
        style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
      >
        &ldquo;{item.prompt}&rdquo;
      </div>

      {item.projectContext && (
        <p className="text-xs text-white/45">
          <span className="text-white/30 uppercase tracking-wider mr-2">Context</span>
          {item.projectContext}
        </p>
      )}

      {view === 'compare' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <CodeBlock code={item.submittedCode} label="Submitted Code" variant="submitted" />
          <CodeBlock code={item.improvedVersion} label="Improved Version" variant="improved" />
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Left: submitted code + issues */}
          <div className="space-y-4">
            <CodeBlock code={item.submittedCode} label="Submitted Code" variant="submitted" />

            <div>
              <h3 className="text-sm font-medium text-green-400/80 uppercase tracking-wider mb-2">Strengths</h3>
              <ul className="space-y-1.5">
                {item.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 uppercase tracking-wider mb-2">Issues Found</h3>
              <ul className="space-y-1.5">
                {item.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: scorecard + improved + feedback */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">Evaluation Scorecard</h3>
              <div className="rounded-lg overflow-hidden border border-white/10">
                <table className="w-full text-sm">
                  <tbody>
                    {item.rubric.map((row, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="px-3 py-2 text-white/75">{row.category}</td>
                        <td className="px-3 py-2 text-right"><ScoreBadge score={row.score} /></td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                      <td className="px-3 py-2 text-white font-medium">Overall</td>
                      <td className="px-3 py-2 text-right"><ScoreBadge score={item.overallScore} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <CodeBlock code={item.improvedVersion} label="Improved Version" variant="improved" />

            <div className="rounded-lg p-4" style={{ backgroundColor: accentBg }}>
              <h3 className="text-sm font-medium text-white/70 mb-2">Final Review</h3>
              <p className="text-white/85 text-sm leading-relaxed">{item.finalReview}</p>
            </div>
          </div>
        </div>
      )}

      {view === 'compare' && (
        <div className="rounded-lg p-4" style={{ backgroundColor: accentBg }}>
          <h3 className="text-sm font-medium text-white/70 mb-2">Final Review</h3>
          <p className="text-white/85 text-sm leading-relaxed">{item.finalReview}</p>
        </div>
      )}
    </div>
  )
}
