'use client';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function handleImageUpload(e) {
    const formdata = new FormData();
    formdata.append('files', e.target.files[0]);

    const response = await fetch('/api/posts/upload', { method: 'POST', body: formdata });
    const data = await response.json();
    if (response.ok) {
      setImageUrl(data.imageUrl);
    } else {
      console.error('Image upload failed:', data.error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ title, content, image: imageUrl });
  };

  // Quill toolbar options with RTL support
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': '' }, { 'align': 'right' }, { 'align': 'center' }, { 'align': 'justify' }],
      [{ 'direction': 'rtl' }], // RTL support
      ['link', 'image'],
      ['clean']
    ]
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
          modules={modules} // Set toolbar modules
        />
      </Form.Group>

      <Form.Group controlId="image" className="mt-3">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={handleImageUpload} />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
}
