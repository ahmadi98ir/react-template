import { NextRequest, NextResponse } from 'next/server'

// Disable SSL verification for development
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function GET(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
    const path = request.nextUrl.pathname.replace('/api/', '')
    
    const fetchOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(`${apiUrl}/${path}`, fetchOptions)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Proxy Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
    const path = request.nextUrl.pathname.replace('/api/', '')
    const body = await request.json()

    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }

    const response = await fetch(`${apiUrl}/${path}`, fetchOptions)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Proxy Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}