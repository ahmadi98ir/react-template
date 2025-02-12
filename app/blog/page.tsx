import React from 'react'
import { api } from '@/lib/api'
import type { Post } from '@/types'

export default async function Blog() {
  const posts = await api.getPosts().catch((): Post[] => [])
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Blog</h1>
      <div className="row">
        {posts.length > 0 ? (
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