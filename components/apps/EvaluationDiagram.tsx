'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface EvaluationDiagramProps {
  diagramType: string
  isMacOS: boolean
}

const accent = (isMacOS: boolean) => (isMacOS ? '#007aff' : '#58a6ff')

function Box({
  x,
  y,
  w,
  h,
  label,
  sublabel,
  color,
  delay = 0,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  sublabel?: string
  color: string
  delay?: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <rect x={x} y={y} width={w} height={h} rx={8} fill={`${color}22`} stroke={color} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + (sublabel ? h / 2 - 4 : h / 2 + 4)} textAnchor="middle" fill="white" fontSize={11} fontWeight={600}>
        {label}
      </text>
      {sublabel && (
        <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={9}>
          {sublabel}
        </text>
      )}
    </motion.g>
  )
}

function Arrow({ x1, y1, x2, y2, delay = 0, color = 'rgba(255,255,255,0.35)' }: {
  x1: number; y1: number; x2: number; y2: number; delay?: number; color?: string
}) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth={1.5}
      markerEnd="url(#arrowhead)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    />
  )
}

function MedicalTreatmentDiagram({ isMacOS }: { isMacOS: boolean }) {
  const blue = accent(isMacOS)
  return (
    <svg viewBox="0 0 520 280" className="w-full h-auto">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>
      <text x="260" y="22" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="monospace">
        TYPE 2 DIABETES — PATIENT-SPECIFIC TREATMENT PATHWAY
      </text>
      <Box x={190} y={36} w={140} h={40} label="Type 2 Diabetes" sublabel="Diagnosis" color="#ef4444" delay={0.1} />
      <Arrow x1={260} y1={76} x2={260} y2={96} delay={0.2} />
      <Box x={170} y={98} w={180} h={44} label="Lifestyle + Metformin" sublabel="First-line foundation" color={blue} delay={0.25} />
      <Arrow x1={210} y1={142} x2={120} y2={168} delay={0.35} />
      <Arrow x1={260} y1={142} x2={260} y2={168} delay={0.38} />
      <Arrow x1={310} y1={142} x2={400} y2={168} delay={0.41} />
      <Box x={40} y={170} w={130} h={48} label="CV Disease Risk" sublabel="→ GLP-1 / SGLT2" color="#f59e0b" delay={0.45} />
      <Box x={195} y={170} w={130} h={48} label="A1C Still High" sublabel="→ Add 2nd agent" color="#8b5cf6" delay={0.48} />
      <Box x={350} y={170} w={130} h={48} label="CKD / Obesity" sublabel="→ SGLT2 / GLP-1" color="#10b981" delay={0.51} />
      <motion.rect
        x={24} y={232} width={472} height={36} rx={6}
        fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth={1} strokeDasharray="4 3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
      />
      <text x={260} y={254} textAnchor="middle" fill="#fca5a5" fontSize={10}>
        Model missed: contraindications, kidney function, weight goals, individualized pathways
      </text>
    </svg>
  )
}

function CodeReviewDiagram({ isMacOS }: { isMacOS: boolean }) {
  const blue = accent(isMacOS)
  return (
    <svg viewBox="0 0 520 260" className="w-full h-auto">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>
      <text x="260" y="22" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="monospace">
        API FETCH — PRODUCTION READINESS CHECK
      </text>
      <Box x={200} y={36} w={120} h={36} label="requests.get(url)" color={blue} delay={0.1} />
      <Arrow x1={260} y1={72} x2={260} y2={88} delay={0.15} />
      {[
        { x: 30, label: 'No Timeout', risk: 'Hang forever', ok: false },
        { x: 145, label: 'No Status Check', risk: 'Silent 4xx/5xx', ok: false },
        { x: 260, label: 'No Error Handling', risk: 'Crash on failure', ok: false },
        { x: 375, label: 'No JSON Guard', risk: 'Parse errors', ok: false },
      ].map((item, i) => (
        <motion.g key={item.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08 }}>
          <rect x={item.x} y={90} width={115} height={52} rx={8} fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth={1.5} />
          <text x={item.x + 57} y={110} textAnchor="middle" fill="#fca5a5" fontSize={10} fontWeight={600}>{item.label}</text>
          <text x={item.x + 57} y={128} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={9}>{item.risk}</text>
        </motion.g>
      ))}
      <Arrow x1={260} y1={142} x2={260} y2={162} delay={0.5} />
      <Box x={155} y={164} w={210} h={40} label="Score: 4/10 Production Ready" color="#ef4444" delay={0.55} />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
        <rect x={40} y={218} width={440} height={32} rx={6} fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth={1} />
        <text x={260} y={238} textAnchor="middle" fill="#6ee7b7" fontSize={10}>
          Fix: timeout + raise_for_status() + try/except + typed return
        </text>
      </motion.g>
    </svg>
  )
}

function RagRisksDiagram({ isMacOS }: { isMacOS: boolean }) {
  const blue = accent(isMacOS)
  const layers = [
    { label: 'Generation Layer', risks: ['Hallucinated synthesis', 'Wrong citations'], color: '#ef4444', y: 28 },
    { label: 'Retrieval Layer', risks: ['Poor ranking', 'Stale docs', 'Chunk failures'], color: '#f59e0b', y: 78 },
    { label: 'Security & Access', risks: ['Permission leakage', 'Data governance'], color: '#8b5cf6', y: 128 },
    { label: 'Operations', risks: ['No eval datasets', 'Missing monitoring'], color: '#10b981', y: 178 },
  ]
  return (
    <svg viewBox="0 0 520 240" className="w-full h-auto">
      <text x="260" y="18" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="monospace">
        ENTERPRISE RAG — RISK STACK (MODEL ANSWER WAS SHALLOW)
      </text>
      {layers.map((layer, i) => (
        <motion.g key={layer.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }}>
          <rect x={20} y={layer.y} width={160} height={40} rx={6} fill={`${layer.color}18`} stroke={layer.color} strokeWidth={1.5} />
          <text x={100} y={layer.y + 24} textAnchor="middle" fill="white" fontSize={10} fontWeight={600}>{layer.label}</text>
          {layer.risks.map((risk, j) => (
            <g key={risk}>
              <rect x={200} y={layer.y + j * 22} width={280} height={20} rx={4} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
              <text x={210} y={layer.y + j * 22 + 14} fill="rgba(255,255,255,0.65)" fontSize={9}>{risk}</text>
            </g>
          ))}
        </motion.g>
      ))}
      <motion.text x={260} y={232} textAnchor="middle" fill={blue} fontSize={10} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        Model only named latency + wrong docs — missed 6+ enterprise risk categories
      </motion.text>
    </svg>
  )
}

function OverfittingDiagram({ isMacOS }: { isMacOS: boolean }) {
  const blue = accent(isMacOS)
  return (
    <svg viewBox="0 0 520 240" className="w-full h-auto">
      <text x="260" y="18" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="monospace">
        OVERFITTING — TRAINING vs VALIDATION PERFORMANCE GAP
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`grid-${i}`} x1={60 + i * 90} y1={40} x2={60 + i * 90} y2={190} stroke="rgba(255,255,255,0.06)" />
      ))}
      <line x1={60} y1={190} x2={420} y2={190} stroke="rgba(255,255,255,0.2)" />
      <line x1={60} y1={40} x2={60} y2={190} stroke="rgba(255,255,255,0.2)" />
      <text x={30} y={120} fill="rgba(255,255,255,0.4)" fontSize={9} transform="rotate(-90 30 120)">Error</text>
      <text x={240} y={210} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9}>Model Complexity →</text>
      <motion.polyline
        points="60,170 150,120 240,80 330,55 420,45"
        fill="none" stroke="#10b981" strokeWidth={2.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
      />
      <motion.polyline
        points="60,170 150,140 240,130 330,125 420,122"
        fill="none" stroke="#ef4444" strokeWidth={2.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
      />
      <text x={430} y={48} fill="#10b981" fontSize={10}>Train</text>
      <text x={430} y={125} fill="#ef4444" fontSize={10}>Val</text>
      <motion.rect x={280} y={60} width={120} height={50} rx={6} fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth={1}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
      />
      <text x={340} y={80} textAnchor="middle" fill="#fca5a5" fontSize={9} fontWeight={600}>Overfitting Zone</text>
      <text x={340} y={96} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={8}>Train ≪ Val error</text>
      <text x={340} y={140} textAnchor="middle" fill={blue} fontSize={9}>Fix: regularization, more data, CV</text>
    </svg>
  )
}

function CrisprDiagram({ isMacOS }: { isMacOS: boolean }) {
  const blue = accent(isMacOS)
  return (
    <svg viewBox="0 0 520 250" className="w-full h-auto">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>
      <text x="260" y="18" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10} fontFamily="monospace">
        CRISPR-Cas9 — MECHANISM & MISSING CAVEATS
      </text>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <rect x={40} y={40} width={440} height={28} rx={14} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth={2} />
        <text x={60} y={58} fill="#93c5fd" fontSize={10} fontFamily="monospace">═══ Target DNA Sequence ═══ NGG (PAM) ═══</text>
      </motion.g>
      <Box x={180} y={82} w={160} h={36} label="Guide RNA (gRNA)" sublabel="Sequence matching" color={blue} delay={0.2} />
      <Arrow x1={260} y1={118} x2={260} y2={132} delay={0.3} />
      <Box x={190} y={134} w={140} h={36} label="Cas9 Enzyme" sublabel="Creates double-strand cut" color="#ef4444" delay={0.35} />
      <Arrow x1={200} y1={170} x2={130} y2={196} delay={0.45} />
      <Arrow x1={320} y1={170} x2={390} y2={196} delay={0.48} />
      <Box x={50} y={198} w={130} h={40} label="NHEJ Repair" sublabel="Error-prone knockout" color="#f59e0b" delay={0.5} />
      <Box x={340} y={198} w={130} h={40} label="HDR Repair" sublabel="Template-guided edit" color="#10b981" delay={0.53} />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
        <rect x={170} y={228} width={180} height={18} rx={4} fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth={1} />
        <text x={260} y={240} textAnchor="middle" fill="#fca5a5" fontSize={8}>Model missed: PAM, off-target effects, repair paths</text>
      </motion.g>
    </svg>
  )
}

export default function EvaluationDiagram({ diagramType, isMacOS }: EvaluationDiagramProps) {
  const diagrams: Record<string, ReactNode> = {
    'medical-treatment': <MedicalTreatmentDiagram isMacOS={isMacOS} />,
    'code-review': <CodeReviewDiagram isMacOS={isMacOS} />,
    'rag-risks': <RagRisksDiagram isMacOS={isMacOS} />,
    'ml-overfitting': <OverfittingDiagram isMacOS={isMacOS} />,
    'crispr-mechanism': <CrisprDiagram isMacOS={isMacOS} />,
  }

  return (
    <div
      className="rounded-lg p-4 overflow-hidden"
      style={{
        backgroundColor: isMacOS ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.35)',
        border: `1px solid ${isMacOS ? 'var(--macos-border)' : 'var(--windows-border)'}`,
      }}
    >
      {diagrams[diagramType] ?? null}
    </div>
  )
}
