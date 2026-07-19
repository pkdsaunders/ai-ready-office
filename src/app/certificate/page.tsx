'use client';

import { useState } from 'react';
import { TOTAL_SESSIONS } from '@/content/curriculum';
import { clientConfig, productConfig } from '@/config/client';
import { completedCount, useProgress } from '@/lib/progress';
import { Button, Chip, Kicker } from '@/components/ui';

export default function CertificatePage() {
  const { state, hydrated } = useProgress();
  const done = hydrated ? completedCount(state) : 0;
  const earned = done >= TOTAL_SESSIONS;
  const [nameOverride, setNameOverride] = useState('');
  const displayName = nameOverride || state.name || 'Your Name';
  const today = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-16">
      <div className="no-print flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker>Certificate of Completion</Kicker>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">Your certificate</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
            {earned
              ? 'All ten sessions complete — print it, frame it, enjoy it. You earned it.'
              : `Complete all ${TOTAL_SESSIONS} sessions to earn the real thing — ${done} down, ${TOTAL_SESSIONS - done} to go. Here's a preview.`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!earned && <Chip tone="gold">Preview</Chip>}
          <Button onClick={() => window.print()} disabled={!hydrated}>
            🖨️ Print{earned ? '' : ' preview'}
          </Button>
        </div>
      </div>

      <div className="no-print">
        <input
          value={nameOverride}
          onChange={(e) => setNameOverride(e.target.value)}
          placeholder={state.name ? `Name on certificate: ${state.name} (edit to change)` : 'Type the name for the certificate'}
          className="w-full max-w-sm rounded-full bg-card px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/15 outline-none placeholder:font-normal placeholder:text-ink-faint focus:ring-2 focus:ring-brand"
        />
      </div>

      {/* Certificate */}
      <div className="print-page relative overflow-hidden rounded-[28px] bg-card p-2 shadow-lift ring-1 ring-ink/10">
        <div className="relative rounded-[22px] border-2 border-gold/50 p-8 text-center sm:p-14">
          <div className="absolute inset-3 rounded-[18px] border border-ink/10" aria-hidden />
          {!earned && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-7xl font-bold uppercase tracking-widest text-ink/5"
              style={{ transform: 'rotate(-18deg)' }}
            >
              Preview
            </div>
          )}
          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy font-display text-2xl font-bold text-gold shadow-card">
              A
            </div>
            <div className="mt-5 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Certificate of Completion</div>
            <div className="mt-6 text-sm text-ink-soft">This certifies that</div>
            <div className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">{displayName}</div>
            <div className="mx-auto mt-3 h-px w-48 bg-gold/40" />
            <p className="mx-auto mt-5 max-w-md text-sm leading-[1.8] text-ink-soft">
              of <b className="text-ink">{clientConfig.companyName}</b> has completed{' '}
              <b className="text-ink">{productConfig.productName}</b> — a ten-session programme covering AI
              foundations, prompting, Claude Chat, Projects and Cowork — including all walkthroughs, quizzes and a
              capstone workflow project.
            </p>
            <div className="mt-8 flex items-end justify-between text-left">
              <div>
                <div className="h-px w-40 bg-ink/25" />
                <div className="mt-1.5 text-[11px] font-semibold text-ink-soft">Programme Director</div>
                <div className="text-[10px] text-ink-faint">{productConfig.byline.replace('A ', '')}</div>
              </div>
              <div className="text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-2xl ring-2 ring-gold/40">
                  🏆
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-ink">{today}</div>
                <div className="mt-0.5 text-[10px] text-ink-faint">{productConfig.website}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="no-print text-center text-xs text-ink-faint">
        Use your browser&apos;s print dialog and choose &quot;Save as PDF&quot; for a digital copy.
      </p>
    </div>
  );
}
