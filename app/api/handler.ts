import https from 'https'
import axios, { AxiosInstance, AxiosError } from 'axios'

class ApiHandler {
  private client: AxiosInstance
  private static instance: ApiHandler

  private constructor() {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    })

    this.client = axios.create({
      baseURL: 'http://91.107.131.43',
      timeout: 30000,
      headers: {
        'Host': 'cool.ahmadi98.ir',
        'Authorization': `Bearer 5|XbczczYRQR6qTGOQpWoY4Q2W3vCcxSQTpCVo0yyS55ec3496`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      httpsAgent,
      validateStatus: (status) => status < 500
    })

    // Add request logging
    this.client.interceptors.request.use((config) => {
      const { method, url, data } = config
      console.log(`[API Request] ${method?.toUpperCase()} ${url}`, data || '')
      return config
    })

    // Add response logging
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[API Response] ${response.status}:`, response.data)
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
  }

  public static getInstance(): ApiHandler {
    if (!ApiHandler.instance) {
      ApiHandler.instance = new ApiHandler()
    }
    return ApiHandler.instance
  }

  // Health check
  async checkHealth() {
    try {
      const startTime = Date.now()
      
      const [healthCheck, deployment] = await Promise.allSettled([
        this.client.get('/api/v1/health'),
        this.client.get('/api/v1/deployments/tggcc8s0coog0s0kwkggg0s8')
      ])

      const responseTime = Date.now() - startTime

      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        components: {
          api: healthCheck.status === 'fulfilled' ? 'connected' : 'error',
          deployment: deployment.status === 'fulfilled' ? deployment.value.data : 'pending'
        }
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Get deployment status
  async getDeploymentStatus(deploymentId: string) {
    try {
      const response = await this.client.get(`/api/v1/deployments/${deploymentId}`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Trigger new deployment
  async triggerDeployment(uuid: string, force = true) {
    try {
      const response = await this.client.post('/api/v1/deploy', null, {
        params: { uuid, force }
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Error handling
  private handleError(error: any) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message || 'API Error',
        details: error.response.data
      }
    }
    return {
      status: 500,
      message: error.message || 'Internal Server Error',
      details: null
    }
  }
}

export const apiHandler = ApiHandler.getInstance()