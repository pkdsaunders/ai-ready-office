'use client';

import { useState, type ReactNode } from 'react';

export function Kicker({ children, tone = 'brand' }: { children: ReactNode; tone?: 'brand' | 'gold' | 'ink' }) {
  const tones = {
    brand: 'text-brand',
    gold: 'text-gold',
    ink: 'text-ink-soft',
  } as const;
  return (
    <div className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${tones[tone]}`}>{children}</div>
  );
}

export function Card({
  children,
  className = '',
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={`rounded-card bg-card shadow-card ring-1 ring-ink/5 ${padded ? 'p-6 sm:p-8' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function Chip({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'brand' | 'gold' | 'grass' | 'coral';
}) {
  const tones = {
    neutral: 'bg-paper-deep text-ink-soft ring-ink/10',
    brand: 'bg-brand-soft text-brand-deep ring-brand/20',
    gold: 'bg-gold-soft text-gold ring-gold/25',
    grass: 'bg-grass-soft text-grass ring-grass/25',
    coral: 'bg-coral-soft text-coral ring-coral/25',
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  size?: 'md' | 'lg' | 'sm';
  disabled?: boolean;
  className?: string;
}) {
  const variants = {
    primary:
      'bg-brand text-cream shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_20px_-8px_rgba(123,37,37,0.55)] hover:bg-brand-deep',
    secondary: 'bg-card text-ink ring-1 ring-ink/15 hover:ring-ink/30 shadow-card',
    ghost: 'text-ink-soft hover:text-ink hover:bg-ink/5',
    gold: 'bg-gold text-cream shadow-[0_8px_20px_-8px_rgba(186,106,76,0.55)] hover:brightness-105',
  } as const;
  const sizes = { sm: 'px-3.5 py-2 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' } as const;
  const cls = `inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-all duration-150 ease-sim active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} aria-disabled={disabled}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-colors ${
        copied ? 'bg-grass-soft text-grass ring-grass/30' : 'bg-card text-brand-deep ring-brand/25 hover:bg-brand-soft'
      }`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

export function PromptCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl bg-navy p-4 text-sm leading-relaxed text-cream/90 shadow-card">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-cream/50">{label}</span>
        <CopyButton text={text} />
      </div>
      <p className="font-body">{text}</p>
    </div>
  );
}

export function Callout({
  tone,
  title,
  children,
}: {
  tone: 'info' | 'warn' | 'gold';
  title: string;
  children: ReactNode;
}) {
  const tones = {
    info: { wrap: 'bg-brand-soft/60 ring-brand/15', title: 'text-brand-deep', icon: 'ℹ️' },
    warn: { wrap: 'bg-coral-soft/70 ring-coral/15', title: 'text-coral', icon: '⚠️' },
    gold: { wrap: 'bg-gold-soft/70 ring-gold/20', title: 'text-gold', icon: '★' },
  } as const;
  const t = tones[tone];
  return (
    <div className={`rounded-xl p-4 ring-1 ${t.wrap}`}>
      <div className={`mb-1 flex items-center gap-2 text-sm font-bold ${t.title}`}>
        <span aria-hidden>{t.icon}</span>
        {title}
      </div>
      <div className="text-sm leading-relaxed text-ink/80">{children}</div>
    </div>
  );
}
