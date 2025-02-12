import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the protocol (http/https)
  const protocol = request.headers.get('x-forwarded-proto') || 'http'
  
  // Get hostname
  const hostname = request.headers.get('host')
  
  // Get pathname
  const pathname = request.nextUrl.pathname

  // Add custom headers for all responses
  const headers = new Headers({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  })

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { headers })
  }

  // For API requests, ensure proper headers
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    
    // Copy all headers
    headers.forEach((value, key) => {
      response.headers.set(key, value)
    })

    // Set security headers
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    
    return response
  }

  // For all other requests, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}