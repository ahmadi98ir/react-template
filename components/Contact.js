"use client";
import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form content */}
    </form>
  );
};