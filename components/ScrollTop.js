"use client";
import React, { useState, useEffect } from 'react';
import { isBrowser } from '@/utils/environment';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;

    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (!isBrowser) return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className="scroll-top show"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <i className="fas fa-angle-up"></i>
    </button>
  );
}