'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AssessmentDef, AssessmentResult } from '@/content/types';
import type { StoredAssessment } from '@/lib/progress';
import { Button, Card, Chip, Kicker } from './ui';

export function SubmitPanel({
  def,
  stored,
  onResult,
}: {
  def: AssessmentDef;
  stored?: StoredAssessment;
  onResult: (r: AssessmentResult) => void;
}) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const result = stored?.last;

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/assess/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseId: def.id, submission: text }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Something went wrong — try again.');
      } else {
        onResult(data.result as AssessmentResult);
      }
    } catch {
      setError('Could not reach the assessor — check your connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card padded={false} className="overflow-hidden ring-1 ring-gold/25">
      <div className="border-b border-line bg-gold-soft/50 p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-card bg-gold text-sm font-bold text-cream shadow-card">
              ✍
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
                Marked exercise · Claude assesses this
              </div>
              <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{def.title}</h3>
            </div>
          </div>
          <Chip tone={stored?.passed ? 'grass' : stored && stored.attempts > 0 ? 'gold' : 'neutral'}>
            {stored?.passed
              ? `✓ Passed · best ${stored.bestScore}%`
              : stored && stored.attempts > 0
                ? `Best ${stored.bestScore}% · keep going`
                : 'Not submitted yet'}
          </Chip>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{def.brief}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {def.lookingFor.map((l) => (
            <span key={l} className="rounded-full bg-card px-2.5 py-1 text-[11px] font-medium text-ink-soft ring-1 ring-ink/8">
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-6 sm:p-7">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          placeholder={def.placeholder}
          className="w-full rounded-card bg-field p-4 text-sm leading-relaxed text-ink ring-1 ring-ink/15 outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-brand"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-coral-soft/70 px-3 py-1 text-[11px] font-semibold text-coral ring-1 ring-coral/15">
            Made-up examples only — never real customer details
          </span>
          <Button onClick={submit} disabled={busy || text.trim().length < def.minChars}>
            {busy ? 'Claude is reading your work…' : result ? 'Resubmit for a better score' : 'Submit for assessment'}
          </Button>
        </div>
        {text.trim().length > 0 && text.trim().length < def.minChars && (
          <p className="text-right text-xs text-ink-faint">Keep going — a little more detail before you can submit.</p>
        )}
        {error && (
          <div className="rounded-card bg-coral-soft/70 p-4 text-sm text-ink/80 ring-1 ring-coral/20">{error}</div>
        )}

        {result && !busy && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 rounded-card bg-paper/70 p-5 ring-1 ring-ink/8"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold text-cream shadow-card ${
                  result.pass ? 'bg-grass' : 'bg-gold'
                }`}
              >
                {result.score}
              </div>
              <div>
                <div className="font-display text-lg font-semibold text-ink">
                  {result.pass ? 'That’s a pass — nice work.' : 'Close — one more round.'}
                </div>
                <div className="mt-1 h-2 w-44 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-sim ${result.pass ? 'bg-grass' : 'bg-gold'}`}
                    style={{ width: `${Math.min(100, result.score)}%` }}
                  />
                </div>
              </div>
            </div>

            {result.safetyFlag && (
              <div className="rounded-card bg-coral-soft/80 p-4 text-sm leading-relaxed text-ink/85 ring-1 ring-coral/25">
                <span className="font-bold text-coral">Golden Rules check: </span>
                {result.safetyNote || 'Parts of this look like real personal details — swap them for made-up ones and resubmit.'}
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              {result.strengths.map((s, i) => (
                <div key={i} className="rounded-card bg-grass-soft/50 p-4 text-sm leading-relaxed text-ink/85 ring-1 ring-grass/15">
                  <span className="font-bold text-grass">✓ </span>
                  {s}
                </div>
              ))}
            </div>
            <div className="rounded-card bg-gold-soft/60 p-4 text-sm leading-relaxed text-ink/85 ring-1 ring-gold/20">
              <span className="font-bold text-gold">Try next: </span>
              {result.improvement}
            </div>
            <p className="text-xs text-ink-faint">
              Marked by Claude against the exercise brief · attempts: {stored?.attempts ?? 1} · your best score counts.
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  );
}
