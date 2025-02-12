import { NextRequest, NextResponse } from 'next/server'
import https from 'https'

// Create a custom HTTPS agent that ignores SSL errors
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

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
        const jsonBody = await request.json()
        body = JSON.stringify(jsonBody)
      } catch {
        body = await request.text()
      }
    }

    console.log(`[Proxy] ${request.method} ${url}`)

    const fetchOptions: RequestInit = {
      method: request.method,
      headers,
      body,
      redirect: 'follow',
    }

    // Add custom HTTPS agent for server-side requests
    if (typeof window === 'undefined') {
      fetchOptions.agent = httpsAgent
    }

    const response = await fetch(url, fetchOptions)

    // Handle redirects
    if (response.redirected) {
      const newUrl = new URL(response.url)
      newUrl.protocol = request.nextUrl.protocol
      newUrl.host = request.nextUrl.host
      return NextResponse.redirect(newUrl)
    }

    // Handle response based on content type
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      const data = await response.json()
      return NextResponse.json(data, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })
    } else {
      const text = await response.text()
      return new NextResponse(text, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })
    }
  } catch (error) {
    console.error('[Proxy Error]:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    )
  }
}

export const GET = proxyRequest
export const POST = proxyRequest
export const PUT = proxyRequest
export const DELETE = proxyRequest
export const PATCH = proxyRequest