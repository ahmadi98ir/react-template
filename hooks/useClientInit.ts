import { useEffect } from 'react';
import { isBrowser } from '@/utils/environment';
import type WOW from 'wow.js';

export function useClientInit() {
  useEffect(() => {
    if (isBrowser) {
      // Dynamic import WOW.js only on client side
      import('wow.js').then((WowModule) => {
        const wow = new WowModule.default({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: false,
          live: true
        });
        wow.init();
      });

      // Other client-side initializations
      const preloader = document.getElementById("preloader");
      if (preloader) {
        setTimeout(() => {
          preloader.style.display = "none";
        }, 1000);
      }

      // Sticky nav
      const header = document.querySelector(".main-header");
      if (header) {
        window.addEventListener("scroll", () => {
          if (window.scrollY > 100) {
            header.classList.add("fixed-header");
          } else {
            header.classList.remove("fixed-header");
          }
        });
      }

      // Scroll to top
      const scrollTop = document.querySelector(".scroll-top");
      if (scrollTop) {
        window.addEventListener("scroll", () => {
          if (window.scrollY > 400) {
            scrollTop.classList.add("show");
          } else {
            scrollTop.classList.remove("show");
          }
        });

        scrollTop.addEventListener("click", (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    }
  }, []);
}