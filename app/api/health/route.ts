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
  httpsAgent,
  validateStatus: (status) => status < 500
})

export async function GET() {
  try {
    const startTime = Date.now()
    
    // Check API health
    const apiHealth = await api.get('/api/v1/health').catch(() => null)
    
    // Check deployment status
    const deployment = await api.get(
      '/api/v1/deployments/p4gksw8okokco8g0g044go44'
    ).catch(() => null)
    
    // Check server status
    const server = await api.get(
      '/api/v1/resources/f0ooskcss8wc0ws8sckskco8'
    ).catch(() => null)
    
    const responseTime = Date.now() - startTime

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      components: {
        api: apiHealth ? 'connected' : 'error',
        deployment: deployment?.data || 'pending',
        server: server?.data || 'unknown'
      }
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
        details: error.response?.data || null
      },
      { status: 500 }
    )
  }
}