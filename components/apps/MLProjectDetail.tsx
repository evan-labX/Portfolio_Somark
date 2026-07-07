'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MLProjectDiagram from './MLProjectDiagram'
import { useTheme } from '@/context/ThemeContext'
import type { MLProjectExample } from '@/content/mlProjects'

interface MLProjectDetailProps {
  item: MLProjectExample
  onBack: () => void
  sectionTitle: string
}

type TabId = 'overview' | 'artifact' | 'impact'

function ScoreBadge({ score }: { score: string }) {
  const isNumeric = score.includes('/')
  if (!isNumeric) {
    return <span className="text-sm font-mono font-semibold text-emerald-400">{score}</span>
  }
  const num = parseFloat(score.split('/')[0])
  const color = num >= 8 ? '#10b981' : num >= 6 ? '#f59e0b' : '#ef4444'
  return <span className="text-lg font-mono font-bold" style={{ color }}>{score}</span>
}

function DataTable({
  headers,
  rows,
}: {
  headers: [string, string]
  rows: { label: string; value: string }[]
}) {
  return (
    <div className="rounded-lg overflow-hidden border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-white/5">
            <th className="text-left px-3 py-2 text-white/50 font-medium">{headers[0]}</th>
            <th className="text-left px-3 py-2 text-white/50 font-medium">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-white/5">
              <td className="px-3 py-2 text-white/80 font-medium">{row.label}</td>
              <td className="px-3 py-2 text-white/65">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function MLProjectDetail({ item, onBack, sectionTitle }: MLProjectDetailProps) {
  const { theme } = useTheme()
  const [tab, setTab] = useState<TabId>('overview')
  const isMacOS = theme === 'macos'
  const accentBg = isMacOS ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.12)'
  const accentColor = '#10b981'
  const artifact = item.evaluationArtifact

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Project Overview' },
    { id: 'artifact', label: 'Evaluation Artifact' },
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
        {artifact.overallScore && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">Eval rating</span>
            <ScoreBadge score={artifact.overallScore} />
          </div>
        )}
      </div>

      <div className="relative rounded-xl overflow-hidden border border-emerald-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none" />
        <div className="relative p-5 grid lg:grid-cols-2 gap-4 items-center">
          <div>
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: accentBg, color: accentColor }}>
              {item.category}
            </span>
            <h2 className="text-xl font-semibold text-white mt-2">{item.title}</h2>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">{item.summary}</p>
          </div>
          <MLProjectDiagram diagramType={item.diagramType} isMacOS={isMacOS} />
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-lg bg-white/5 border border-white/10 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              tab === t.id ? 'text-white shadow-sm' : 'text-white/50 hover:text-white/70'
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
          {tab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-5">
              <div>
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">What Problem It Solves</h3>
                <ul className="space-y-1.5">
                  {item.problemPoints.map((p, i) => (
                    <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Technical Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-200/80 border border-emerald-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">ML Evaluation Focus</h3>
                  <ul className="space-y-1">
                    {item.evaluationFocus.map((f, i) => (
                      <li key={i} className="text-sm text-white/65 flex items-start gap-2">
                        <span className="text-teal-400 mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === 'artifact' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-medium text-white">{artifact.title}</h3>
                <p className="text-sm text-white/70 mt-2 italic border-l-2 border-emerald-500/40 pl-3">
                  {artifact.evaluationQuestion}
                </p>
              </div>

              {artifact.modelsCompared && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Models Compared</h4>
                  <DataTable headers={['Model', 'Purpose']} rows={artifact.modelsCompared} />
                </div>
              )}

              {artifact.evaluationCriteria && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Evaluation Criteria</h4>
                  <DataTable headers={['Category', 'What I Checked']} rows={artifact.evaluationCriteria} />
                </div>
              )}

              {artifact.keyRisks && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-red-400/70 mb-2">Key Risks Reviewed</h4>
                  <DataTable headers={['Risk', 'Evaluation Concern']} rows={artifact.keyRisks} />
                </div>
              )}

              {artifact.keyChecks && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Key Checks</h4>
                  <DataTable headers={['Check', 'Purpose']} rows={artifact.keyChecks} />
                </div>
              )}

              {artifact.reviewChecklist && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Review Checklist</h4>
                  <DataTable headers={['Area', 'Evaluation Question']} rows={artifact.reviewChecklist} />
                </div>
              )}

              {artifact.keyModelRisks && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-yellow-400/70 mb-2">Key Model Risks</h4>
                  <DataTable headers={['Risk', 'Why It Matters']} rows={artifact.keyModelRisks} />
                </div>
              )}

              {artifact.scientificCriteria && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Evaluation Criteria</h4>
                  <DataTable headers={['Category', 'What I Check']} rows={artifact.scientificCriteria} />
                </div>
              )}

              {artifact.rubric && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Evaluation Scorecard</h4>
                  <div className="rounded-lg border border-white/10 overflow-hidden max-w-md">
                    <table className="w-full text-sm">
                      <tbody>
                        {artifact.rubric.map((row, i) => (
                          <tr key={i} className="border-b border-white/5">
                            <td className="px-3 py-2 text-white/75">{row.category}</td>
                            <td className="px-3 py-2 text-right font-mono text-white/70">{row.score}</td>
                          </tr>
                        ))}
                        {artifact.overallScore?.includes('/') && (
                          <tr className="bg-white/5">
                            <td className="px-3 py-2 font-medium text-white">Overall</td>
                            <td className="px-3 py-2 text-right"><ScoreBadge score={artifact.overallScore} /></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="rounded-lg p-4" style={{ backgroundColor: accentBg }}>
                <h4 className="text-sm font-medium text-emerald-200/80 mb-2">Final Assessment</h4>
                <p className="text-sm text-white/85 leading-relaxed">{artifact.finalAssessment}</p>
              </div>
            </div>
          )}

          {tab === 'impact' && (
            <div className="space-y-4">
              <p className="text-sm text-white/60">
                This project supports AI evaluation work involving ML reasoning, data quality, and model skepticism.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {item.platformValue.map((v) => (
                  <div key={v} className="px-3 py-2.5 rounded-lg text-sm text-white/75 bg-emerald-500/5 border border-emerald-500/15 flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    {v}
                  </div>
                ))}
              </div>
              <div className="rounded-lg p-4 border border-white/10 bg-white/[0.02]">
                <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Mercor / micro1 / Alignerr Relevance</h4>
                <p className="text-sm text-white/70 leading-relaxed">{artifact.finalAssessment}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
