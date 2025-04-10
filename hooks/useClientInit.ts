import { useEffect, useState } from 'react';
import { isBrowser } from '@/utils/environment';
import type WOW from 'wow.js';

export function useClientInit() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!isBrowser) return;

    const handleScroll = () => {
      const mainHeader = document.querySelector(".main-header");
      if (window.scrollY > 100) {
        mainHeader?.classList.add("fixed-header");
      } else {
        mainHeader?.classList.remove("fixed-header");
      }
    };

    const handleScrollToTop = () => {
      const scrollTop = document.querySelector(".scroll-top");
      if (window.scrollY > 400) {
        scrollTop?.classList.add("show");
      } else {
        scrollTop?.classList.remove("show");
      }
    };

    const initWow = async () => {
      try {
        const WOW = (await import('wow.js')).default;
        new WOW().init();
      } catch (error) {
        console.error('Error initializing WOW.js:', error);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollToTop);
    initWow();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollToTop);
    };
  }, []);

  const scrollToTop = () => {
    if (!isClient || !isBrowser) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    isClient,
    scrollToTop
  };
}