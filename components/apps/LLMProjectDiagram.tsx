'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface LLMProjectDiagramProps {
  diagramType: string
  isMacOS: boolean
  compact?: boolean
}

function FlowNode({
  label,
  color,
  delay,
  x,
  y,
  w = 120,
  h = 32,
}: {
  label: string
  color: string
  delay: number
  x: number
  y: number
  w?: number
  h?: number
}) {
  return (
    <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={`${color}20`} stroke={color} strokeWidth={1.5} />
      <motion.rect
        x={x} y={y} width={w} height={h} rx={8}
        fill={color} opacity={0.08}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 2.5, repeat: Infinity, delay }}
      />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill="white" fontSize={10} fontWeight={600}>
        {label}
      </text>
    </motion.g>
  )
}

function FlowArrow(x: number, y1: number, y2: number, delay: number, color = 'rgba(255,255,255,0.35)') {
  return (
    <motion.line
      x1={x} y1={y1} x2={x} y2={y2}
      stroke={color} strokeWidth={1.5}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
    />
  )
}

function AgentEngineDiagram() {
  const cx = 200
  const nodes = [
    { label: 'Prompt', y: 20, c: '#64748b' },
    { label: 'Model Router', y: 58, c: '#3b82f6' },
    { label: 'LLM Provider', y: 96, c: '#8b5cf6' },
    { label: 'Schema Validation', y: 134, c: '#f59e0b' },
    { label: 'Retry / Fallback', y: 172, c: '#ef4444' },
    { label: 'Structured Output', y: 210, c: '#10b981' },
  ]
  return (
    <svg viewBox="0 0 400 250" className="w-full h-auto">
      <text x={200} y={12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="monospace">FAIL-OPEN LLM ENGINE</text>
      {nodes.map((n, i) => (
        <g key={n.label}>
          {i > 0 && FlowArrow(cx + 60, nodes[i - 1].y + 32, n.y, 0.1 + i * 0.08)}
          <FlowNode label={n.label} color={n.c} delay={0.1 + i * 0.07} x={cx} y={n.y} />
        </g>
      ))}
    </svg>
  )
}

function RagPlatformDiagram() {
  const steps = [
    { x: 20, label: 'Documents', c: '#64748b' },
    { x: 95, label: 'Chunking', c: '#3b82f6' },
    { x: 170, label: 'Embeddings', c: '#8b5cf6' },
    { x: 245, label: 'Vector Search', c: '#f59e0b' },
    { x: 320, label: 'Reranking', c: '#ec4899' },
  ]
  const bottom = [
    { x: 80, label: 'LLM Answer', c: '#10b981' },
    { x: 220, label: 'Evaluation', c: '#ef4444' },
  ]
  return (
    <svg viewBox="0 0 420 200" className="w-full h-auto">
      <text x={210} y={12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="monospace">MICROSERVICES RAG PIPELINE</text>
      {steps.map((s, i) => (
        <g key={s.label}>
          {i > 0 && (
            <motion.line x1={steps[i - 1].x + 70} y1={40} x2={s.x} y2={40} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.15 + i * 0.06 }} />
          )}
          <FlowNode label={s.label} color={s.c} delay={0.1 + i * 0.06} x={s.x} y={24} w={72} h={32} />
        </g>
      ))}
      <motion.line x1={210} y1={56} x2={210} y2={90} stroke="rgba(255,255,255,0.3)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.45 }} />
      {bottom.map((b, i) => (
        <FlowNode key={b.label} label={b.label} color={b.c} delay={0.5 + i * 0.08} x={b.x} y={100} w={100} h={36} />
      ))}
      <motion.text x={210} y={165} textAnchor="middle" fill="#fca5a5" fontSize={8} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        HyDE · Adversarial Critique · LangSmith Tracing
      </motion.text>
    </svg>
  )
}

function CorpoCodeDiagram() {
  return (
    <svg viewBox="0 0 420 220" className="w-full h-auto">
      <text x={210} y={12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="monospace">MULTI-AGENT CODING WORKFLOW</text>
      <FlowNode label="Main Coding Agent" color="#8b5cf6" delay={0.1} x={130} y={28} w={160} h={36} />
      {[
        { label: 'Context Agent', x: 20, y: 100, c: '#3b82f6' },
        { label: 'Verification Agent', x: 115, y: 100, c: '#10b981' },
        { label: 'Documentation Agent', x: 210, y: 100, c: '#f59e0b' },
        { label: 'Git / Memory Agent', x: 305, y: 100, c: '#ef4444' },
      ].map((a, i) => (
        <g key={a.label}>
          <motion.line x1={210} y1={64} x2={a.x + 50} y2={a.y} stroke="rgba(255,255,255,0.25)" strokeWidth={1.5}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 + i * 0.07 }} />
          <FlowNode label={a.label} color={a.c} delay={0.25 + i * 0.07} x={a.x} y={a.y} w={100} h={32} />
        </g>
      ))}
      <text x={210} y={175} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={8}>Generate ≠ Verify — behavior regressions caught in review</text>
    </svg>
  )
}

function OilWellDiagram() {
  const cx = 200
  const nodes = [
    { label: 'Free-text Well Name', c: '#64748b', y: 18 },
    { label: 'Exact Match', c: '#10b981', y: 52 },
    { label: 'Fuzzy Match', c: '#3b82f6', y: 86 },
    { label: 'Cross-Validation', c: '#8b5cf6', y: 120 },
    { label: 'LLM Tie-Breaker', c: '#f59e0b', y: 154 },
    { label: 'Official API Number', c: '#10b981', y: 188 },
  ]
  return (
    <svg viewBox="0 0 400 230" className="w-full h-auto">
      <text x={200} y={10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="monospace">ENTITY RESOLUTION — 120K RECORDS</text>
      {nodes.map((n, i) => (
        <g key={n.label}>
          {i > 0 && FlowArrow(cx + 70, nodes[i - 1].y + 28, n.y, 0.1 + i * 0.07, i === 4 ? '#f59e0b' : undefined)}
          <FlowNode label={n.label} color={n.c} delay={0.08 + i * 0.06} x={cx} y={n.y} w={140} h={28} />
        </g>
      ))}
    </svg>
  )
}

function VisionPdfDiagram() {
  const cx = 200
  const nodes = [
    { label: 'PDF', c: '#64748b', y: 16 },
    { label: 'Rendered Page', c: '#3b82f6', y: 50 },
    { label: 'Vision LLM', c: '#8b5cf6', y: 84 },
    { label: 'Schema Check', c: '#f59e0b', y: 118 },
    { label: 'Self-Correction', c: '#ef4444', y: 152 },
    { label: '26-Column CSV', c: '#10b981', y: 186 },
  ]
  return (
    <svg viewBox="0 0 400 230" className="w-full h-auto">
      <text x={200} y={10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9} fontFamily="monospace">VISION DOCUMENT EXTRACTION</text>
      {nodes.map((n, i) => (
        <g key={n.label}>
          {i > 0 && FlowArrow(cx + 60, nodes[i - 1].y + 28, n.y, 0.1 + i * 0.07)}
          <FlowNode label={n.label} color={n.c} delay={0.08 + i * 0.06} x={cx} y={n.y} w={120} h={28} />
        </g>
      ))}
    </svg>
  )
}

export default function LLMProjectDiagram({ diagramType, isMacOS, compact }: LLMProjectDiagramProps) {
  const diagrams: Record<string, ReactNode> = {
    'llm-agent-engine': <AgentEngineDiagram />,
    'llm-rag-platform': <RagPlatformDiagram />,
    'llm-corpocode': <CorpoCodeDiagram />,
    'llm-oil-well': <OilWellDiagram />,
    'llm-vision-pdf': <VisionPdfDiagram />,
  }

  return (
    <div
      className={`rounded-lg overflow-hidden ${compact ? 'p-2' : 'p-4'}`}
      style={{
        background: isMacOS
          ? 'linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,122,255,0.06) 100%)'
          : 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(88,166,255,0.06) 100%)',
        border: `1px solid ${isMacOS ? 'var(--macos-border)' : 'var(--windows-border)'}`,
      }}
    >
      {diagrams[diagramType] ?? null}
    </div>
  )
}
