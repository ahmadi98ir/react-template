import { fetchApi } from '@/utils/api'
import type { Post } from '@/types'

export const api = {
  async getPosts(): Promise<Post[]> {
    return fetchApi<Post[]>('posts');
  },
  
  async getPost(id: string): Promise<Post> {
    return fetchApi<Post>(`posts/${id}`);
  },
  
  async createPost(data: Partial<Post>): Promise<Post> {
    return fetchApi<Post>('posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  async updatePost(id: string, data: Partial<Post>): Promise<Post> {
    return fetchApi<Post>(`posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  async deletePost(id: string): Promise<void> {
    return fetchApi<void>(`posts/${id}`, {
      method: 'DELETE',
    });
  },
};