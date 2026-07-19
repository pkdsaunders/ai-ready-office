'use client';

import { motion } from 'framer-motion';
import type { WalkthroughDef } from '@/content/types';
import { Card, Chip, CopyButton } from './ui';
import { Mockup } from './mockups';

export function Walkthrough({
  def,
  checked,
  onToggle,
}: {
  def: WalkthroughDef;
  checked: boolean[];
  onToggle: (stepIndex: number) => void;
}) {
  const doneCount = checked.filter(Boolean).length;
  const allDone = doneCount === def.steps.length;

  return (
    <Card padded={false} className="overflow-hidden">
      <div className="border-b border-line bg-paper/60 p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-bold text-cream shadow-card">
              ▶
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand">
                Walkthrough · about {def.minutes} min
              </div>
              <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{def.title}</h3>
            </div>
          </div>
          <Chip tone={allDone ? 'grass' : 'neutral'}>
            {allDone ? '✓ Complete' : `${doneCount} / ${def.steps.length} steps`}
          </Chip>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{def.intro}</p>
      </div>

      <ol className="divide-y divide-line">
        {def.steps.map((step, i) => {
          const isDone = checked[i];
          return (
            <li key={i} className={`p-5 transition-colors sm:p-6 ${isDone ? 'bg-grass-soft/30' : ''}`}>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => onToggle(i)}
                  aria-label={`Mark step ${i + 1} ${isDone ? 'not done' : 'done'}`}
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-2 transition-all ${
                    isDone
                      ? 'bg-grass text-cream ring-grass'
                      : 'bg-card text-ink-soft ring-ink/20 hover:ring-brand'
                  }`}
                >
                  {isDone ? '✓' : i + 1}
                </button>
                <div className="min-w-0 flex-1">
                  <div className={`text-[15px] font-semibold ${isDone ? 'text-ink/60 line-through decoration-grass/50' : 'text-ink'}`}>
                    {step.text}
                  </div>
                  {step.detail ? (
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.detail}</p>
                  ) : null}
                  {step.copyText ? (
                    <div className="mt-3 flex items-start gap-3 rounded-xl bg-navy p-4 text-sm leading-relaxed text-cream/90">
                      <p className="flex-1">{step.copyText}</p>
                      <CopyButton text={step.copyText} />
                    </div>
                  ) : null}
                  {step.mockup ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="mt-4"
                    >
                      <Mockup id={step.mockup} />
                    </motion.div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-line bg-gold-soft/50 p-5 text-sm leading-relaxed text-ink/80 sm:px-7">
        <span className="font-bold text-gold">Notice: </span>
        {def.notice}
      </div>
    </Card>
  );
}
