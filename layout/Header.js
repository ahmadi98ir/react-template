"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      {/* Header content */}
    </header>
  );
};

export default Header;