'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import { useWallpaper, type WallpaperId } from '@/context/WallpaperContext'

const wallpaperStyles: Record<
  WallpaperId,
  { base: string; orb1: string; orb2: string; orb3?: string; accent: string }
> = {
  'midnight-code': {
    base: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
    orb1: 'radial-gradient(circle, #58a6ff 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
    accent: '#58a6ff',
  },
  'aurora-lights': {
    base: 'linear-gradient(160deg, #0f172a 0%, #1e1b4b 35%, #064e3b 70%, #0f172a 100%)',
    orb1: 'radial-gradient(circle, #34d399 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #818cf8 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
    accent: '#34d399',
  },
  'sunset-desk': {
    base: 'linear-gradient(145deg, #1c1917 0%, #7c2d12 40%, #431407 75%, #1c1917 100%)',
    orb1: 'radial-gradient(circle, #fb923c 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #f472b6 0%, transparent 70%)',
    accent: '#fb923c',
  },
  'ocean-calm': {
    base: 'linear-gradient(160deg, #0c4a6e 0%, #164e63 45%, #0f172a 100%)',
    orb1: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)',
    accent: '#38bdf8',
  },
  'neural-glow': {
    base: 'linear-gradient(145deg, #1e1b4b 0%, #581c87 45%, #0f172a 100%)',
    orb1: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
    accent: '#a855f7',
  },
  'forest-night': {
    base: 'linear-gradient(150deg, #052e16 0%, #14532d 40%, #0f172a 100%)',
    orb1: 'radial-gradient(circle, #4ade80 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #86efac 0%, transparent 70%)',
    accent: '#4ade80',
  },
}

function FloatingOrb({
  gradient,
  className,
  animate,
}: {
  gradient: string
  className: string
  animate: { x: string[]; y: string[] }
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ background: gradient }}
      animate={animate}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function DeskSilhouette({ accent }: { accent: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-[0.07]">
      <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M0 80 Q360 40 720 70 T1440 60 L1440 120 L0 120 Z"
          fill={accent}
        />
      </svg>
    </div>
  )
}

export default function DesktopBackground() {
  const { theme } = useTheme()
  const { wallpaper } = useWallpaper()
  const isMacOS = theme === 'macos'
  const style = wallpaperStyles[wallpaper]

  const macOverride =
    isMacOS && wallpaper === 'midnight-code'
      ? {
          base: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
          orb1: 'radial-gradient(circle, #007aff 0%, transparent 70%)',
          orb2: 'radial-gradient(circle, #5856d6 0%, transparent 70%)',
          accent: '#007aff',
        }
      : style

  return (
    <div className="absolute inset-0 overflow-hidden transition-all duration-700">
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: macOverride.base }}
      />

      {/* Subtle grid for neural / tech feel */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <FloatingOrb
        gradient={macOverride.orb1}
        className="w-[520px] h-[520px] opacity-25 -top-20 -right-20"
        animate={{ x: ['0%', '8%', '0%'], y: ['0%', '12%', '0%'] }}
      />
      <FloatingOrb
        gradient={macOverride.orb2}
        className="w-[480px] h-[480px] opacity-20 bottom-10 left-1/4"
        animate={{ x: ['0%', '-10%', '0%'], y: ['0%', '-8%', '0%'] }}
      />
      {macOverride.orb3 && (
        <FloatingOrb
          gradient={macOverride.orb3}
          className="w-[400px] h-[400px] opacity-15 top-1/3 right-1/3"
          animate={{ x: ['0%', '6%', '-4%', '0%'], y: ['0%', '-6%', '4%', '0%'] }}
        />
      )}

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      <DeskSilhouette accent={macOverride.accent} />

      {/* Floating dust motes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20 pointer-events-none"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 22}%` }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.35, 0.1],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
