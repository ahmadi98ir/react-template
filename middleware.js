import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const method = req.method?.toUpperCase();
  const token = req.cookies.get('token');

  // Protect the UI under /posts always
  if (pathname.startsWith('/posts')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
    return NextResponse.next();
  }

  // Protect write operations on /api/posts
  if (pathname.startsWith('/api/posts')) {
    if (method && method !== 'GET') {
      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/posts/:path*', '/api/posts/:path*'],
};
