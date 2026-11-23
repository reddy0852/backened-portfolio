import forms from '@tailwindcss/forms';

/**
 * Tailwind is used only by site version v1 (the original terminal design),
 * so it scans only that folder. The theme is copied verbatim from the original page.
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/versions/v1/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#fbbf24',
        secondary: '#22d3ee',
        neon: '#4ade80',
        electric: '#3b82f6',
        'accent-teal': '#14B8A6',
        'background-light': '#F3F4F6',
        'background-dark': '#02040a',
        'card-light': '#FFFFFF',
        'card-dark': '#0d1117',
        'border-dark': '#30363d',
        'tech-gray': '#8b949e',
        'terminal-black': '#010101',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'clay-light': '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff, inset 2px 2px 4px rgba(255,255,255,0.5)',
        'clay-dark': '8px 8px 16px #0a0a0a, -8px -8px 16px #1a1a1a, inset 1px 1px 2px rgba(255,255,255,0.05)',
        glow: '0 0 20px rgba(34, 211, 238, 0.3)',
        'glow-primary': '0 0 25px rgba(251, 191, 36, 0.3)',
        'glow-neon': '0 0 20px rgba(74, 222, 128, 0.2)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.8)',
        'cert-preview': '0 10px 40px -10px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [forms],
};
