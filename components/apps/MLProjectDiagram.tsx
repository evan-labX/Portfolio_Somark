'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MLProjectDiagramProps {
  diagramType: string
  isMacOS: boolean
  compact?: boolean
}

function Node({ x, y, w, label, color, delay }: {
  x: number; y: number; w: number; label: string; color: string; delay: number
}) {
  const h = 28
  return (
    <motion.g initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, duration: 0.35 }}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={`${color}18`} stroke={color} strokeWidth={1.5} />
      <motion.rect x={x} y={y} width={w} height={h} rx={6} fill={color} opacity={0.06}
        animate={{ opacity: [0.04, 0.12, 0.04] }} transition={{ duration: 2.8, repeat: Infinity, delay }} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill="white" fontSize={9} fontWeight={600}>{label}</text>
    </motion.g>
  )
}

function VArrow(x: number, y1: number, y2: number, delay: number) {
  return (
    <motion.line x1={x} y1={y1} x2={x} y2={y2} stroke="rgba(16,185,129,0.45)" strokeWidth={1.5}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay, duration: 0.35 }} />
  )
}

function GpuPipelineDiagram() {
  const cx = 190
  const steps = [
    { y: 18, label: 'CUDA Data Generation', c: '#64748b' },
    { y: 52, label: 'Feature Store / Parquet', c: '#3b82f6' },
    { y: 86, label: 'Dask Multi-GPU Training', c: '#8b5cf6' },
    { y: 120, label: 'XGBoost / LightGBM / PyTorch', c: '#f59e0b' },
    { y: 154, label: 'MLflow + W&B Tracking', c: '#ec4899' },
    { y: 188, label: 'Model Evaluation', c: '#10b981' },
  ]
  return (
    <svg viewBox="0 0 380 230" className="w-full h-auto">
      <text x={190} y={10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">12.65B SAMPLES · GPU ML PIPELINE</text>
      {steps.map((s, i) => (
        <g key={s.label}>
          {i > 0 && VArrow(cx + 80, steps[i - 1].y + 28, s.y, 0.08 + i * 0.06)}
          <Node x={cx} y={s.y} w={160} label={s.label} color={s.c} delay={0.06 + i * 0.05} />
        </g>
      ))}
    </svg>
  )
}

function WeatherFinanceDiagram() {
  const top = [
    { x: 30, label: 'Market APIs', c: '#3b82f6' },
    { x: 130, label: 'Weather APIs', c: '#06b6d4' },
  ]
  const mid = [
    { x: 80, y: 70, label: 'TimescaleDB', c: '#8b5cf6' },
    { x: 80, y: 108, label: '1000+ Indicators', c: '#f59e0b' },
    { x: 80, y: 146, label: 'Parquet Export', c: '#64748b' },
  ]
  return (
    <svg viewBox="0 0 380 210" className="w-full h-auto">
      <text x={190} y={10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">WEATHER × FINANCE TIME-SERIES</text>
      {top.map((t, i) => <Node key={t.label} x={t.x} y={22} w={100} label={t.label} color={t.c} delay={0.1 + i * 0.06} />)}
      <motion.line x1={80} y1={50} x2={130} y2={50} stroke="rgba(255,255,255,0.25)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} />
      {mid.map((m, i) => (
        <g key={m.label}>
          {i === 0 && VArrow(130, 50, m.y, 0.25)}
          {i > 0 && VArrow(130, mid[i - 1].y + 28, m.y, 0.3 + i * 0.06)}
          <Node x={m.x} y={m.y} w={140} label={m.label} color="#8b5cf6" delay={0.28 + i * 0.06} />
        </g>
      ))}
      <Node x={230} y={108} w={130} label="XGBoost / RandomForest" color="#10b981" delay={0.55} />
      <text x={190} y={198} textAnchor="middle" fill="#fca5a5" fontSize={7}>Leakage control · time-aware splits</text>
    </svg>
  )
}

function RngAuditDiagram() {
  const cx = 190
  const steps = [
    { y: 18, label: 'HMAC-SHA256 Outcomes', c: '#64748b' },
    { y: 48, label: 'Distribution Tests', c: '#3b82f6' },
    { y: 78, label: 'Feature Extraction', c: '#8b5cf6' },
    { y: 108, label: 'RF / GBM / MLP', c: '#f59e0b' },
    { y: 138, label: 'Walk-Forward Backtest', c: '#ef4444' },
    { y: 168, label: 'Signal Validity Review', c: '#10b981' },
  ]
  return (
    <svg viewBox="0 0 380 200" className="w-full h-auto">
      <text x={190} y={10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">PROVABLY-FAIR RNG AUDIT</text>
      {steps.map((s, i) => (
        <g key={s.label}>
          {i > 0 && VArrow(cx + 75, steps[i - 1].y + 28, s.y, 0.08 + i * 0.05)}
          <Node x={cx} y={s.y} w={150} label={s.label} color={s.c} delay={0.06 + i * 0.05} />
        </g>
      ))}
    </svg>
  )
}

function AlgoTradingDiagram() {
  const cx = 190
  const steps = [
    { y: 22, label: 'Market Data APIs', c: '#3b82f6' },
    { y: 56, label: 'SQL Database', c: '#64748b' },
    { y: 90, label: 'Technical Analysis', c: '#8b5cf6' },
    { y: 124, label: 'Dynamic Model Training', c: '#f59e0b' },
    { y: 158, label: 'Prediction + Risk Review', c: '#10b981' },
  ]
  return (
    <svg viewBox="0 0 380 200" className="w-full h-auto">
      <text x={190} y={10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">ALGORITHMIC TRADING · ML EVAL</text>
      {steps.map((s, i) => (
        <g key={s.label}>
          {i > 0 && VArrow(cx + 80, steps[i - 1].y + 28, s.y, 0.08 + i * 0.06)}
          <Node x={cx} y={s.y} w={160} label={s.label} color={s.c} delay={0.06 + i * 0.05} />
        </g>
      ))}
    </svg>
  )
}

function OilWellProfitDiagram() {
  return (
    <svg viewBox="0 0 380 180" className="w-full h-auto">
      <text x={190} y={10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">OIL-WELL PROFITABILITY MODELING</text>
      {[
        { x: 20, y: 28, label: 'Data Extraction', c: '#64748b' },
        { x: 140, y: 28, label: 'Cleaning', c: '#3b82f6' },
        { x: 260, y: 28, label: 'Feature Build', c: '#8b5cf6' },
        { x: 80, y: 78, label: 'Regression Models', c: '#f59e0b' },
        { x: 200, y: 78, label: 'Financial Analysis', c: '#10b981' },
      ].map((n, i) => (
        <Node key={n.label} x={n.x} y={n.y} w={100} label={n.label} color={n.c} delay={0.08 + i * 0.06} />
      ))}
      <text x={190} y={130} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize={8}>Applied ML · business interpretability</text>
    </svg>
  )
}

function MedicalImagingDiagram() {
  const cx = 190
  const steps = [
    { y: 22, label: 'CT / Radiographic Data', c: '#3b82f6' },
    { y: 56, label: 'Proton-Beam Analysis', c: '#8b5cf6' },
    { y: 90, label: 'Python + C++ QA Software', c: '#64748b' },
    { y: 124, label: 'Scientific Validation', c: '#f59e0b' },
    { y: 158, label: 'Medical AI Evaluation', c: '#10b981' },
  ]
  return (
    <svg viewBox="0 0 380 200" className="w-full h-auto">
      <text x={190} y={10} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={8} fontFamily="monospace">WUSTL RADIATION ONCOLOGY · QA</text>
      {steps.map((s, i) => (
        <g key={s.label}>
          {i > 0 && VArrow(cx + 80, steps[i - 1].y + 28, s.y, 0.08 + i * 0.06)}
          <Node x={cx} y={s.y} w={160} label={s.label} color={s.c} delay={0.06 + i * 0.05} />
        </g>
      ))}
    </svg>
  )
}

export default function MLProjectDiagram({ diagramType, isMacOS, compact }: MLProjectDiagramProps) {
  const diagrams: Record<string, ReactNode> = {
    'ml-gpu-pipeline': <GpuPipelineDiagram />,
    'ml-weather-finance': <WeatherFinanceDiagram />,
    'ml-rng-audit': <RngAuditDiagram />,
    'ml-algo-trading': <AlgoTradingDiagram />,
    'ml-oil-well-profit': <OilWellProfitDiagram />,
    'ml-medical-imaging': <MedicalImagingDiagram />,
  }

  return (
    <div
      className={`rounded-lg overflow-hidden ${compact ? 'p-2' : 'p-4'}`}
      style={{
        background: isMacOS
          ? 'linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(16,185,129,0.07) 100%)'
          : 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(16,185,129,0.07) 100%)',
        border: `1px solid ${isMacOS ? 'var(--macos-border)' : 'var(--windows-border)'}`,
      }}
    >
      {diagrams[diagramType] ?? null}
    </div>
  )
}
