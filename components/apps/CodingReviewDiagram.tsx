'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CodingReviewDiagramProps {
  diagramType: string
  isMacOS: boolean
}

function Panel({ x, y, w, h, label, sub, color, delay = 0 }: {
  x: number; y: number; w: number; h: number; label: string; sub?: string; color: string; delay?: number
}) {
  return (
    <motion.g initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: 0.35 }}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={`${color}18`} stroke={color} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle" fill="white" fontSize={10} fontWeight={600}>{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={8}>{sub}</text>}
    </motion.g>
  )
}

function PythonApiDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      <text x="240" y="16" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="monospace">API REQUEST RELIABILITY GAPS</text>
      <Panel x={170} y={28} w={140} h={32} label="requests.get(url)" color="#3b82f6" delay={0.1} />
      {[
        { x: 20, label: 'No Timeout', c: '#ef4444' },
        { x: 115, label: 'No Status', c: '#ef4444' },
        { x: 210, label: 'No Errors', c: '#ef4444' },
        { x: 305, label: 'No URL Check', c: '#ef4444' },
        { x: 400, label: 'No Logging', c: '#ef4444' },
      ].map((b, i) => (
        <Panel key={b.label} x={b.x} y={78} w={90} h={36} label={b.label} color={b.c} delay={0.15 + i * 0.06} />
      ))}
      <motion.rect x={100} y={130} width={280} height={28} rx={5} fill="rgba(16,185,129,0.12)" stroke="#10b981"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
      <text x={240} y={148} textAnchor="middle" fill="#6ee7b7" fontSize={9}>Fix: timeout + raise_for_status + try/except</text>
      <text x={240} y={178} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={8}>Score 4/10 → production controls required</text>
    </svg>
  )
}

function FastApiResolverDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      <text x="240" y="16" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="monospace">WELL RESOLVER — FALLBACK PIPELINE</text>
      <Panel x={30} y={40} w={100} h={40} label="Input name" sub="unvalidated" color="#64748b" delay={0.1} />
      <Panel x={150} y={40} w={100} h={40} label="DB Search" sub="exact match" color="#10b981" delay={0.18} />
      <Panel x={270} y={40} w={100} h={40} label="Fuzzy Match" sub="confidence?" color="#f59e0b" delay={0.26} />
      <Panel x={390} y={40} w={70} h={40} label="LLM" sub="risky" color="#ef4444" delay={0.34} />
      <motion.path d="M130 60 L150 60" stroke="rgba(255,255,255,0.3)" markerEnd="url(#arr)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 }} />
      <motion.path d="M250 60 L270 60" stroke="rgba(255,255,255,0.3)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.45 }} />
      <motion.path d="M370 60 L390 60" stroke="#ef4444" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
      <defs><marker id="arr" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto"><polygon points="0 0,6 2.5,0 5" fill="rgba(255,255,255,0.3)" /></marker></defs>
      <Panel x={80} y={110} w={320} h={36} label="Missing: schema, confidence, audit trail, timeout" color="#8b5cf6" delay={0.55} />
      <text x={240} y={170} textAnchor="middle" fill="#6ee7b7" fontSize={8}>Improved: typed ResolveResponse + gated LLM fallback</text>
    </svg>
  )
}

function ZodValidationDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      <text x="240" y="16" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="monospace">LLM OUTPUT VALIDATION PIPELINE</text>
      {[
        { x: 20, label: 'callLLM()', c: '#3b82f6' },
        { x: 120, label: 'JSON.parse', c: '#ef4444', sub: 'can throw' },
        { x: 220, label: 'schema.parse', c: '#ef4444', sub: 'can throw' },
        { x: 320, label: 'Return', c: '#10b981' },
      ].map((n, i) => (
        <Panel key={n.label} x={n.x} y={36} w={90} h={n.sub ? 44 : 36} label={n.label} sub={n.sub} color={n.c} delay={0.1 + i * 0.08} />
      ))}
      <Panel x={60} y={110} w={360} h={36} label="Improved: timeout → safeParse → log failures → bounded confidence" color="#10b981" delay={0.45} />
      <text x={240} y={168} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8}>Validation failures expected in production LLM systems</text>
    </svg>
  )
}

function RagRetrievalDiagram() {
  return (
    <svg viewBox="0 0 480 210" className="w-full h-auto">
      <text x="240" y="16" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="monospace">ENTERPRISE RAG RETRIEVAL PIPELINE</text>
      {[
        { x: 20, y: 34, label: 'Query', c: '#64748b' },
        { x: 100, y: 34, label: 'ACL Filter', c: '#ef4444' },
        { x: 180, y: 34, label: 'Vector Search', c: '#3b82f6' },
        { x: 270, y: 34, label: 'Rerank', c: '#8b5cf6' },
        { x: 350, y: 34, label: 'Threshold', c: '#f59e0b' },
        { x: 20, y: 90, label: 'Dedupe', c: '#10b981' },
        { x: 110, y: 90, label: 'Token Budget', c: '#10b981' },
        { x: 220, y: 90, label: 'Source Meta', c: '#10b981' },
        { x: 330, y: 90, label: 'Context Out', c: '#10b981' },
      ].map((n, i) => (
        <Panel key={n.label} x={n.x} y={n.y} w={n.x === 350 ? 110 : 75} h={36} label={n.label} color={n.c} delay={0.08 + i * 0.05} />
      ))}
      <motion.rect x={40} y={140} width={400} height={24} rx={4} fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth={1}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} />
      <text x={240} y={156} textAnchor="middle" fill="#fca5a5" fontSize={8}>Original: vector_db.search only — no ACL, rerank, or attribution</text>
    </svg>
  )
}

function AgentToolDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      <text x="240" y="16" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="monospace">AGENT TOOL EXECUTION GUARDRAILS</text>
      <Panel x={180} y={30} w={120} h={32} label="runTool(name, args)" color="#ef4444" delay={0.1} />
      {[
        { x: 30, label: 'Exists?' },
        { x: 120, label: 'Schema' },
        { x: 210, label: 'Approval' },
        { x: 300, label: 'Timeout' },
        { x: 390, label: 'Log' },
      ].map((g, i) => (
        <Panel key={g.label} x={g.x} y={82} w={70} h={32} label={g.label} color="#10b981" delay={0.2 + i * 0.07} />
      ))}
      <Panel x={120} y={130} w={240} h={32} label="Original: tools[name](args) — no checks" color="#ef4444" delay={0.55} />
      <text x={240} y={178} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8}>Score 3/10 — unsafe for real tool execution</text>
    </svg>
  )
}

function ReactComponentDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      <text x="240" y="16" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="monospace">REACT COMPONENT QUALITY LAYERS</text>
      <Panel x={30} y={36} w={200} h={50} label="Original" sub="index keys · div onClick · no alt" color="#ef4444" delay={0.1} />
      <Panel x={250} y={36} w={200} h={50} label="Improved" sub="types · Link · Image · a11y" color="#10b981" delay={0.2} />
      {['TypeScript', 'a11y', 'Next.js', 'Keys', 'Images'].map((t, i) => (
        <motion.g key={t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.06 }}>
          <rect x={30 + i * 86} y={110} width={76} height={24} rx={4} fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth={1} />
          <text x={68 + i * 86} y={126} textAnchor="middle" fill="#93c5fd" fontSize={8}>{t}</text>
        </motion.g>
      ))}
      <text x={240} y={168} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8}>Production frontend: accessibility + framework patterns matter</text>
    </svg>
  )
}

function SqlPipelineDiagram() {
  return (
    <svg viewBox="0 0 480 200" className="w-full h-auto">
      <text x="240" y="16" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={9} fontFamily="monospace">SQL QUERY SAFETY</text>
      <Panel x={40} y={36} w={180} h={44} label="f-string SQL" sub="INJECTION RISK" color="#ef4444" delay={0.1} />
      <text x={240} y={62} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={14}>→</text>
      <Panel x={260} y={36} w={180} h={44} label="Parameterized %s" sub="VALIDATED INPUT" color="#10b981" delay={0.25} />
      {['LIMIT', 'Column select', 'Symbol check', 'Index hint'].map((t, i) => (
        <Panel key={t} x={40 + i * 105} y={100} w={95} h={28} label={t} color="#3b82f6" delay={0.35 + i * 0.06} />
      ))}
      <text x={240} y={168} textAnchor="middle" fill="#fca5a5" fontSize={8}>Score 3.4/10 — SELECT * + no pagination + injection risk</text>
    </svg>
  )
}

export default function CodingReviewDiagram({ diagramType, isMacOS }: CodingReviewDiagramProps) {
  const diagrams: Record<string, ReactNode> = {
    'cr-python-api': <PythonApiDiagram />,
    'cr-fastapi-resolver': <FastApiResolverDiagram />,
    'cr-zod-validation': <ZodValidationDiagram />,
    'cr-rag-retrieval': <RagRetrievalDiagram />,
    'cr-agent-tool': <AgentToolDiagram />,
    'cr-react-component': <ReactComponentDiagram />,
    'cr-sql-pipeline': <SqlPipelineDiagram />,
  }

  return (
    <div
      className="rounded-lg p-3 overflow-hidden"
      style={{
        backgroundColor: isMacOS ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.35)',
        border: `1px solid ${isMacOS ? 'var(--macos-border)' : 'var(--windows-border)'}`,
      }}
    >
      {diagrams[diagramType] ?? null}
    </div>
  )
}
