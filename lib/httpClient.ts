import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import https from 'https'

class HttpClient {
  private client: AxiosInstance
  private static instance: HttpClient

  private constructor() {
    // Create custom HTTPS agent
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    })

    // Initialize axios instance
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      httpsAgent,
      validateStatus: (status) => status < 500, // Don't reject if status is < 500
    })

    // Add request interceptor for logging
    this.client.interceptors.request.use((config) => {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
      return config
    })

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[API Response] ${response.status} ${response.statusText}`)
        return response
      },
      (error) => {
        console.error('[API Error]', error.message)
        return Promise.reject(error)
      }
    )
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient()
    }
    return HttpClient.instance
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }
}

export const httpClient = HttpClient.getInstance()