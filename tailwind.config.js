/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0c16',
          panel: '#121629',
          border: '#1f294d',
          accentX: '#00f0ff',
          accentO: '#ff007f',
          gold: '#ffd700',
        }
      },
      animation: {
        'glow-x': 'glowX 2s infinite ease-in-out',
        'glow-o': 'glowO 2s infinite ease-in-out',
        'pop-in': 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'bounce-subtle': 'bounceSubtle 1.5s infinite',
      },
      keyframes: {
        glowX: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.8)' },
        },
        glowO: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 0, 127, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 0, 127, 0.8)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [],
}
