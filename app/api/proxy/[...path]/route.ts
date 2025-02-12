import { NextRequest, NextResponse } from 'next/server'
import https from 'https'
import axios, { AxiosError } from 'axios'

// Create HTTPS agent for SSL
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

// Create base axios instance
const api = axios.create({
  baseURL: 'http://91.107.131.43',
  timeout: 30000,
  headers: {
    'Host': 'cool.ahmadi98.ir',
    'Authorization': `Bearer 5|XbczczYRQR6qTGOQpWoY4Q2W3vCcxSQTpCVo0yyS55ec3496`
  },
  httpsAgent,
  validateStatus: (status) => status < 500
})

// Add request interceptor for logging
api.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
  return config
})

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.statusText}`)
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error(`[API Error] ${error.response.status}:`, error.response.data)
    } else if (error.request) {
      console.error('[API Error] No response:', error.message)
    } else {
      console.error('[API Error]:', error.message)
    }
    return Promise.reject(error)
  }
)

async function handler(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/')
    const method = request.method.toLowerCase()
    const url = `/api/v1/${path}`
    
    let data = null
    if (!['get', 'head', 'delete'].includes(method)) {
      data = await request.json().catch(() => null)
    }

    const response = await api.request({
      method,
      url,
      data,
      params: Object.fromEntries(request.nextUrl.searchParams)
    })

    return NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as any
    })
  } catch (error) {
    console.error('[Request Error]:', error)

    if (error instanceof AxiosError && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status
      })
    }

    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    )
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler