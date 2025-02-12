import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname

  // If it's an API request, handle it differently
  if (pathname.startsWith('/api/')) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
    const newUrl = new URL(pathname, apiUrl)
    
    // Copy all search parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      newUrl.searchParams.append(key, value)
    })

    return NextResponse.rewrite(newUrl)
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