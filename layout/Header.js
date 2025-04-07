"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { isBrowser } from '@/utils/environment';
import ClientOnly from '../components/ClientOnly';

export default function Header() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ClientOnly>
      <header className={`header ${isFixed ? 'fixed' : ''}`}>
        {/* Header content */}
      </header>
    </ClientOnly>
  );
}