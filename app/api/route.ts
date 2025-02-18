import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import https from 'https'

// Create HTTPS agent for SSL
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

export async function GET(request: NextRequest) {
  try {
    // Get base URL and path
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://91.107.131.43'
    const path = request.nextUrl.pathname.replace('/api/', '')
    
    // Get query parameters
    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    
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
    console.log(`[API] GET ${path}`, { searchParams })

    // Make the request
    const response = await api.get(`/api/v1/${path}`, { params: searchParams })
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

export async function POST(request: NextRequest) {
  try {
    // Get base URL and path
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://91.107.131.43'
    const path = request.nextUrl.pathname.replace('/api/', '')
    
    // Get request body
    const body = await request.json()
    
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
    console.log(`[API] POST ${path}`, { body })

    // Make the request
    const response = await api.post(`/api/v1/${path}`, body)

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

export async function PUT(request: NextRequest) {
  try {
    // Get base URL and path
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://91.107.131.43'
    const path = request.nextUrl.pathname.replace('/api/', '')
    
    // Get request body
    const body = await request.json()
    
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
    console.log(`[API] PUT ${path}`, { body })

    // Make the request
    const response = await api.put(`/api/v1/${path}`, body)

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

export async function DELETE(request: NextRequest) {
  try {
    // Get base URL and path
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://91.107.131.43'
    const path = request.nextUrl.pathname.replace('/api/', '')
    
    // Get query parameters
    const searchParams = Object.fromEntries(request.nextUrl.searchParams)
    
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
    console.log(`[API] DELETE ${path}`, { searchParams })

    // Make the request
    const response = await api.delete(`/api/v1/${path}`, { params: searchParams })

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

export async function PATCH(request: NextRequest) {
  try {
    // Get base URL and path
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://91.107.131.43'
    const path = request.nextUrl.pathname.replace('/api/', '')
    
    // Get request body
    const body = await request.json()
    
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
    console.log(`[API] PATCH ${path}`, { body })

    // Make the request
    const response = await api.patch(`/api/v1/${path}`, body)

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
