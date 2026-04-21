import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
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
        card: '0 8px 24px rgba(0, 0, 0, 0.06)',
        elevated: '0 18px 36px rgba(0, 0, 0, 0.12)'
      },
      borderRadius: {
        card: '1.125rem'
      },
      fontFamily: {
        display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Segoe UI"', 'Inter', 'system-ui', 'sans-serif']
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

export default config;
