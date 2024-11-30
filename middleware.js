import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token'); // Example: check for an authentication token.

  if (!token) {
    // Redirect to login page if no token is found
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Allow the request if the user is authenticated
  return NextResponse.next();
}

// Apply middleware only to the /posts route
export const config = {
  matcher: '/posts/:path*',
};
