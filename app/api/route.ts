import { NextRequest, NextResponse } from 'next/server'
import { httpClient } from '@/lib/httpClient'

async function handler(request: NextRequest) {
  try {
    // Get the path without /api prefix
    const path = request.nextUrl.pathname.replace('/api/', '')
    
    // Get query parameters
    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    
    // Get request body for POST/PUT/PATCH requests
    let body = null
    if (!['GET', 'HEAD', 'DELETE'].includes(request.method)) {
      body = await request.json().catch(() => null)
    }

    console.log(`[API] ${request.method} ${path}`, { searchParams, body })

    let response
    switch (request.method) {
      case 'GET':
        response = await httpClient.get(`/api/${path}`, { params: searchParams })
        break
      case 'POST':
        response = await httpClient.post(`/api/${path}`, body, { params: searchParams })
        break
      case 'PUT':
        response = await httpClient.put(`/api/${path}`, body, { params: searchParams })
        break
      case 'DELETE':
        response = await httpClient.delete(`/api/${path}`, { params: searchParams })
        break
      case 'PATCH':
        response = await httpClient.patch(`/api/${path}`, body, { params: searchParams })
        break
      default:
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('API Error:', error)
    
    // Handle axios errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return NextResponse.json(error.response.data, { status: error.response.status })
    } else if (error.request) {
      // The request was made but no response was received
      return NextResponse.json(
        { error: 'No response from server', message: error.message },
        { status: 503 }
      )
    } else {
      // Something happened in setting up the request that triggered an Error
      return NextResponse.json(
        { error: 'Request configuration error', message: error.message },
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