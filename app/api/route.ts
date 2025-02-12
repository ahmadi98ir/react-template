import { NextRequest, NextResponse } from 'next/server'

async function handleRequest(request: NextRequest, method: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
    const pathname = request.nextUrl.pathname
    const searchParams = request.nextUrl.searchParams.toString()
    const url = `${apiUrl}${pathname}${searchParams ? `?${searchParams}` : ''}`

    let body
    if (method !== 'GET' && method !== 'HEAD') {
      body = await request.text()
    }

    const headers = new Headers()
    headers.set('Content-Type', 'application/json')
    
    // Disable SSL verification on server side
    if (typeof window === 'undefined') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    })

    // Re-enable SSL verification
    if (typeof window === 'undefined') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1'
    }

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request, 'GET')
}

export async function POST(request: NextRequest) {
  return handleRequest(request, 'POST')
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, 'PUT')
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, 'DELETE')
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request, 'PATCH')
}