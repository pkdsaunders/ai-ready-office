/**
 * Per-client deployment config — the ONLY file you edit when deploying
 * for a new client company. Everything (header, examples, certificates,
 * champion emails) reads from here.
 */
export const clientConfig = {
  /** Client company name — appears in header chip, examples and certificates */
  companyName: 'Sample & Co',
  /** Broad industry flavour used to tint examples: 'accounting' | 'dental' | 'trades' | 'services' | 'generic' */
  industry: 'generic' as 'accounting' | 'dental' | 'trades' | 'services' | 'generic',
  /** The internal champion who runs the daily sessions and receives results */
  championName: 'Your Champion',
  championEmail: 'champion@example.com',
  /** Cohort label shown on the dashboard, e.g. "August 2026 cohort" */
  cohortLabel: 'Demo cohort',
  /** Claude plan the company is on — confirmed during setup. Baseline: 'team' */
  claudePlan: 'team' as 'team' | 'pro' | 'enterprise' | 'unconfirmed',
};

export const productConfig = {
  productName: 'The AI-Ready Office',
  tagline: 'A two-week Claude training programme for your admin team',
  byline: 'A Smash It Marketing programme',
  website: 'smashitmarketing.com',
  supportEmail: 'paul@smashitmarketing.com',
  version: '0.1.0 — Session 1 preview build',
};
