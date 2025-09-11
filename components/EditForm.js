'use client';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [imageUrl, setImageUrl] = useState(initialData.image || '');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    // Server accepts 'files' (and also supports 'image' for compatibility)
    formData.append('files', file);

    const response = await fetch('/api/media/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setImageUrl(data.imageUrl);
    } else {
      console.error('Image upload failed:', data.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, image: imageUrl });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="content" className="mt-3">
        <Form.Label>Content</Form.Label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Enter content here..."
        />
      </Form.Group>

      <Form.Group controlId="image" className="mt-3">
        <Form.Label>Cover Image</Form.Label>
        <Form.Control type="file" onChange={handleImageUpload} />
        {imageUrl && <img src={imageUrl} alt="Preview" className="mt-3" width="100" />}
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
}
