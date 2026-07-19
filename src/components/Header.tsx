'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clientConfig } from '@/config/client';
import { totalPoints, useProgress } from '@/lib/progress';

const NAV = [
  { href: '/', label: 'Course map' },
  { href: '/guardrails/', label: 'Golden Rules' },
  { href: '/champion/', label: 'Champion' },
  { href: '/certificate/', label: 'Certificate' },
];

export function Header() {
  const { state, hydrated } = useProgress();
  const pathname = usePathname();
  const pts = hydrated ? totalPoints(state) : 0;

  return (
    <header className="no-print border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy font-display text-sm font-bold text-gold shadow-card">
            A
          </span>
          <span className="hidden font-display text-lg font-semibold tracking-tight text-ink sm:block">
            The AI-Ready Office
          </span>
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {NAV.map((n) => {
            const active = n.href === '/' ? pathname === '/' : pathname?.startsWith(n.href.replace(/\/$/, ''));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  active ? 'bg-navy text-cream' : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-bold text-gold ring-1 ring-gold/25">
            ★ {pts} pts
          </span>
          <span className="rounded-full bg-paper-deep px-3 py-1 text-xs font-semibold text-ink-soft ring-1 ring-ink/10">
            {clientConfig.companyName}
          </span>
        </div>
      </div>
    </header>
  );
}
