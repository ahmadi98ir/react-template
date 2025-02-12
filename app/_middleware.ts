import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the protocol (http/https)
  const protocol = request.headers.get('x-forwarded-proto') || 'http'
  
  // Get hostname
  const hostname = request.headers.get('host')
  
  // Get pathname
  const pathname = request.nextUrl.pathname
  
  // Check if it's an API request
  if (pathname.startsWith('/api/')) {
    // Create new URL for the API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
    const url = new URL(pathname, apiUrl)
    
    // Copy search params
    request.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.append(key, value)
    })
    
    // Set headers
    const headers = new Headers(request.headers)
    headers.set('x-forwarded-host', hostname || '')
    headers.set('x-forwarded-proto', protocol)
    
    // Return rewrite response
    return NextResponse.rewrite(url, {
      request: {
        headers
      }
    })
  }
  
  // For non-API requests, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}