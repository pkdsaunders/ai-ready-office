'use client';

import type { ReactNode } from 'react';

/**
 * Stylised UI mockups — deliberately NOT screenshots. They show layout and
 * flow without locking the course to one UI version or exposing account data.
 */

function Frame({ children, url }: { children: ReactNode; url: string }) {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-lift ring-1 ring-ink/10">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-paper-deep/60 px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
        </span>
        <span className="mx-auto rounded-full bg-white px-4 py-0.5 text-[11px] font-medium text-ink-faint ring-1 ring-ink/10">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

function Callout({ n, className = '' }: { n: number; className?: string }) {
  return (
    <span
      className={`absolute z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[12px] font-bold text-cream shadow-[0_0_0_4px_rgba(217,119,6,0.2)] ${className}`}
    >
      {n}
    </span>
  );
}

/** New-chat layout: sidebar + greeting + message box, with numbered callouts */
export function MockupNewChat() {
  return (
    <Frame url="claude.ai">
      <div className="flex h-[300px] text-[12px] sm:h-[340px]">
        <div className="relative hidden w-44 shrink-0 flex-col gap-1 border-r border-ink/10 bg-paper/70 p-3 sm:flex">
          <div className="mb-2 flex items-center gap-2 px-1">
            <span className="h-5 w-5 rounded-md bg-[#D97757]" />
            <span className="font-semibold text-ink">Claude</span>
          </div>
          <div className="relative">
            <Callout n={1} className="-left-2 -top-2" />
            <div className="rounded-lg bg-brand-soft px-3 py-2 font-semibold text-brand-deep ring-1 ring-brand/25">
              ＋ New chat
            </div>
          </div>
          <div className="mt-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Recents</div>
          {['Reschedule email — Jane C.', 'Price change draft', 'Opening checklist'].map((t) => (
            <div key={t} className="truncate rounded-lg px-3 py-1.5 text-ink-soft hover:bg-ink/5">
              {t}
            </div>
          ))}
          <div className="mt-auto rounded-lg px-3 py-1.5 text-ink-faint">⚙︎ Settings</div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-white p-6">
          <div className="font-display text-xl text-ink/80">Good morning. What are we working on?</div>
          <div className="relative w-full max-w-md">
            <Callout n={2} className="-left-2 -top-2" />
            <div className="rounded-card bg-white p-3 ring-1 ring-ink/15 shadow-card">
              <div className="text-ink-faint">Type your message here…</div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-ink-faint">＋ Attach</span>
                <span className="relative">
                  <Callout n={3} className="-right-2 -top-2" />
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-cream">↑</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-[10px] text-ink-faint">
            <span>① New chat</span>
            <span>② Type in plain English</span>
            <span>③ Send</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/** A prompt + reply exchange, with the refine loop annotated */
export function MockupConversation() {
  return (
    <Frame url="claude.ai">
      <div className="space-y-4 bg-white p-5 text-[12px] leading-relaxed sm:p-6">
        <div className="ml-auto max-w-[85%] rounded-card rounded-tr-md bg-brand-soft/80 p-3.5 text-ink ring-1 ring-brand/15">
          I&apos;m an office administrator at a small local business. Draft a short, friendly email to a customer,
          Jane Citizen, letting her know her Thursday 2pm appointment needs to move to Friday at 9:30am…
        </div>
        <div className="flex max-w-[92%] gap-2.5">
          <span className="mt-1 h-5 w-5 shrink-0 rounded-md bg-[#D97757]" />
          <div className="rounded-card rounded-tl-md bg-paper/80 p-3.5 text-ink ring-1 ring-ink/10">
            <p className="font-semibold">Subject: A small change to your Thursday appointment</p>
            <p className="mt-2">
              Hi Jane,
              <br />
              I hope your week&apos;s going well. I&apos;m sorry to shuffle things around — we need to move your
              Thursday 2pm appointment to <b>Friday at 9:30am</b>…
            </p>
            <p className="mt-2 text-ink-soft">Would Friday morning work for you?</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pl-8 text-[11px] font-semibold text-gold">
          <span className="rounded-full bg-gold-soft px-2.5 py-1 ring-1 ring-gold/25">
            ↳ Reply to refine — “Warmer please, and add a short apology”
          </span>
        </div>
      </div>
    </Frame>
  );
}

/** Plan confirmation — stylised settings card */
export function MockupPlanCheck() {
  return (
    <Frame url="claude.ai — settings">
      <div className="bg-white p-5 text-[12px] sm:p-6">
        <div className="mx-auto max-w-sm rounded-card p-5 ring-1 ring-ink/10 shadow-card">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-ink">Your plan</span>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold text-brand-deep ring-1 ring-brand/25">
              TEAM
            </span>
          </div>
          <div className="mt-4 space-y-2.5">
            {[
              'Work seat managed by your organisation',
              'Business content not used to train models by default',
              'Projects, file uploads and Cowork included',
            ].map((t) => (
              <div key={t} className="flex items-start gap-2 text-ink-soft">
                <span className="mt-0.5 text-grass">✓</span>
                {t}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-paper px-3 py-2 text-[11px] text-ink-faint">
            Champion confirms plan details before Day 1 — you just need your login to work.
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function Mockup({ id }: { id: 'newchat' | 'conversation' | 'plancheck' }) {
  if (id === 'newchat') return <MockupNewChat />;
  if (id === 'conversation') return <MockupConversation />;
  return <MockupPlanCheck />;
}
