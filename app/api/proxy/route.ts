import { NextRequest, NextResponse } from 'next/server'

async function proxyRequest(request: NextRequest) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
    const path = request.nextUrl.pathname.replace('/api/proxy', '')
    const url = `${apiUrl}/api${path}`
    
    const headers = new Headers(request.headers)
    headers.set('host', new URL(apiUrl).host)
    
    let body: BodyInit | null = null
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      try {
        // Try to parse and stringify to ensure valid JSON
        const jsonBody = await request.json()
        body = JSON.stringify(jsonBody)
      } catch (e) {
        // If parsing fails, use raw body
        body = await request.text()
      }
    }

    // Disable SSL verification on server side
    if (typeof window === 'undefined') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    }

    console.log(`Proxying ${request.method} request to: ${url}`)

    const response = await fetch(url, {
      method: request.method,
      headers,
      body,
      redirect: 'follow',
    })

    // Re-enable SSL verification
    if (typeof window === 'undefined') {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1'
    }

    // Handle redirects manually
    if (response.redirected) {
      const newUrl = new URL(response.url)
      newUrl.protocol = request.nextUrl.protocol
      newUrl.host = request.nextUrl.host
      return NextResponse.redirect(newUrl)
    }

    let responseData
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      responseData = await response.json()
      return NextResponse.json(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })
    } else {
      responseData = await response.text()
      return new NextResponse(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })
    }
  } catch (error) {
    console.error('Proxy Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request)
}

export async function POST(request: NextRequest) {
  return proxyRequest(request)
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request)
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request)
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request)
}