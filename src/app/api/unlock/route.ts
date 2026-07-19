import { NextResponse } from 'next/server';
import { ACCESS_COOKIE, accessConfig, accessToken, normaliseCode } from '@/config/access';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const attempt = normaliseCode(body.code ?? '');
  if (!attempt || attempt !== normaliseCode(accessConfig.code)) {
    return NextResponse.json(
      { error: "That code doesn't match this cohort — check with your champion." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, await accessToken(accessConfig.code), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // the fortnight plus plenty of slack
  });
  return res;
}
