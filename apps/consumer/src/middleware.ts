import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED = [`/dashboard`, `/contracts`, `/payments`, `/documents`];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = PROTECTED.some((p) => path === p || path.startsWith(p + `/`));
  const access = req.cookies.get(`access_token`);
  if (isProtected && !access) {
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    url.searchParams.set(`next`, path);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: [`/((?!_next|favicon.ico|assets|api/.*).*)`] };
