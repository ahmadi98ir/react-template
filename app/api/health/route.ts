import { NextResponse } from 'next/server'
import https from 'https'
import axios from 'axios'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

const api = axios.create({
  baseURL: 'http://91.107.131.43',
  timeout: 5000,
  headers: {
    'Host': 'cool.ahmadi98.ir',
    'Authorization': `Bearer 5|XbczczYRQR6qTGOQpWoY4Q2W3vCcxSQTpCVo0yyS55ec3496`
  },
  httpsAgent
})

export async function GET() {
  try {
    // Check API health
    const apiHealth = await api.get('/api/v1/health').catch(() => null)
    
    // Check deployment status
    const deployment = await api.get(
      '/api/v1/deployments/gk04gwkok8cg04s4gscg80ko'
    ).catch(() => null)

    return NextResponse.json({
      status: 'healthy',
      api: apiHealth ? 'connected' : 'error',
      deployment: deployment?.data || 'pending'
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    )
  }
}