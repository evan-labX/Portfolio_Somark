'use client'

import EvaluationDiagram from './EvaluationDiagram'
import { useTheme } from '@/context/ThemeContext'

export interface EvaluationExample {
  id: string
  title: string
  category: string
  description: string
  diagramType: string
  task: string
  prompt: string
  modelResponse: string
  rubric: { category: string; score: string }[]
  overallScore: string
  strengths: string[]
  issues: string[]
  finalFeedback: string
  platformValue: string[]
  improvedVersion?: string
  betterAnswerDirection?: string[]
}

interface AIEvaluationDetailProps {
  item: EvaluationExample
  onBack: () => void
  sectionTitle: string
}

function ScoreBadge({ score, isMacOS }: { score: string; isMacOS: boolean }) {
  const num = parseFloat(score.split('/')[0])
  const color = num >= 8 ? '#10b981' : num >= 6 ? '#f59e0b' : '#ef4444'
  return (
    <span className="text-sm font-mono font-semibold" style={{ color }}>
      {score}
    </span>
  )
}

export default function AIEvaluationDetail({ item, onBack, sectionTitle }: AIEvaluationDetailProps) {
  const { theme } = useTheme()
  const isMacOS = theme === 'macos'
  const accentBg = isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)'
  const accentColor = isMacOS ? '#007aff' : '#58a6ff'

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="text-sm text-white/60 hover:text-white flex items-center gap-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to {sectionTitle}
      </button>

      <div>
        <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: accentBg, color: accentColor }}>
          {item.category}
        </span>
        <h2 className="text-xl font-semibold text-white mt-2">{item.title}</h2>
        <p className="text-white/60 text-sm mt-1">{item.description}</p>
      </div>

      <EvaluationDiagram diagramType={item.diagramType} isMacOS={isMacOS} />

      <div>
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Task</h3>
        <p className="text-white/80 text-sm">{item.task}</p>
      </div>

      <div
        className="rounded-lg p-4 space-y-2"
        style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider">Prompt</h3>
        <p className="text-white/80 text-sm italic">&ldquo;{item.prompt}&rdquo;</p>
      </div>

      <div
        className="rounded-lg p-4 space-y-2"
        style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider">Model Response</h3>
        {'improvedVersion' in item || item.modelResponse.includes('\n') || item.modelResponse.includes('import ') ? (
          <pre className="text-white/70 text-xs leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
            {item.modelResponse}
          </pre>
        ) : (
          <p className="text-white/70 text-sm leading-relaxed">{item.modelResponse}</p>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">Evaluation Rubric</h3>
        <div className="rounded-lg overflow-hidden border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <th className="text-left px-4 py-2 text-white/50 font-medium">Category</th>
                <th className="text-right px-4 py-2 text-white/50 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {item.rubric.map((row, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="px-4 py-2 text-white/75">{row.category}</td>
                  <td className="px-4 py-2 text-right"><ScoreBadge score={row.score} isMacOS={isMacOS} /></td>
                </tr>
              ))}
              <tr className="border-t border-white/10" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <td className="px-4 py-2 text-white font-medium">Overall</td>
                <td className="px-4 py-2 text-right"><ScoreBadge score={item.overallScore} isMacOS={isMacOS} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Strengths</h3>
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
          <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Issues Found</h3>
          <ul className="space-y-1.5">
            {item.issues.map((s, i) => (
              <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✗</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {item.improvedVersion && (
        <div
          className="rounded-lg p-4 space-y-2"
          style={{ backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)' }}
        >
          <h3 className="text-xs font-medium text-green-400/80 uppercase tracking-wider">Improved Version</h3>
          <pre className="text-green-200/80 text-xs leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
            {item.improvedVersion}
          </pre>
        </div>
      )}

      {item.betterAnswerDirection && (
        <div>
          <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Better Answer Direction</h3>
          <ul className="space-y-1">
            {item.betterAnswerDirection.map((s, i) => (
              <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: accentBg }}
      >
        <h3 className="text-sm font-medium text-white/70 mb-2">Final Feedback</h3>
        <p className="text-white/85 text-sm leading-relaxed">{item.finalFeedback}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">
          Platform Evaluation Skills Demonstrated
        </h3>
        <div className="flex flex-wrap gap-2">
          {item.platformValue.map((v, i) => (
            <span key={i} className="px-2.5 py-1 rounded-full text-xs bg-white/5 text-white/60 border border-white/10">
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
