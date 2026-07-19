'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { clientConfig, productConfig } from '@/config/client';

function UnlockForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/unlock/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'That code did not work — try again.');
      } else {
        router.replace(params.get('from') || '/');
        router.refresh();
      }
    } catch {
      setError('Could not check the code — check your connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-4">
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="e.g. ACME-2026"
        autoFocus
        autoComplete="off"
        className="w-full rounded-control bg-field px-5 py-3.5 text-center font-mono text-lg font-bold uppercase tracking-[0.2em] text-ink ring-1 ring-ink/15 outline-none placeholder:font-body placeholder:text-sm placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-ink-faint focus:ring-2 focus:ring-brand"
      />
      <button
        type="submit"
        disabled={busy || !code.trim()}
        className="w-full rounded-control bg-brand px-6 py-3.5 text-base font-bold text-cream shadow-[0_8px_20px_-8px_rgba(123,37,37,0.55)] transition-all duration-150 ease-sim hover:bg-brand-deep active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40"
      >
        {busy ? 'Checking…' : 'Open the course →'}
      </button>
      {error && (
        <p className="rounded-card bg-coral-soft/70 p-3.5 text-sm leading-relaxed text-ink/80 ring-1 ring-coral/20">
          {error}
        </p>
      )}
    </form>
  );
}

export default function UnlockPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <div className="w-full rounded-card bg-card p-8 shadow-lift sm:p-10">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-card bg-navy font-display text-xl font-bold text-gold shadow-card">
          A
        </span>
        <h1 className="mt-5 font-display text-3xl font-semibold text-ink">This cohort is private</h1>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
          Enter the access code your champion shared — you&apos;ll only need it once on this computer.
        </p>
        <Suspense fallback={null}>
          <UnlockForm />
        </Suspense>
      </div>
      <p className="mt-6 text-xs text-ink-faint">
        {productConfig.productName} · {clientConfig.companyName} · {productConfig.byline}
      </p>
    </div>
  );
}
