'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PostForm from '@/components/EditForm'; // Adjust the path if necessary

export default function EditPost() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = useParams(); // Get the post ID from the URL

  // Fetch the existing post data
  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();

      if (response.ok) {
        setPost(data);
      } else {
        console.error('Failed to fetch post');
      }

      setIsLoading(false);
    }

    fetchPost();
  }, [id]);

  // Handle form submission
  const handleSubmit = async ({ title, content, image }) => {
    setIsSubmitting(true);

    // Send the PUT request to update the post
    const response = await fetch(`/api/posts`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, content, image }),
    });

    if (response.ok) {
      // Redirect to the posts list page after successful update
      router.push('/posts');
    } else {
      console.error('Failed to update post');
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm
        onSubmit={handleSubmit}
        initialData={{
          title: post.title,
          content: post.content,
          image: post.image,
        }}
      />
      {isSubmitting && <p>Submitting...</p>}
    </div>
  );
}
