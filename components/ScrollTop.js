"use client";
import React, { useState, useEffect } from 'react';
import ClientOnly from './ClientOnly';
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