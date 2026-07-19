/**
 * Cohort access code — the gate for this deployment.
 *
 * SERVER-ONLY: imported by middleware and API routes exclusively.
 * Never import this from a client component or the code ships in the bundle.
 *
 * Staff enter it once (case-insensitive); a cookie keeps them in for 30 days.
 * Set per client at deploy time, or override without a code change via the
 * COHORT_ACCESS_CODE env var in Vercel.
 */
export const accessConfig = {
  code: process.env.COHORT_ACCESS_CODE ?? 'SAMPLE-2026',
};

export function normaliseCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, '');
}

/** Stable token derived from the code — stored in the cookie. */
export async function accessToken(code: string): Promise<string> {
  const data = new TextEncoder().encode(`aro-gate:${normaliseCode(code)}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const ACCESS_COOKIE = 'aro_access';
