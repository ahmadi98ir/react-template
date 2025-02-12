import { NextRequest, NextResponse } from 'next/server'
import { apiClient } from '@/lib/apiClient'

async function handler(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname.replace('/api/', '')
    const method = request.method.toLowerCase()

    let result
    switch (method) {
      case 'get':
        if (path === 'posts') {
          result = await apiClient.getPosts()
        } else if (path.startsWith('posts/')) {
          const id = path.replace('posts/', '')
          result = await apiClient.getPost(id)
        } else if (path === 'health') {
          result = await apiClient.health()
        }
        break

      case 'post':
        if (path === 'posts') {
          const data = await request.json()
          result = await apiClient.createPost(data)
        }
        break

      case 'put':
        if (path.startsWith('posts/')) {
          const id = path.replace('posts/', '')
          const data = await request.json()
          result = await apiClient.updatePost(id, data)
        }
        break

      case 'delete':
        if (path.startsWith('posts/')) {
          const id = path.replace('posts/', '')
          result = await apiClient.deletePost(id)
        }
        break

      default:
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    )
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
export const PATCH = handler