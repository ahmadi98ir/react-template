import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
    
    // Disable SSL verification
    if (typeof window === 'undefined') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    }

    const response = await fetch(`${apiUrl}/api/health`)
    
    // Re-enable SSL verification
    if (typeof window === 'undefined') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1'
    }

    if (!response.ok) {
      throw new Error('API health check failed')
    }

    return NextResponse.json({ status: 'healthy', api: 'connected' })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { status: 'unhealthy', error: 'API connection failed' },
      { status: 500 }
    )
  }
}