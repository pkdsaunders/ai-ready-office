import type { Config } from 'tailwindcss';

/**
 * Colour + type system mirrors the Smash It Marketing brand tokens
 * (smashitmarketing.com HOP §3 — canvas/ink/terracotta/oxblood/sage).
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EEE0CC', // canvas
        'paper-deep': '#E4D3BA',
        card: '#F4E7D3', // surface — tonal lift above canvas
        'card-strong': '#F9F1E4', // elevated surface
        field: '#F8EFE0',
        ink: '#241C17',
        'ink-soft': '#5C5147',
        'ink-faint': '#A99C8B',
        cream: '#F5EBDB', // on-impact text
        navy: '#7B2525', // impact / oxblood — dark zones + CTAs
        'navy-2': '#641E1E',
        brand: '#7B2525', // primary action = impact oxblood
        'brand-deep': '#641E1E',
        'brand-soft': '#EFD9D9',
        gold: '#BA6A4C', // terracotta accent — points, badges, kickers
        'gold-soft': '#F4E0D3',
        grass: '#607456', // sage — success
        'grass-soft': '#E7EBE0',
        coral: '#A0402F', // warnings — burnt terracotta
        'coral-soft': '#F2DCD2',
        line: '#DCCBB2', // hairline
      },
      fontFamily: {
        display: ['var(--font-newsreader)', 'Georgia', 'serif'],
        body: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(36,28,23,0.04), 0 8px 20px -10px rgba(36,28,23,0.10)',
        lift: '0 2px 4px rgba(36,28,23,0.05), 0 16px 36px -14px rgba(36,28,23,0.18)',
        ring: 'inset 0 0 0 1px rgba(36,28,23,0.06)',
      },
      borderRadius: {
        card: '12px',
        control: '8px',
      },
      transitionTimingFunction: {
        sim: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
