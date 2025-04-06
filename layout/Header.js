"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { isBrowser } from '@/utils/environment';

export default function Header() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;

    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header ${isFixed ? 'fixed-header' : ''}`}>
      {/* Header content */}
    </header>
  );
}