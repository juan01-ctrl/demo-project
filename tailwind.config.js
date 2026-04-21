/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        panel: 'var(--color-panel)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        accentsoft: 'var(--color-accent-soft)'
      },
      boxShadow: {
        card: '0 8px 30px rgba(17, 24, 39, 0.06)',
        elevated: '0 22px 45px rgba(17, 24, 39, 0.12)'
      },
      borderRadius: {
        card: '1.125rem'
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', '"Avenir Next"', 'system-ui', 'sans-serif']
      },
      animation: {
        reveal: 'reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) both'
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};
