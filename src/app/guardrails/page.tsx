'use client';

import { clientConfig, productConfig } from '@/config/client';
import { Button, Kicker } from '@/components/ui';

const RULES = [
  {
    icon: '🪪',
    title: 'Real customer details never go in',
    text: 'No real names, contact details, health or financial information. Practise with made-up examples — Jane Citizen is always available.',
  },
  {
    icon: '🔑',
    title: 'Passwords and logins — never',
    text: 'No passwords, PINs, bank details or security codes. Yours or anyone else’s. No exceptions.',
  },
  {
    icon: '👀',
    title: 'You check everything before it goes out',
    text: 'Every email, document and figure gets human eyes before a customer sees it. You own the output.',
  },
  {
    icon: '📜',
    title: 'Our own privacy promises still apply',
    text: 'The privacy policy and terms on our own website bind how we handle customer information — with or without AI.',
  },
  {
    icon: '🙋',
    title: 'Not sure? Ask the champion',
    text: 'If you’re unsure whether something is OK to paste in, stop and ask first. Asking is always the right move.',
  },
];

export default function GuardrailsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-16">
      <div className="no-print flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker>Safety · applies to every session and every day after</Kicker>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">The Golden Rules</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
            Print this page and put it on the wall near where the team works. It&apos;s A4-ready.
          </p>
        </div>
        <Button onClick={() => window.print()}>🖨️ Print the poster</Button>
      </div>

      {/* Poster */}
      <div className="print-page overflow-hidden rounded-3xl bg-card shadow-lift ring-1 ring-ink/10">
        <div className="bg-navy px-8 py-7 text-center text-cream">
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">
            {clientConfig.companyName} · AI Golden Rules
          </div>
          <div className="mt-2 font-display text-3xl font-semibold">Five rules. No exceptions.</div>
        </div>
        <div className="divide-y divide-line">
          {RULES.map((r, i) => (
            <div key={r.title} className="flex items-start gap-5 px-8 py-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-paper text-3xl ring-1 ring-ink/10">
                {r.icon}
              </span>
              <div>
                <div className="font-display text-xl font-semibold text-ink">
                  <span className="mr-2 text-gold">{i + 1}.</span>
                  {r.title}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between bg-paper-deep/70 px-8 py-4 text-[11px] font-semibold text-ink-faint">
          <span>Trust, but verify: if a fact matters and you didn&apos;t supply it — check it.</span>
          <span>{productConfig.productName}</span>
        </div>
      </div>

      <p className="no-print text-center text-xs text-ink-faint">
        These rules are covered in depth during Day 1 — Meet Your New Teammate.
      </p>
    </div>
  );
}
