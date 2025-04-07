'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import ClientOnly from '@/components/ClientOnly';
import Header from '@/layout/Header';
import ScrollTop from '@/components/ScrollTop';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <ClientOnly>
        <Header />
      </ClientOnly>
      <main>
        {/* محتوای اصلی */}
      </main>
      <ClientOnly>
        <ScrollTop />
      </ClientOnly>
    </>
  );
} 