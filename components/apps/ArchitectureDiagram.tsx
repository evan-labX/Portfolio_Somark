'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useMemo, useId } from 'react'

interface DiagramNode {
  id: string
  label: string
  color: string
  level?: number
  desc?: string
}

interface DiagramEdge {
  from: string
  to: string
  label?: string
  style?: 'solid' | 'dashed'
}

interface DiagramConfig {
  type: 'flow' | 'hierarchy' | 'pipeline' | 'layers' | 'security' | 'toolFirst' | 'observability'
  nodes: DiagramNode[]
  edges?: DiagramEdge[]
}

interface ArchitectureDiagramProps {
  config: DiagramConfig
  isMacOS: boolean
}

// Unified Animated Arrow - Line and arrowhead animate together as one unit
interface AnimatedArrowProps {
  path: string
  color?: string
  strokeWidth?: number
  delay?: number
  duration?: number
  dashed?: boolean
}

const AnimatedArrow = ({ 
  path, 
  color = "rgba(255,255,255,0.4)", 
  strokeWidth = 2, 
  delay = 0, 
  duration = 0.5,
  dashed = false 
}: AnimatedArrowProps) => {
  const markerId = useId()
  const pathRef = useRef<SVGPathElement>(null)
  const progress = useMotionValue(0)
  
  // Parse path to get total length and end angle
  const pathData = useMemo(() => {
    const parts = path.trim().split(/\s+/)
    let lastX = 0, lastY = 0
    let prevX = 0, prevY = 0
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      if (part === 'M' || part === 'L') {
        prevX = lastX
        prevY = lastY
        lastX = parseFloat(parts[i + 1])
        lastY = parseFloat(parts[i + 2])
        i += 2
      } else if (!isNaN(parseFloat(part)) && i > 0) {
        prevX = lastX
        prevY = lastY
        lastX = parseFloat(part)
        if (i + 1 < parts.length && !isNaN(parseFloat(parts[i + 1]))) {
          lastY = parseFloat(parts[i + 1])
          i++
        }
      }
    }
    
    const angle = Math.atan2(lastY - prevY, lastX - prevX) * (180 / Math.PI)
    return { endX: lastX, endY: lastY, angle }
  }, [path])

  const arrowSize = 8
  
  // Animate progress from 0 to 1
  useEffect(() => {
    const controls = animate(progress, 1, {
      duration,
      delay,
      ease: "easeInOut"
    })
    return () => controls.stop()
  }, [progress, duration, delay])

  // Arrowhead opacity synced with line drawing completion (appears at ~80% progress)
  const arrowOpacity = useTransform(progress, [0, 0.7, 1], [0, 0, 1])
  const arrowScale = useTransform(progress, [0, 0.7, 1], [0.3, 0.3, 1])

  return (
    <g>
      {/* Marker definition for arrowhead */}
      <defs>
        <marker
          id={markerId}
          markerWidth={arrowSize}
          markerHeight={arrowSize}
          refX={arrowSize - 1}
          refY={arrowSize / 2}
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <motion.polygon
            points={`0,0 ${arrowSize},${arrowSize/2} 0,${arrowSize}`}
            fill={color}
            style={{ opacity: arrowOpacity, scale: arrowScale }}
          />
        </marker>
      </defs>
      
      {/* Animated path with marker */}
      <motion.path
        ref={pathRef}
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={dashed ? "6,4" : undefined}
        markerEnd={`url(#${markerId})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
    </g>
  )
}

// Simple line arrow - straight lines with unified animation
interface AnimatedLineArrowProps {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  strokeWidth?: number
  delay?: number
  duration?: number
}

const AnimatedLineArrow = ({
  x1, y1, x2, y2,
  color = "rgba(255,255,255,0.4)",
  strokeWidth = 2,
  delay = 0,
  duration = 0.3
}: AnimatedLineArrowProps) => {
  const markerId = useId()
  const arrowSize = 7
  const progress = useMotionValue(0)
  
  useEffect(() => {
    const controls = animate(progress, 1, {
      duration,
      delay,
      ease: "easeInOut"
    })
    return () => controls.stop()
  }, [progress, duration, delay])

  const arrowOpacity = useTransform(progress, [0, 0.6, 1], [0, 0, 1])
  const arrowScale = useTransform(progress, [0, 0.6, 1], [0.3, 0.3, 1])

  return (
    <g>
      <defs>
        <marker
          id={markerId}
          markerWidth={arrowSize}
          markerHeight={arrowSize}
          refX={arrowSize - 1}
          refY={arrowSize / 2}
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <motion.polygon
            points={`0,0 ${arrowSize},${arrowSize/2} 0,${arrowSize}`}
            fill={color}
            style={{ opacity: arrowOpacity, scale: arrowScale }}
          />
        </marker>
      </defs>
      
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${markerId})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
    </g>
  )
}

export default function ArchitectureDiagram({ config, isMacOS }: ArchitectureDiagramProps) {
  const { type } = config

  // Agent Lifecycle Flow - Detailed state machine
  const renderFlowDiagram = () => {
    return (
      <svg width="100%" height="320" viewBox="0 0 800 320" className="font-mono">
        {/* Main flow connections with animated arrows */}
        <g className="edges">
          {/* Init → Research */}
          <AnimatedArrow path="M 120 80 L 200 80" delay={0.1} duration={0.4} />
          {/* Research → Plan */}
          <AnimatedArrow path="M 320 80 L 400 80" delay={0.2} duration={0.4} />
          {/* Plan → Execute */}
          <AnimatedArrow path="M 520 80 L 600 80" delay={0.3} duration={0.4} />
          {/* Execute → Validate */}
          <AnimatedArrow path="M 700 100 L 700 140 L 460 140 L 460 160" delay={0.4} duration={0.5} />
          {/* Validate → Terminate (success) */}
          <AnimatedArrow path="M 520 200 L 600 200" color="#10b981" delay={0.5} duration={0.4} />
          {/* Validate → Plan (retry) */}
          <AnimatedArrow path="M 400 200 L 340 200 L 340 120 L 400 120 L 400 100" color="#f59e0b" delay={0.6} duration={0.5} dashed />
        </g>

        {/* Nodes */}
        <g className="nodes">
          {/* Initialize */}
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            <rect x="20" y="50" width="100" height="60" rx="8" fill="#64748b20" stroke="#64748b" strokeWidth="2"/>
            <text x="70" y="75" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle">Initialize</text>
            <text x="70" y="92" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Load Config</text>
          </motion.g>

          {/* Research */}
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <rect x="200" y="50" width="120" height="60" rx="8" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2"/>
            <text x="260" y="75" fill="#3b82f6" fontSize="11" fontWeight="600" textAnchor="middle">Research</text>
            <text x="260" y="92" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Gather Context</text>
          </motion.g>

          {/* Plan */}
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
            <rect x="400" y="50" width="120" height="60" rx="8" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="2"/>
            <text x="460" y="75" fill="#8b5cf6" fontSize="11" fontWeight="600" textAnchor="middle">Plan</text>
            <text x="460" y="92" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Decompose Task</text>
          </motion.g>

          {/* Execute */}
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.3 }}>
            <rect x="600" y="50" width="120" height="60" rx="8" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="2"/>
            <text x="660" y="75" fill="#f59e0b" fontSize="11" fontWeight="600" textAnchor="middle">Execute</text>
            <text x="660" y="92" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Run Tools</text>
          </motion.g>

          {/* Validate */}
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.4 }}>
            <rect x="400" y="160" width="120" height="60" rx="8" fill="#10b98120" stroke="#10b981" strokeWidth="2"/>
            <text x="460" y="185" fill="#10b981" fontSize="11" fontWeight="600" textAnchor="middle">Validate</text>
            <text x="460" y="202" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Check Results</text>
          </motion.g>

          {/* Terminate */}
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.5 }}>
            <rect x="600" y="160" width="120" height="60" rx="8" fill="#ef444420" stroke="#ef4444" strokeWidth="2"/>
            <text x="660" y="185" fill="#ef4444" fontSize="11" fontWeight="600" textAnchor="middle">Terminate</text>
            <text x="660" y="202" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Cleanup & Exit</text>
          </motion.g>
        </g>

        {/* Labels */}
        <motion.text x="560" y="195" fill="#10b981" fontSize="9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>success</motion.text>
        <motion.text x="300" y="195" fill="#f59e0b" fontSize="9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>retry</motion.text>

        {/* Budget/Limit indicators */}
        <g className="indicators">
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <rect x="20" y="250" width="200" height="50" rx="6" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" strokeWidth="1"/>
            <text x="30" y="270" fill="#ef4444" fontSize="10" fontWeight="500">Budget Limits</text>
            <text x="30" y="285" fill="rgba(255,255,255,0.4)" fontSize="9">Time • Tokens • Iterations</text>
          </motion.g>
          
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            <rect x="240" y="250" width="200" height="50" rx="6" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" strokeWidth="1"/>
            <text x="250" y="270" fill="#10b981" fontSize="10" fontWeight="500">Checkpoints</text>
            <text x="250" y="285" fill="rgba(255,255,255,0.4)" fontSize="9">State persisted each phase</text>
          </motion.g>

          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <rect x="460" y="250" width="200" height="50" rx="6" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="1"/>
            <text x="470" y="270" fill="#3b82f6" fontSize="10" fontWeight="500">Interrupts</text>
            <text x="470" y="285" fill="rgba(255,255,255,0.4)" fontSize="9">Pause/Resume between phases</text>
          </motion.g>
        </g>
      </svg>
    )
  }

  // Multi-Agent Hierarchy - Detailed coordination
  const renderHierarchyDiagram = () => {
    return (
      <svg width="100%" height="380" viewBox="0 0 700 380" className="font-mono">
        {/* Orchestrator */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <rect x="250" y="20" width="200" height="60" rx="10" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="2"/>
          <text x="350" y="45" fill="#8b5cf6" fontSize="13" fontWeight="600" textAnchor="middle">Orchestrator</text>
          <text x="350" y="62" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">Task Distribution & Lifecycle</text>
        </motion.g>

        {/* Connections from Orchestrator */}
        <AnimatedArrow path="M 300 80 L 150 130" delay={0.2} duration={0.4} />
        <AnimatedArrow path="M 350 80 L 350 130" delay={0.3} duration={0.4} />
        <AnimatedArrow path="M 400 80 L 550 130" delay={0.4} duration={0.4} />

        {/* Planner Agent */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <rect x="50" y="130" width="180" height="55" rx="8" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2"/>
          <text x="140" y="155" fill="#3b82f6" fontSize="11" fontWeight="600" textAnchor="middle">Planner Agent</text>
          <text x="140" y="172" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Decompose & Assign</text>
        </motion.g>

        {/* Validator Agent */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <rect x="260" y="130" width="180" height="55" rx="8" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="2"/>
          <text x="350" y="155" fill="#f59e0b" fontSize="11" fontWeight="600" textAnchor="middle">Validator Agent</text>
          <text x="350" y="172" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Review & Approve</text>
        </motion.g>

        {/* Monitor Agent */}
        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
          <rect x="470" y="130" width="180" height="55" rx="8" fill="#06b6d420" stroke="#06b6d4" strokeWidth="2"/>
          <text x="560" y="155" fill="#06b6d4" fontSize="11" fontWeight="600" textAnchor="middle">Monitor Agent</text>
          <text x="560" y="172" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Track & Alert</text>
        </motion.g>

        {/* Worker Agents connections */}
        <AnimatedArrow path="M 80 185 L 80 220" delay={0.5} duration={0.3} />
        <AnimatedArrow path="M 200 185 L 200 220" delay={0.55} duration={0.3} />

        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
          <rect x="30" y="220" width="100" height="50" rx="6" fill="#10b98120" stroke="#10b981" strokeWidth="1.5"/>
          <text x="80" y="242" fill="#10b981" fontSize="10" fontWeight="500" textAnchor="middle">Worker 1</text>
          <text x="80" y="258" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Code Gen</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55 }}>
          <rect x="150" y="220" width="100" height="50" rx="6" fill="#10b98120" stroke="#10b981" strokeWidth="1.5"/>
          <text x="200" y="242" fill="#10b981" fontSize="10" fontWeight="500" textAnchor="middle">Worker 2</text>
          <text x="200" y="258" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Search</text>
        </motion.g>

        {/* Shared Memory */}
        <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.6 }}>
          <rect x="280" y="300" width="140" height="60" rx="8" fill="#64748b15" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4"/>
          <text x="350" y="325" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle">Shared Memory</text>
          <text x="350" y="345" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">State • Context • Results</text>
        </motion.g>

        {/* Memory connections - dashed */}
        <AnimatedArrow path="M 80 270 L 80 330 L 280 330" color="#64748b" delay={0.65} duration={0.5} dashed />
        <AnimatedArrow path="M 200 270 L 200 310 L 280 310" color="#64748b" delay={0.7} duration={0.5} dashed />
        <AnimatedArrow path="M 350 185 L 350 300" color="#64748b" delay={0.75} duration={0.5} dashed />
        <AnimatedArrow path="M 560 185 L 560 330 L 420 330" color="#64748b" delay={0.8} duration={0.5} dashed />
      </svg>
    )
  }

  // Pipeline Diagram - RAG stages
  const renderPipelineDiagram = () => {
    return (
      <svg width="100%" height="280" viewBox="0 0 800 280" className="font-mono">
        {/* Stage 1: Ingestion */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <rect x="20" y="30" width="90" height="70" rx="8" fill="#64748b20" stroke="#64748b" strokeWidth="2"/>
          <text x="65" y="55" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">Ingestion</text>
          <text x="65" y="72" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">PDF, MD, Code</text>
          <text x="65" y="85" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">APIs, DBs</text>
        </motion.g>

        {/* Stage 2: Chunking */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <rect x="130" y="30" width="90" height="70" rx="8" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2"/>
          <text x="175" y="55" fill="#3b82f6" fontSize="10" fontWeight="600" textAnchor="middle">Chunking</text>
          <text x="175" y="72" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Hierarchical</text>
          <text x="175" y="85" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">+ Overlap</text>
        </motion.g>

        {/* Stage 3: Embedding */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <rect x="240" y="30" width="90" height="70" rx="8" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="2"/>
          <text x="285" y="55" fill="#8b5cf6" fontSize="10" fontWeight="600" textAnchor="middle">Embedding</text>
          <text x="285" y="72" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Multi-level</text>
          <text x="285" y="85" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">+ Cache</text>
        </motion.g>

        {/* Stage 4: Index */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
          <rect x="350" y="30" width="90" height="70" rx="8" fill="#10b98120" stroke="#10b981" strokeWidth="2"/>
          <text x="395" y="55" fill="#10b981" fontSize="10" fontWeight="600" textAnchor="middle">Index</text>
          <text x="395" y="72" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Vector + BM25</text>
          <text x="395" y="85" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Hybrid</text>
        </motion.g>

        {/* Stage 5: Retrieve */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
          <rect x="460" y="30" width="90" height="70" rx="8" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="2"/>
          <text x="505" y="55" fill="#f59e0b" fontSize="10" fontWeight="600" textAnchor="middle">Retrieve</text>
          <text x="505" y="72" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Query Expand</text>
          <text x="505" y="85" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Multi-hop</text>
        </motion.g>

        {/* Stage 6: Re-rank */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.5 }}>
          <rect x="570" y="30" width="90" height="70" rx="8" fill="#ef444420" stroke="#ef4444" strokeWidth="2"/>
          <text x="615" y="55" fill="#ef4444" fontSize="10" fontWeight="600" textAnchor="middle">Re-rank</text>
          <text x="615" y="72" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Cross-encoder</text>
          <text x="615" y="85" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Diversity</text>
        </motion.g>

        {/* Stage 7: Context */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.6 }}>
          <rect x="680" y="30" width="100" height="70" rx="8" fill="#06b6d420" stroke="#06b6d4" strokeWidth="2"/>
          <text x="730" y="55" fill="#06b6d4" fontSize="10" fontWeight="600" textAnchor="middle">Context</text>
          <text x="730" y="72" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Budget-aware</text>
          <text x="730" y="85" fill="rgba(255,255,255,0.35)" fontSize="8" textAnchor="middle">Assembly</text>
        </motion.g>

        {/* Animated arrows between stages */}
        <AnimatedLineArrow x1={110} y1={65} x2={130} y2={65} delay={0.1} duration={0.2} />
        <AnimatedLineArrow x1={220} y1={65} x2={240} y2={65} delay={0.2} duration={0.2} />
        <AnimatedLineArrow x1={330} y1={65} x2={350} y2={65} delay={0.3} duration={0.2} />
        <AnimatedLineArrow x1={440} y1={65} x2={460} y2={65} delay={0.4} duration={0.2} />
        <AnimatedLineArrow x1={550} y1={65} x2={570} y2={65} delay={0.5} duration={0.2} />
        <AnimatedLineArrow x1={660} y1={65} x2={680} y2={65} delay={0.6} duration={0.2} />

        {/* Additional detail boxes below */}
        <g className="details">
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <rect x="20" y="130" width="240" height="60" rx="6" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
            <text x="30" y="150" fill="#3b82f6" fontSize="10" fontWeight="500">Retrieval Timing</text>
            <text x="30" y="165" fill="rgba(255,255,255,0.4)" fontSize="9">Broad during research phase</text>
            <text x="30" y="180" fill="rgba(255,255,255,0.4)" fontSize="9">Narrow during execution phase</text>
          </motion.g>

          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            <rect x="280" y="130" width="240" height="60" rx="6" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.2)" strokeWidth="1"/>
            <text x="290" y="150" fill="#f59e0b" fontSize="10" fontWeight="500">Context Window</text>
            <text x="290" y="165" fill="rgba(255,255,255,0.4)" fontSize="9">Token budget enforcement</text>
            <text x="290" y="180" fill="rgba(255,255,255,0.4)" fontSize="9">Source attribution for every chunk</text>
          </motion.g>

          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <rect x="540" y="130" width="240" height="60" rx="6" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" strokeWidth="1"/>
            <text x="550" y="150" fill="#10b981" fontSize="10" fontWeight="500">Quality Signals</text>
            <text x="550" y="165" fill="rgba(255,255,255,0.4)" fontSize="9">Relevance scores exposed to agent</text>
            <text x="550" y="180" fill="rgba(255,255,255,0.4)" fontSize="9">Confidence-weighted reasoning</text>
          </motion.g>
        </g>

        {/* Agent alignment indicator */}
        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
          <rect x="20" y="210" width="760" height="50" rx="6" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.3)" strokeWidth="1" strokeDasharray="4,4"/>
          <text x="400" y="235" fill="#8b5cf6" fontSize="11" fontWeight="500" textAnchor="middle">↑ Aligned to Agent Planning Phases ↑</text>
          <text x="400" y="250" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Research → Plan → Execute → Validate</text>
        </motion.g>
      </svg>
    )
  }

  // Memory Layers - Detailed memory architecture
  const renderLayersDiagram = () => {
    return (
      <svg width="100%" height="320" viewBox="0 0 600 320" className="font-mono">
        {/* Working Memory - Top */}
        <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <rect x="30" y="20" width="540" height="65" rx="8" fill="#ef444415" stroke="#ef4444" strokeWidth="2"/>
          <text x="50" y="45" fill="#ef4444" fontSize="12" fontWeight="600">Working Memory</text>
          <text x="50" y="62" fill="rgba(255,255,255,0.4)" fontSize="9">Current task state • Recent tool results • Active goals</text>
          <rect x="400" y="30" width="160" height="45" rx="4" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.3)" strokeWidth="1"/>
          <text x="480" y="50" fill="#ef4444" fontSize="9" textAnchor="middle">Cleared on completion</text>
          <text x="480" y="65" fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle">High priority budget</text>
        </motion.g>

        {/* Episodic Memory */}
        <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <rect x="30" y="95" width="540" height="65" rx="8" fill="#f59e0b15" stroke="#f59e0b" strokeWidth="2"/>
          <text x="50" y="120" fill="#f59e0b" fontSize="12" fontWeight="600">Episodic Memory</text>
          <text x="50" y="137" fill="rgba(255,255,255,0.4)" fontSize="9">Past agent runs • Decisions made • Outcomes achieved</text>
          <rect x="400" y="105" width="160" height="45" rx="4" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="1"/>
          <text x="480" y="125" fill="#f59e0b" fontSize="9" textAnchor="middle">Summarized at boundaries</text>
          <text x="480" y="140" fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle">Mid priority budget</text>
        </motion.g>

        {/* Semantic Memory */}
        <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <rect x="30" y="170" width="540" height="65" rx="8" fill="#10b98115" stroke="#10b981" strokeWidth="2"/>
          <text x="50" y="195" fill="#10b981" fontSize="12" fontWeight="600">Semantic Memory</text>
          <text x="50" y="212" fill="rgba(255,255,255,0.4)" fontSize="9">Knowledge base • RAG retrieval • External facts</text>
          <rect x="400" y="180" width="160" height="45" rx="4" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" strokeWidth="1"/>
          <text x="480" y="200" fill="#10b981" fontSize="9" textAnchor="middle">Updated independently</text>
          <text x="480" y="215" fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle">On-demand retrieval</text>
        </motion.g>

        {/* Procedural Memory */}
        <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
          <rect x="30" y="245" width="540" height="65" rx="8" fill="#3b82f615" stroke="#3b82f6" strokeWidth="2"/>
          <text x="50" y="270" fill="#3b82f6" fontSize="12" fontWeight="600">Procedural Memory</text>
          <text x="50" y="287" fill="rgba(255,255,255,0.4)" fontSize="9">Cached patterns • Learned heuristics • Reusable sequences</text>
          <rect x="400" y="255" width="160" height="45" rx="4" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="1"/>
          <text x="480" y="275" fill="#3b82f6" fontSize="9" textAnchor="middle">Validated before use</text>
          <text x="480" y="290" fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle">Low priority budget</text>
        </motion.g>

        {/* Priority arrow on left */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <line x1="15" y1="50" x2="15" y2="280" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
          <polygon points="15,35 10,50 20,50" fill="rgba(255,255,255,0.3)"/>
          <text x="8" y="165" fill="rgba(255,255,255,0.3)" fontSize="8" transform="rotate(-90, 8, 165)">Token Priority</text>
        </motion.g>
      </svg>
    )
  }

  // Security/Governance Diagram
  const renderSecurityDiagram = () => {
    return (
      <svg width="100%" height="300" viewBox="0 0 750 300" className="font-mono">
        {/* External boundary */}
        <rect x="10" y="10" width="730" height="280" rx="12" fill="none" stroke="rgba(239,68,68,0.3)" strokeWidth="2" strokeDasharray="8,4"/>
        <text x="30" y="30" fill="rgba(239,68,68,0.6)" fontSize="10" fontWeight="500">Production Boundary</text>

        {/* API Gateway */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <rect x="30" y="60" width="100" height="70" rx="8" fill="#64748b20" stroke="#64748b" strokeWidth="2"/>
          <text x="80" y="85" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">API Gateway</text>
          <text x="80" y="100" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Rate Limit</text>
          <text x="80" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">TLS • Logging</text>
        </motion.g>

        {/* Auth */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <rect x="160" y="60" width="100" height="70" rx="8" fill="#ef444420" stroke="#ef4444" strokeWidth="2"/>
          <text x="210" y="85" fill="#ef4444" fontSize="10" fontWeight="600" textAnchor="middle">Auth / RBAC</text>
          <text x="210" y="100" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Identity</text>
          <text x="210" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Permissions</text>
        </motion.g>

        {/* Sandbox */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <rect x="290" y="60" width="120" height="70" rx="8" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="2"/>
          <text x="350" y="85" fill="#f59e0b" fontSize="10" fontWeight="600" textAnchor="middle">Exec Sandbox</text>
          <text x="350" y="100" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Network Isolation</text>
          <text x="350" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Resource Quotas</text>
        </motion.g>

        {/* Agent Runtime */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
          <rect x="440" y="60" width="120" height="70" rx="8" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="2"/>
          <text x="500" y="85" fill="#8b5cf6" fontSize="10" fontWeight="600" textAnchor="middle">Agent Runtime</text>
          <text x="500" y="100" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Least Privilege</text>
          <text x="500" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">No Direct Access</text>
        </motion.g>

        {/* Audit Log */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
          <rect x="590" y="60" width="100" height="70" rx="8" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2"/>
          <text x="640" y="85" fill="#3b82f6" fontSize="10" fontWeight="600" textAnchor="middle">Audit Log</text>
          <text x="640" y="100" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Immutable</text>
          <text x="640" y="112" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">All Actions</text>
        </motion.g>

        {/* Animated connections */}
        <AnimatedLineArrow x1={130} y1={95} x2={160} y2={95} delay={0.1} duration={0.2} />
        <AnimatedLineArrow x1={260} y1={95} x2={290} y2={95} delay={0.2} duration={0.2} />
        <AnimatedLineArrow x1={410} y1={95} x2={440} y2={95} delay={0.3} duration={0.2} />
        <AnimatedLineArrow x1={560} y1={95} x2={590} y2={95} delay={0.4} duration={0.2} />

        {/* Secret Store - Below */}
        <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.5 }}>
          <rect x="400" y="170" width="140" height="55" rx="8" fill="#10b98120" stroke="#10b981" strokeWidth="2"/>
          <text x="470" y="195" fill="#10b981" fontSize="10" fontWeight="600" textAnchor="middle">Secret Store</text>
          <text x="470" y="210" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Runtime Injection Only</text>
        </motion.g>

        {/* Connection from Agent to Secrets */}
        <AnimatedArrow path="M 500 130 L 500 145 L 470 145 L 470 170" color="#10b981" delay={0.55} duration={0.4} dashed />

        {/* Compliance box */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <rect x="30" y="170" width="340" height="100" rx="8" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.3)" strokeWidth="1"/>
          <text x="50" y="195" fill="#06b6d4" fontSize="11" fontWeight="600">Compliance & Governance</text>
          <text x="50" y="215" fill="rgba(255,255,255,0.4)" fontSize="9">• All data access logged with attribution</text>
          <text x="50" y="230" fill="rgba(255,255,255,0.4)" fontSize="9">• GDPR-aligned data handling</text>
          <text x="50" y="245" fill="rgba(255,255,255,0.4)" fontSize="9">• Lineage tracking for all outputs</text>
          <text x="50" y="260" fill="rgba(255,255,255,0.4)" fontSize="9">• Secret rotation without redeployment</text>
        </motion.g>
      </svg>
    )
  }

  // Tool-First Execution Diagram
  const renderToolFirstDiagram = () => {
    return (
      <svg width="100%" height="350" viewBox="0 0 750 350" className="font-mono">
        {/* LLM Controller - Central */}
        <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <rect x="280" y="20" width="180" height="70" rx="10" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="2"/>
          <text x="370" y="48" fill="#8b5cf6" fontSize="12" fontWeight="600" textAnchor="middle">LLM Controller</text>
          <text x="370" y="68" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Context Analysis • Decision</text>
          <text x="370" y="82" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Structured Tool Calls</text>
        </motion.g>

        {/* Tool Router */}
        <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <rect x="300" y="120" width="140" height="50" rx="8" fill="#64748b20" stroke="#64748b" strokeWidth="2"/>
          <text x="370" y="145" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle">Tool Router</text>
          <text x="370" y="160" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">Schema • Permissions</text>
        </motion.g>

        {/* Connection LLM to Router */}
        <AnimatedArrow path="M 370 90 L 370 120" color="#8b5cf6" delay={0.15} duration={0.3} />
        <motion.text x="380" y="108" fill="#8b5cf6" fontSize="8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>tool_call</motion.text>

        {/* Tool Categories */}
        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
          <rect x="30" y="200" width="130" height="60" rx="8" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2"/>
          <text x="95" y="225" fill="#3b82f6" fontSize="10" fontWeight="600" textAnchor="middle">File Tools</text>
          <text x="95" y="242" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Read • Write • Search</text>
          <text x="95" y="254" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Path Sandboxed</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.35 }}>
          <rect x="180" y="200" width="130" height="60" rx="8" fill="#10b98120" stroke="#10b981" strokeWidth="2"/>
          <text x="245" y="225" fill="#10b981" fontSize="10" fontWeight="600" textAnchor="middle">Search Tools</text>
          <text x="245" y="242" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Vector • BM25 • Web</text>
          <text x="245" y="254" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Ranked Results</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
          <rect x="330" y="200" width="130" height="60" rx="8" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="2"/>
          <text x="395" y="225" fill="#f59e0b" fontSize="10" fontWeight="600" textAnchor="middle">Code Tools</text>
          <text x="395" y="242" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Execute • Lint • Test</text>
          <text x="395" y="254" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Isolated Container</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.45 }}>
          <rect x="480" y="200" width="130" height="60" rx="8" fill="#ef444420" stroke="#ef4444" strokeWidth="2"/>
          <text x="545" y="225" fill="#ef4444" fontSize="10" fontWeight="600" textAnchor="middle">API Tools</text>
          <text x="545" y="242" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">External Services</text>
          <text x="545" y="254" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Retry • Circuit Break</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.5 }}>
          <rect x="630" y="200" width="100" height="60" rx="8" fill="#06b6d420" stroke="#06b6d4" strokeWidth="2"/>
          <text x="680" y="225" fill="#06b6d4" fontSize="10" fontWeight="600" textAnchor="middle">DB Tools</text>
          <text x="680" y="242" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Query • Write</text>
          <text x="680" y="254" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Transactions</text>
        </motion.g>

        {/* Connections from Router to Tools */}
        <AnimatedArrow path="M 320 170 L 95 200" delay={0.3} duration={0.3} />
        <AnimatedArrow path="M 340 170 L 245 200" delay={0.35} duration={0.3} />
        <AnimatedArrow path="M 370 170 L 395 200" delay={0.4} duration={0.3} />
        <AnimatedArrow path="M 400 170 L 545 200" delay={0.45} duration={0.3} />
        <AnimatedArrow path="M 420 170 L 680 200" delay={0.5} duration={0.3} />

        {/* Key Principles Boxes */}
        <g className="principles">
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <rect x="30" y="285" width="220" height="50" rx="6" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
            <text x="40" y="305" fill="#3b82f6" fontSize="9" fontWeight="500">Tool-First Execution</text>
            <text x="40" y="320" fill="rgba(255,255,255,0.4)" fontSize="8">LLM decides WHAT, tools execute HOW</text>
          </motion.g>

          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
            <rect x="265" y="285" width="220" height="50" rx="6" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.2)" strokeWidth="1"/>
            <text x="275" y="305" fill="#f59e0b" fontSize="9" fontWeight="500">Typed Contracts</text>
            <text x="275" y="320" fill="rgba(255,255,255,0.4)" fontSize="8">Schema validates inputs & outputs</text>
          </motion.g>

          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <rect x="500" y="285" width="220" height="50" rx="6" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" strokeWidth="1"/>
            <text x="510" y="305" fill="#10b981" fontSize="9" fontWeight="500">Observability</text>
            <text x="510" y="320" fill="rgba(255,255,255,0.4)" fontSize="8">Every call traced with latency & cost</text>
          </motion.g>
        </g>
      </svg>
    )
  }

  // Evaluation & Observability Diagram
  const renderObservabilityDiagram = () => {
    return (
      <svg width="100%" height="360" viewBox="0 0 750 360" className="font-mono">
        {/* Agent Execution - Left */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <rect x="30" y="60" width="120" height="80" rx="8" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="2"/>
          <text x="90" y="90" fill="#8b5cf6" fontSize="11" fontWeight="600" textAnchor="middle">Agent</text>
          <text x="90" y="108" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Execution</text>
          <text x="90" y="125" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Events Emitted</text>
        </motion.g>

        {/* Trace Collector */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <rect x="180" y="60" width="120" height="80" rx="8" fill="#64748b20" stroke="#64748b" strokeWidth="2"/>
          <text x="240" y="90" fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle">Trace</text>
          <text x="240" y="108" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Collector</text>
          <text x="240" y="125" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Span Aggregation</text>
        </motion.g>

        {/* Trace Store */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <rect x="330" y="60" width="120" height="80" rx="8" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2"/>
          <text x="390" y="90" fill="#3b82f6" fontSize="11" fontWeight="600" textAnchor="middle">Trace</text>
          <text x="390" y="108" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Store</text>
          <text x="390" y="125" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Indexed Persistence</text>
        </motion.g>

        {/* Analysis Engine */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
          <rect x="480" y="30" width="130" height="65" rx="8" fill="#10b98120" stroke="#10b981" strokeWidth="2"/>
          <text x="545" y="55" fill="#10b981" fontSize="11" fontWeight="600" textAnchor="middle">Analysis Engine</text>
          <text x="545" y="73" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Pattern Detection</text>
          <text x="545" y="88" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Anomaly Scoring</text>
        </motion.g>

        {/* Metrics Dashboard */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
          <rect x="630" y="30" width="100" height="65" rx="8" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="2"/>
          <text x="680" y="55" fill="#f59e0b" fontSize="11" fontWeight="600" textAnchor="middle">Metrics</text>
          <text x="680" y="73" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Dashboard</text>
          <text x="680" y="88" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Visualization</text>
        </motion.g>

        {/* Alert System */}
        <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.45 }}>
          <rect x="630" y="105" width="100" height="65" rx="8" fill="#ef444420" stroke="#ef4444" strokeWidth="2"/>
          <text x="680" y="130" fill="#ef4444" fontSize="11" fontWeight="600" textAnchor="middle">Alerts</text>
          <text x="680" y="148" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Threshold</text>
          <text x="680" y="163" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Notifications</text>
        </motion.g>

        {/* Animated connections */}
        <AnimatedLineArrow x1={150} y1={100} x2={180} y2={100} delay={0.1} duration={0.25} />
        <AnimatedLineArrow x1={300} y1={100} x2={330} y2={100} delay={0.2} duration={0.25} />
        <AnimatedArrow path="M 450 80 L 480 65" delay={0.3} duration={0.25} />
        <AnimatedLineArrow x1={610} y1={62} x2={630} y2={62} delay={0.4} duration={0.25} />
        <AnimatedArrow path="M 610 80 L 620 110 L 630 137" delay={0.45} duration={0.3} />

        {/* Evaluation Framework Section */}
        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
          <rect x="30" y="180" width="700" height="80" rx="8" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.3)" strokeWidth="1"/>
          <text x="50" y="200" fill="#06b6d4" fontSize="11" fontWeight="600">Evaluation Framework</text>
          
          {/* Three evaluation types */}
          <rect x="50" y="210" width="200" height="40" rx="4" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.2)" strokeWidth="1"/>
          <text x="150" y="230" fill="#06b6d4" fontSize="9" fontWeight="500" textAnchor="middle">Static Analysis</text>
          <text x="150" y="243" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Schema • Config • Types</text>
          
          <rect x="270" y="210" width="200" height="40" rx="4" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.2)" strokeWidth="1"/>
          <text x="370" y="230" fill="#06b6d4" fontSize="9" fontWeight="500" textAnchor="middle">Integration Tests</text>
          <text x="370" y="243" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Mocked • Deterministic</text>
          
          <rect x="490" y="210" width="220" height="40" rx="4" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.2)" strokeWidth="1"/>
          <text x="600" y="230" fill="#06b6d4" fontSize="9" fontWeight="500" textAnchor="middle">Live Agent Runs</text>
          <text x="600" y="243" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">Real LLM • Cost-Aware</text>
        </motion.g>

        {/* Cost & Metrics Box */}
        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
          <rect x="30" y="280" width="340" height="65" rx="8" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.2)" strokeWidth="1"/>
          <text x="50" y="300" fill="#f59e0b" fontSize="10" fontWeight="600">Behavioral Metrics</text>
          <text x="50" y="315" fill="rgba(255,255,255,0.4)" fontSize="9">• Success rate by task type</text>
          <text x="50" y="330" fill="rgba(255,255,255,0.4)" fontSize="9">• Latency percentiles (p50, p95, p99)</text>
          <text x="200" y="315" fill="rgba(255,255,255,0.4)" fontSize="9">• Token cost per task</text>
          <text x="200" y="330" fill="rgba(255,255,255,0.4)" fontSize="9">• Regression detection</text>
        </motion.g>

        {/* Failure Taxonomy */}
        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.65 }}>
          <rect x="390" y="280" width="340" height="65" rx="8" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.2)" strokeWidth="1"/>
          <text x="410" y="300" fill="#ef4444" fontSize="10" fontWeight="600">Failure Taxonomy</text>
          <text x="410" y="315" fill="rgba(255,255,255,0.4)" fontSize="9">• Silent failures (no error, wrong result)</text>
          <text x="410" y="330" fill="rgba(255,255,255,0.4)" fontSize="9">• Timeout / resource exhaustion</text>
          <text x="580" y="315" fill="rgba(255,255,255,0.4)" fontSize="9">• Tool schema drift</text>
          <text x="580" y="330" fill="rgba(255,255,255,0.4)" fontSize="9">• Context overflow</text>
        </motion.g>
      </svg>
    )
  }

  return (
    <div 
      className="rounded-lg overflow-x-auto"
      style={{
        backgroundColor: isMacOS ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.4)',
        border: `1px solid ${isMacOS ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {type === 'flow' && renderFlowDiagram()}
      {type === 'pipeline' && renderPipelineDiagram()}
      {type === 'hierarchy' && renderHierarchyDiagram()}
      {type === 'layers' && renderLayersDiagram()}
      {type === 'security' && renderSecurityDiagram()}
      {type === 'toolFirst' && renderToolFirstDiagram()}
      {type === 'observability' && renderObservabilityDiagram()}
    </div>
  )
}
