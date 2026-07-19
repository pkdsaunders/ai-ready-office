import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F3EC',
        'paper-deep': '#EFEAE0',
        card: '#FFFDF8',
        ink: '#142033',
        'ink-soft': '#45566E',
        'ink-faint': '#8A97AB',
        navy: '#0E1A2E',
        'navy-2': '#16263F',
        brand: '#2563EB',
        'brand-deep': '#1D4ED8',
        'brand-soft': '#E3ECFC',
        gold: '#D97706',
        'gold-soft': '#FBEED7',
        grass: '#15803D',
        'grass-soft': '#DCF3E4',
        coral: '#C2410C',
        'coral-soft': '#FCE9DE',
        line: '#E4DDCE',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,32,51,0.05), 0 8px 24px -8px rgba(20,32,51,0.12)',
        lift: '0 2px 4px rgba(20,32,51,0.06), 0 16px 40px -12px rgba(20,32,51,0.22)',
        ring: 'inset 0 0 0 1px rgba(20,32,51,0.06)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
export default config;
