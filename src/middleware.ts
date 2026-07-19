import { NextResponse, type NextRequest } from 'next/server';
import { ACCESS_COOKIE, accessConfig, accessToken } from '@/config/access';

/**
 * Cohort gate: every page and API route requires the access cookie,
 * except the unlock screen itself. Keeps the course (and the Claude-marked
 * assessment endpoint) off the open internet.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/unlock') || pathname.startsWith('/api/unlock')) {
    return NextResponse.next();
  }

  const expected = await accessToken(accessConfig.code);
  const cookie = req.cookies.get(ACCESS_COOKIE)?.value;

  if (cookie === expected) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Locked — enter your cohort access code first.' }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = '/unlock';
  url.search = pathname !== '/' ? `?from=${encodeURIComponent(pathname)}` : '';
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals and static files (which are harmless alone)
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
