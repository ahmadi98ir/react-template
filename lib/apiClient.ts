import fetch from 'node-fetch'
import https from 'https'
import type { RequestInit } from 'node-fetch'

// Create HTTPS agent for SSL handling
const agent = new https.Agent({
  rejectUnauthorized: false
})

class ApiClient {
  private baseUrl: string
  private defaultHeaders: { [key: string]: string }

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api/${path.replace(/^\//, '')}`
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    }

    const fetchOptions: RequestInit = {
      ...options,
      headers,
      agent,
    }

    try {
      console.log(`[API] ${options.method || 'GET'} ${url}`)
      const response = await fetch(url, fetchOptions)

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        return response.json()
      } else {
        const text = await response.text()
        return text as unknown as T
      }
    } catch (error) {
      console.error('[API Error]:', error)
      throw error
    }
  }

  // API Methods
  async health() {
    return this.request<{ status: string }>('health')
  }

  async getPosts() {
    return this.request<any[]>('posts')
  }

  async getPost(id: string) {
    return this.request<any>(`posts/${id}`)
  }

  async createPost(data: any) {
    return this.request('posts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updatePost(id: string, data: any) {
    return this.request(`posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deletePost(id: string) {
    return this.request(`posts/${id}`, {
      method: 'DELETE',
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()