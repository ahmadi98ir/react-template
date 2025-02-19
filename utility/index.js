"use client";
import WOW from 'wow.js';

export const wowInit = () => {
  if (typeof window !== "undefined") {
    const wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: false,
      live: true
    });
    wow.init();
  }
};