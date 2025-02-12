import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import https from 'https'

// Create HTTPS agent for SSL
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

async function handler(request: NextRequest) {
  try {
    // Get base URL and path
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://91.107.131.43'
    const path = request.nextUrl.pathname.replace('/api/', '')
    
    // Get query parameters
    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    
    // Get request body
    let body = null
    if (!['GET', 'HEAD', 'DELETE'].includes(request.method)) {
      body = await request.json().catch(() => null)
    }

    // Create axios instance for this request
    const api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Host': 'cool.ahmadi98.ir'
      },
      httpsAgent,
      validateStatus: (status) => status < 500
    })

    // Log request details
    console.log(`[API] ${request.method} ${path}`, { searchParams, body })

    // Make the request
    const response = await api.request({
      method: request.method as any,
      url: `/api/v1/${path}`,
      params: searchParams,
      data: body,
    })

    // Return response
    return NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as any
    })
  } catch (error) {
    console.error('API Error:', error)
    
    if (error.response) {
      return NextResponse.json(error.response.data, { 
        status: error.response.status 
      })
    } else if (error.request) {
      return NextResponse.json(
        { error: 'No response from server', message: error.message },
        { status: 503 }
      )
    } else {
      return NextResponse.json(
        { error: 'Request failed', message: error.message },
        { status: 500 }
      )
    }
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler