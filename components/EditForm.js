"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const EditForm = ({ post, onSubmit }) => {
  const [content, setContent] = useState(post?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ReactQuill value={content} onChange={setContent} />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditForm;