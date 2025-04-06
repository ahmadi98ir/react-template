import { useEffect } from 'react';
import { isBrowser } from '@/utils/environment';
import type WOW from 'wow.js';

export function useClientInit() {
  useEffect(() => {
    if (!isBrowser) return;

    const initWow = async () => {
      try {
        const WOW = (await import('wow.js')).default;
        new WOW().init();
      } catch (error) {
        console.error('Error initializing WOW.js:', error);
      }
    };

    initWow();

    const handleScroll = () => {
      if (window.scrollY > 100) {
        document.querySelector(".main-header")?.classList.add("fixed-header");
      } else {
        document.querySelector(".main-header")?.classList.remove("fixed-header");
      }
    };

    const handleScrollToTop = () => {
      if (window.scrollY > 400) {
        document.querySelector(".scroll-top")?.classList.add("show");
      } else {
        document.querySelector(".scroll-top")?.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollToTop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollToTop);
    };
  }, []);
}

export function scrollTop() {
  if (!isBrowser) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}