interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number;
  };
}

async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const defaultOptions: FetchOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
    ...options,
  };

  try {
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer 
      ? process.env.NEXT_PUBLIC_API_URL || 'https://cool.ahmadi98.ir'
      : '';
    
    if (isServer) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    const res = await fetch(`${baseUrl}/api/${endpoint}`, defaultOptions);
    
    if (isServer) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    }

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export const api = {
  async getPosts() {
    return fetchAPI('posts');
  },
  
  async getPost(id: string) {
    return fetchAPI(`posts/${id}`);
  },
  
  async createPost(data: any) {
    return fetchAPI('posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  async updatePost(id: string, data: any) {
    return fetchAPI(`posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  async deletePost(id: string) {
    return fetchAPI(`posts/${id}`, {
      method: 'DELETE',
    });
  },
};