import React from 'react'

async function fetchPosts() {
  try {
    // Use environment variable for API URL with a fallback
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${API_URL}/api/posts`, {
      next: { revalidate: 3600 },
      ...(process.env.NODE_ENV === 'development' && {
        agent: new (require('https').Agent)({
          rejectUnauthorized: false
        })
      })
    })
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
    <div className="container">
      <h1>Blog</h1>
      <div className="row">
        {Array.isArray(posts) && posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.excerpt}</p>
              </div>
            </div>
          </div>
        ))}
        {(!Array.isArray(posts) || posts.length === 0) && (
          <div className="col-12">
            <p>No posts found.</p>
          </div>
        )}
      </div>
    </div>
  )
}