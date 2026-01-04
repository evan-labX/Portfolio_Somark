import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // macOS Theme
        macos: {
          bg: '#1a1a2e',
          window: '#2d2d3a',
          border: '#3d3d4a',
          accent: '#007aff',
          red: '#ff5f57',
          yellow: '#febc2e',
          green: '#28c840',
        },
        // Windows Theme
        windows: {
          bg: '#0d1117',
          window: '#161b22',
          border: '#30363d',
          accent: '#58a6ff',
        },
      },
      boxShadow: {
        'window': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'window-focused': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'typewriter': 'typewriter 0.05s steps(1) forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config

