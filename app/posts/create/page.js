'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/components/PostForm'; // Adjust the path if necessary

export default function NewPost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async ({ title, content, image }) => {
    setIsSubmitting(true);

    // Sending the POST request to the backend
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, image }),
    });

    if (response.ok) {
      // Redirect to the posts list page after successful creation
      router.push('/posts');
    } else {
      // Handle errors (e.g., show an error message)
      console.error('Failed to create post');
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <PostForm onSubmit={handleSubmit} />
      {isSubmitting && <p>Submitting...</p>}
    </div>
  );
}
