'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '@/content/site'
import { useTheme } from '@/context/ThemeContext'
import AIEvaluationDetail, { EvaluationExample } from './AIEvaluationDetail'
import EvaluationDiagram from './EvaluationDiagram'
import CodingReviewDetail from './CodingReviewDetail'
import CodingReviewDiagram from './CodingReviewDiagram'
import LLMProjectDetail from './LLMProjectDetail'
import LLMProjectDiagram from './LLMProjectDiagram'
import MLProjectDetail from './MLProjectDetail'
import MLProjectDiagram from './MLProjectDiagram'
import ScientificExampleDetail from './ScientificExampleDetail'
import ScientificExampleDiagram from './ScientificExampleDiagram'
import type { CodingReviewExample } from '@/content/codingReviews'
import type { LLMProjectExample } from '@/content/llmProjects'
import type { MLProjectExample } from '@/content/mlProjects'
import type { ScientificExample } from '@/content/scientificExamples'

type PortfolioSectionKey = keyof typeof siteContent.portfolioSections

interface PortfolioExamplesAppProps {
  sectionKey: PortfolioSectionKey
}

function getOverallScore(item: Record<string, unknown>): string | null {
  if (typeof item.overallScore === 'string') return item.overallScore
  const artifact = item.evaluationArtifact as { overallScore?: string } | undefined
  if (artifact?.overallScore) return artifact.overallScore
  return null
}

export default function PortfolioExamplesApp({ sectionKey }: PortfolioExamplesAppProps) {
  const { theme } = useTheme()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const isMacOS = theme === 'macos'
  const section = siteContent.portfolioSections[sectionKey]
  const selectedItem = section.items.find((item) => item.id === selectedId)
  const isAIEvaluations = sectionKey === 'aiEvaluations'
  const isCodingReviews = sectionKey === 'codingReviews'
  const isLLMProjects = sectionKey === 'llmProjects'
  const isMLProjects = sectionKey === 'mlProjects'
  const isScientificExamples = sectionKey === 'scientificExamples'
  const overview = 'overview' in section ? (section as { overview?: string }).overview : undefined
  const caption = 'caption' in section ? (section as { caption?: string }).caption : undefined

  return (
    <div
      className="h-full flex flex-col"
      style={{
        backgroundColor: isMacOS ? 'var(--macos-window)' : 'var(--windows-window)',
      }}
    >
      <div
        className="px-6 py-4 border-b"
        style={{ borderColor: isMacOS ? 'var(--macos-border)' : 'var(--windows-border)' }}
      >
        <h1 className="text-lg font-semibold text-white">{section.title}</h1>
        <p className="text-sm text-white/50 mt-1">
          {isAIEvaluations && overview
            ? 'Structured rubric-based evaluation across medical, coding, ML, LLM, and scientific domains'
            : isCodingReviews && overview
            ? 'Structured code review with scorecards, issue analysis, and improved versions'
            : isLLMProjects && overview
            ? 'Built & evaluated LLM systems — structured outputs, RAG, agents, entity resolution, vision'
            : isMLProjects && overview
            ? 'Model training, feature engineering, statistical testing, and practical ML skepticism'
            : isScientificExamples && overview
            ? 'Scientific and healthcare AI outputs reviewed for accuracy, safety, and missing caveats'
            : `${section.items.length} examples`}
        </p>
      </div>

      <div className="flex-1 p-6 overflow-y-auto terminal-scroll">
        <AnimatePresence mode="wait">
          {selectedItem && isScientificExamples ? (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ScientificExampleDetail
                item={selectedItem as ScientificExample}
                onBack={() => setSelectedId(null)}
                sectionTitle={section.title}
              />
            </motion.div>
          ) : selectedItem && isMLProjects ? (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MLProjectDetail
                item={selectedItem as MLProjectExample}
                onBack={() => setSelectedId(null)}
                sectionTitle={section.title}
              />
            </motion.div>
          ) : selectedItem && isLLMProjects ? (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <LLMProjectDetail
                item={selectedItem as LLMProjectExample}
                onBack={() => setSelectedId(null)}
                sectionTitle={section.title}
              />
            </motion.div>
          ) : selectedItem && isCodingReviews ? (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CodingReviewDetail
                item={selectedItem as CodingReviewExample}
                onBack={() => setSelectedId(null)}
                sectionTitle={section.title}
              />
            </motion.div>
          ) : selectedItem && isAIEvaluations ? (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <AIEvaluationDetail
                item={selectedItem as EvaluationExample}
                onBack={() => setSelectedId(null)}
                sectionTitle={section.title}
              />
            </motion.div>
          ) : selectedItem ? (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="text-sm text-white/60 hover:text-white flex items-center gap-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to {section.title}
              </button>

              <div>
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)',
                    color: isMacOS ? '#007aff' : '#58a6ff',
                  }}
                >
                  {selectedItem.category}
                </span>
                <h2 className="text-xl font-semibold text-white mt-2">{selectedItem.title}</h2>
              </div>

              <p className="text-white/70 leading-relaxed">{selectedItem.description}</p>

              {'highlights' in selectedItem && Array.isArray(selectedItem.highlights) && (
                <div>
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Highlights</h3>
                  <ul className="space-y-1">
                    {(selectedItem.highlights as string[]).map((item, i) => (
                      <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {'tech' in selectedItem && Array.isArray(selectedItem.tech) && (
                <div>
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedItem.tech as string[]).map((tech, i) => (
                      <span key={i} className="px-2 py-1 rounded text-sm bg-white/5 text-white/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {(isAIEvaluations || isCodingReviews || isLLMProjects || isMLProjects || isScientificExamples) && overview && (
                <div className="space-y-2">
                  <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{overview}</p>
                  {caption && (
                    <p className="text-white/40 text-xs italic">{caption}</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {section.items.map((item) => {
                  const score = getOverallScore(item as Record<string, unknown>)
                  const diagramType = 'diagramType' in item ? (item as { diagramType: string }).diagramType : null
                  const DiagramComponent = isScientificExamples
                    ? ScientificExampleDiagram
                    : isCodingReviews
                    ? CodingReviewDiagram
                    : isLLMProjects
                    ? LLMProjectDiagram
                    : isMLProjects
                    ? MLProjectDiagram
                    : EvaluationDiagram
                  const isRichCard = isLLMProjects || isMLProjects || isScientificExamples

                  return (
                    <motion.button
                      key={item.id}
                      className="rounded-lg text-left transition-colors overflow-hidden"
                      style={{
                        backgroundColor: isMacOS ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
                      }}
                      whileHover={{
                        backgroundColor: isMacOS ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.06)',
                      }}
                      onClick={() => setSelectedId(item.id)}
                    >
                      {diagramType && (
                        <div className={`overflow-hidden pointer-events-none opacity-85 ${isRichCard ? 'h-32' : 'h-28'}`}>
                          <DiagramComponent diagramType={diagramType} isMacOS={isMacOS} compact={!isRichCard} />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: isMacOS ? 'rgba(0, 122, 255, 0.2)' : 'rgba(88, 166, 255, 0.2)',
                              color: isMacOS ? '#007aff' : '#58a6ff',
                            }}
                          >
                            {item.category}
                          </span>
                          {score && (
                            <span className="text-xs font-mono text-white/50">{score}</span>
                          )}
                        </div>
                        <h3 className="text-white font-medium mt-2">{item.title}</h3>
                        <p className="text-white/50 text-sm mt-1 line-clamp-2">{item.description}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
