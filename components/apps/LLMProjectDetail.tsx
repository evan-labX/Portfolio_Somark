'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LLMProjectDiagram from './LLMProjectDiagram'
import { useTheme } from '@/context/ThemeContext'
import type { LLMProjectExample } from '@/content/llmProjects'

interface LLMProjectDetailProps {
  item: LLMProjectExample
  onBack: () => void
  sectionTitle: string
}

type TabId = 'overview' | 'artifact' | 'impact'

function ScoreBadge({ score }: { score: string }) {
  const num = parseFloat(score.split('/')[0])
  const color = num >= 8 ? '#10b981' : num >= 6 ? '#f59e0b' : '#ef4444'
  return <span className="text-lg font-mono font-bold" style={{ color }}>{score}</span>
}

function CodePanel({ label, code, tone }: { label: string; code: string; tone: 'neutral' | 'fail' | 'pass' }) {
  const styles = {
    neutral: { border: 'rgba(255,255,255,0.1)', header: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.5)' },
    fail: { border: 'rgba(239,68,68,0.35)', header: 'rgba(239,68,68,0.12)', text: '#fca5a5' },
    pass: { border: 'rgba(16,185,129,0.35)', header: 'rgba(16,185,129,0.12)', text: '#6ee7b7' },
  }[tone]

  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: styles.border }}>
      <div className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: styles.header, color: styles.text }}>
        {label}
      </div>
      <pre className="p-3 text-xs leading-relaxed whitespace-pre-wrap font-mono text-white/75 overflow-x-auto max-h-64 overflow-y-auto terminal-scroll">
        {code}
      </pre>
    </div>
  )
}

export default function LLMProjectDetail({ item, onBack, sectionTitle }: LLMProjectDetailProps) {
  const { theme } = useTheme()
  const [tab, setTab] = useState<TabId>('overview')
  const isMacOS = theme === 'macos'
  const accentBg = isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)'
  const accentColor = isMacOS ? '#007aff' : '#58a6ff'
  const artifact = item.evaluationArtifact

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'System Overview' },
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
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40">Overall eval score</span>
          <ScoreBadge score={artifact.overallScore} />
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
        <div className="relative p-5 grid lg:grid-cols-2 gap-4 items-center">
          <div>
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: accentBg, color: accentColor }}>
              {item.category}
            </span>
            <h2 className="text-xl font-semibold text-white mt-2">{item.title}</h2>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">{item.summary}</p>
          </div>
          <LLMProjectDiagram diagramType={item.diagramType} isMacOS={isMacOS} />
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
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Problem</h3>
                  <ul className="space-y-1.5">
                    {item.problemPoints.map((p, i) => (
                      <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-orange-400 mt-0.5">!</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                {artifact.keyPrinciple && (
                  <div className="rounded-lg p-4 border border-yellow-500/30 bg-yellow-500/10">
                    <p className="text-xs uppercase tracking-wider text-yellow-400/80 mb-1">Key Principle</p>
                    <p className="text-sm text-yellow-100/90 italic">{artifact.keyPrinciple}</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Technical Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-full text-xs bg-white/5 text-white/65 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Evaluation Focus</h3>
                  <ul className="space-y-1">
                    {item.evaluationFocus.map((f, i) => (
                      <li key={i} className="text-sm text-white/65 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">→</span>
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
              <h3 className="text-base font-medium text-white">{artifact.title}</h3>

              {artifact.prompt && (
                <p className="text-sm text-white/70 italic border-l-2 border-white/20 pl-3">&ldquo;{artifact.prompt}&rdquo;</p>
              )}
              {artifact.userQuery && (
                <p className="text-sm text-white/70 italic border-l-2 border-white/20 pl-3">&ldquo;{artifact.userQuery}&rdquo;</p>
              )}
              {artifact.codingTask && (
                <p className="text-sm text-white/70 border-l-2 border-white/20 pl-3">{artifact.codingTask}</p>
              )}
              {artifact.input && (
                <CodePanel label="Input" code={artifact.input} tone="neutral" />
              )}
              {artifact.retrievedContext && (
                <p className="text-sm text-white/60">{artifact.retrievedContext}</p>
              )}

              <div className="grid lg:grid-cols-2 gap-4">
                {artifact.expectedOutput && (
                  <CodePanel label="Expected Output" code={artifact.expectedOutput} tone="pass" />
                )}
                {artifact.modelFailure && (
                  <CodePanel label="Model Failure Example" code={artifact.modelFailure} tone="fail" />
                )}
                {artifact.modelOutputProblem && (
                  <div className="rounded-lg p-4 border border-red-500/30 bg-red-500/10 lg:col-span-2">
                    <p className="text-xs uppercase text-red-400 mb-1">Model Output Problem</p>
                    <p className="text-sm text-white/80">{artifact.modelOutputProblem}</p>
                  </div>
                )}
                {artifact.requiredOutput && (
                  <div className="rounded-lg p-4 border border-white/10 bg-white/5 lg:col-span-2">
                    <p className="text-xs uppercase text-white/40 mb-1">Required Output</p>
                    <p className="text-sm text-white/75">{artifact.requiredOutput}</p>
                  </div>
                )}
              </div>

              {artifact.modelAnswerIssues && (
                <ul className="space-y-1">
                  {artifact.modelAnswerIssues.map((issue, i) => (
                    <li key={i} className="text-sm text-white/70 flex gap-2">
                      <span className="text-red-400">✗</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              )}

              {artifact.candidateMatches && (
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="text-left px-3 py-2 text-white/50">Candidate</th>
                        <th className="text-left px-3 py-2 text-white/50">Source</th>
                        <th className="text-right px-3 py-2 text-white/50">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {artifact.candidateMatches.map((row, i) => (
                        <tr key={i} className="border-t border-white/5">
                          <td className="px-3 py-2 text-white/80">{row.candidate}</td>
                          <td className="px-3 py-2 text-white/60">{row.source}</td>
                          <td className="px-3 py-2 text-right font-mono text-white/70">{row.confidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {artifact.llmRole && (
                    <p className="px-3 py-2 text-xs text-white/50 border-t border-white/5">{artifact.llmRole}</p>
                  )}
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                  <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Evaluation Score</h4>
                  <div className="rounded-lg border border-white/10 overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {artifact.rubric.map((row, i) => (
                          <tr key={i} className="border-b border-white/5">
                            <td className="px-3 py-2 text-white/75">{row.category}</td>
                            <td className="px-3 py-2 text-right font-mono text-white/70">{row.score}</td>
                          </tr>
                        ))}
                        <tr className="bg-white/5">
                          <td className="px-3 py-2 font-medium text-white">Overall</td>
                          <td className="px-3 py-2 text-right"><ScoreBadge score={artifact.overallScore} /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-3">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-white/40 mb-2">Issues Found</h4>
                    <ul className="space-y-1">
                      {artifact.issues.map((issue, i) => (
                        <li key={i} className="text-sm text-white/70 flex gap-2">
                          <span className="text-red-400 shrink-0">✗</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {artifact.issuesToWatch && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-yellow-400/70 mb-2">Issues to Watch</h4>
                      <ul className="space-y-1">
                        {artifact.issuesToWatch.map((issue, i) => (
                          <li key={i} className="text-sm text-white/65 flex gap-2">
                            <span className="text-yellow-400 shrink-0">⚠</span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg p-4" style={{ backgroundColor: accentBg }}>
                <h4 className="text-sm font-medium text-white/70 mb-2">Final Assessment</h4>
                <p className="text-sm text-white/85 leading-relaxed">{artifact.finalAssessment}</p>
              </div>
            </div>
          )}

          {tab === 'impact' && (
            <div className="space-y-5">
              {(item.evaluationQuestions ?? item.evaluationFocus).map((q, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0" style={{ backgroundColor: accentBg, color: accentColor }}>
                    {i + 1}
                  </div>
                  <p className="text-sm text-white/75">{q}</p>
                </div>
              ))}
              <div>
                <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">
                  What This Shows for Mercor / micro1 / Alignerr
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {item.platformValue.map((v) => (
                    <div key={v} className="px-3 py-2 rounded-lg text-sm text-white/70 bg-white/5 border border-white/8 flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
