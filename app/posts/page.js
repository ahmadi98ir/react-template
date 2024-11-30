'use client';
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the API
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  // Handle delete post
  const handleDelete = async (id) => {
    const response = await fetch('/api/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setPosts(posts.filter(post => post.id !== id)); // Remove the deleted post from the state
    } else {
      console.error('Failed to delete the post');
    }
  };

  return (
    <div>
      <h1>Post Management</h1>
      <Link href="/posts/create">
        <Button variant="primary" className="mb-3">Create New Post</Button>
      </Link>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan="4">No posts available</td>
            </tr>
          ) : (
            posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}</td>
                <td>
                  <Link href={`/posts/edit/${post.id}`}>
                    <Button variant="warning" className="me-2">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(post.id)}>Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
