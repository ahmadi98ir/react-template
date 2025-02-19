"use client";
import { useEffect } from 'react';
import { wowInit } from '../utility';

const Preloader = () => {
  useEffect(() => {
    wowInit();
  }, []);

  return (
    <div className="preloader">
      <div className="loader">
        <div className="loader-inner"></div>
      </div>
    </div>
  );
};

export default Preloader;