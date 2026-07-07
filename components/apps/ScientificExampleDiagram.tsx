'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ScientificExampleDiagramProps {
  diagramType: string
  isMacOS: boolean
  compact?: boolean
}

function Step({ x, y, w, label, color, delay }: {
  x: number; y: number; w: number; label: string; color: string; delay: number
}) {
  const h = 26
  return (
    <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={`${color}18`} stroke={color} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill="white" fontSize={8.5} fontWeight={600}>{label}</text>
    </motion.g>
  )
}

function VLine(x: number, y1: number, y2: number, delay: number, color = 'rgba(14,165,233,0.45)') {
  return (
    <motion.line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth={1.5}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.35 }} />
  )
}

function VerticalPipeline({ title, steps, cx = 190, width = 150 }: {
  title: string
  steps: { label: string; color: string }[]
  cx?: number
  width?: number
}) {
  const startY = 22
  const gap = 34
  return (
    <svg viewBox="0 0 380 240" className="w-full h-auto">
      <text x={190} y={12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">{title}</text>
      {steps.map((s, i) => {
        const y = startY + i * gap
        return (
          <g key={s.label}>
            {i > 0 && VLine(cx + width / 2, startY + (i - 1) * gap + 26, y, 0.06 + i * 0.05, s.color)}
            <Step x={cx} y={y} w={width} label={s.label} color={s.color} delay={0.05 + i * 0.05} />
          </g>
        )
      })}
    </svg>
  )
}

function RadiationQADiagram() {
  return (
    <VerticalPipeline
      title="MEDICAL PHYSICS QA EVALUATION"
      steps={[
        { label: 'Motion Phantom', color: '#64748b' },
        { label: 'Simulated Patient Motion', color: '#0ea5e9' },
        { label: 'CT / MRI / Proton QA', color: '#8b5cf6' },
        { label: 'Measurement Review', color: '#f59e0b' },
        { label: 'AI Explanation Evaluation', color: '#10b981' },
      ]}
    />
  )
}

function CTImagingDiagram() {
  return (
    <VerticalPipeline
      title="MEDICAL IMAGING AI EVALUATION"
      steps={[
        { label: 'Raw CT / Radiographic Image', color: '#64748b' },
        { label: 'Preprocessing', color: '#0ea5e9' },
        { label: 'Segmentation / Measurement', color: '#8b5cf6' },
        { label: 'Quality Review', color: '#f59e0b' },
        { label: 'AI Output Evaluation', color: '#10b981' },
      ]}
    />
  )
}

function ProtonScatterDiagram() {
  return (
    <svg viewBox="0 0 380 200" className="w-full h-auto">
      <text x={190} y={12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">PROTON BEAM SCATTER PHYSICS</text>
      <motion.line x1={40} y1={100} x2={340} y2={100} stroke="#0ea5e9" strokeWidth={3}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
      <text x={190} y={90} textAnchor="middle" fill="#7dd3fc" fontSize={9}>Proton beam path</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line key={i}
          x1={80 + i * 55} y1={100} x2={80 + i * 55 + (i % 2 ? 15 : -15)} y2={100 + (i % 2 ? 35 : -35)}
          stroke="#f59e0b" strokeWidth={1.5} opacity={0.7}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.08 }} />
      ))}
      <Step x={30} y={140} w={110} label="Multiple Coulomb Scatter" color="#f59e0b" delay={0.5} />
      <Step x={135} y={140} w={110} label="Beam Broadening" color="#ef4444" delay={0.58} />
      <Step x={240} y={140} w={110} label="Dose Uncertainty" color="#8b5cf6" delay={0.66} />
    </svg>
  )
}

function ChemistryDiagram() {
  return (
    <svg viewBox="0 0 380 180" className="w-full h-auto">
      <text x={190} y={12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">LE CHATELIER — EQUILIBRIUM SHIFT</text>
      <Step x={115} y={28} w={150} label="System at Equilibrium" color="#64748b" delay={0.1} />
      <Step x={115} y={68} w={150} label="Disturbance Applied" color="#f59e0b" delay={0.2} />
      <Step x={60} y={108} w={120} label="Shift → Products" color="#10b981" delay={0.32} />
      <Step x={200} y={108} w={120} label="Shift → Reactants" color="#ef4444" delay={0.38} />
      <text x={190} y={160} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8}>Reduce effect of disturbance — not always "undo"</text>
    </svg>
  )
}

function MedicalSafetyDiagram() {
  return (
    <VerticalPipeline
      title="HEALTHCARE SAFETY EVALUATION"
      steps={[
        { label: 'Medical Prompt', color: '#64748b' },
        { label: 'Model Response', color: '#0ea5e9' },
        { label: 'Safety Check', color: '#ef4444' },
        { label: 'Missing Caveats', color: '#f59e0b' },
        { label: 'Escalation / Correction', color: '#10b981' },
      ]}
    />
  )
}

function ClaimVerificationDiagram() {
  return (
    <VerticalPipeline
      title="SCIENTIFIC CLAIM VERIFICATION"
      width={170}
      cx={105}
      steps={[
        { label: 'Scientific / Health Claim', color: '#64748b' },
        { label: 'Evidence Quality Review', color: '#0ea5e9' },
        { label: 'Hallucination Detection', color: '#ef4444' },
        { label: 'Overclaim Correction', color: '#f59e0b' },
        { label: 'Safe Public Guidance', color: '#10b981' },
      ]}
    />
  )
}

export default function ScientificExampleDiagram({ diagramType, isMacOS, compact }: ScientificExampleDiagramProps) {
  const diagrams: Record<string, ReactNode> = {
    'sci-radiation-qa': <RadiationQADiagram />,
    'sci-ct-imaging': <CTImagingDiagram />,
    'sci-proton-scatter': <ProtonScatterDiagram />,
    'sci-chemistry': <ChemistryDiagram />,
    'sci-medical-safety': <MedicalSafetyDiagram />,
    'sci-claim-verification': <ClaimVerificationDiagram />,
  }

  return (
    <div
      className={`rounded-lg overflow-hidden ${compact ? 'p-2' : 'p-4'}`}
      style={{
        background: isMacOS
          ? 'linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(14,165,233,0.08) 100%)'
          : 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(14,165,233,0.08) 100%)',
        border: `1px solid ${isMacOS ? 'var(--macos-border)' : 'var(--windows-border)'}`,
      }}
    >
      {diagrams[diagramType] ?? null}
    </div>
  )
}
