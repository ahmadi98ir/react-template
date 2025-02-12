import { NextRequest, NextResponse } from 'next/server'
import https from 'https'
import axios from 'axios'

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

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/')
    console.log(`[API Proxy] GET /${path}`)

    const response = await api.get(`/api/v1/${path}`)
    
    return NextResponse.json(response.data, {
      status: response.status
    })
  } catch (error) {
    console.error('[API Error]:', error)
    return NextResponse.json(
      { error: 'API request failed', message: error.message },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/')
    const body = await request.json()
    console.log(`[API Proxy] POST /${path}`, body)

    const response = await api.post(`/api/v1/${path}`, body)
    
    return NextResponse.json(response.data, {
      status: response.status
    })
  } catch (error) {
    console.error('[API Error]:', error)
    return NextResponse.json(
      { error: 'API request failed', message: error.message },
      { status: 500 }
    )
  }
}