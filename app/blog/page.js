import React from 'react'

async function fetchPosts() {
  try {
    // Use environment variable for API URL with a fallback
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    
    // Create fetch options
    const fetchOptions = {
      next: { revalidate: 3600 }
    }

    // Add SSL certificate handling for both development and production
    if (typeof window === 'undefined') { // Server-side
      const https = require('https')
      fetchOptions.agent = new https.Agent({
        rejectUnauthorized: false
      })
    }

    const res = await fetch(`${API_URL}/api/posts`, fetchOptions)
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function Blog() {
  const posts = await fetchPosts()
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Blog</h1>
      <div className="row">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card h-100">
                {post.image && (
                  <img 
                    src={post.image} 
                    className="card-img-top" 
                    alt={post.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.excerpt || post.content?.substring(0, 150)}...</p>
                  <a href={`/blog/${post.id}`} className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">No posts found.</div>
          </div>
        )}
      </div>
    </div>
  )
}