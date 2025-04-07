"use client";
import React, { useState, useEffect } from 'react';
import ClientOnly from './ClientOnly';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ClientOnly>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-top">
          Scroll to Top
        </button>
      )}
    </ClientOnly>
  );
}