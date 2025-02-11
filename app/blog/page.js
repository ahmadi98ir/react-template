import React from 'react'

async function fetchPosts() {
  try {
    const res = await fetch('YOUR_API_URL/posts', {
      next: { revalidate: 3600 }, // Revalidate every hour
      // Add this to ignore SSL certificate issues in development
      ...(process.env.NODE_ENV === 'development' && {
        agent: new (require('https').Agent)({
          rejectUnauthorized: false
        })
      })
    })
    return res.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function Blog() {
  const posts = await fetchPosts()
  
  return (
    <div>
      <h1>Blog Page</h1>
      {/* Add your blog content here */}
    </div>
  )
}