import React from 'react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section id="home" className="hero-area-two pt-220 rpt-150 pb-80 rpb-50 rel z-1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="hero-content-two rmb-65">
              <span className="sub-title mb-20 wow fadeInUp delay-0-2s">Welcome to My Portfolio</span>
              <h1 className="mb-20 wow fadeInUp delay-0-4s">
                Creative <span>Design</span> & Development Solutions
              </h1>
              <p className="wow fadeInUp delay-0-6s">
                Professional web developer with strong focus on user experience and clean code.
              </p>
              <div className="hero-btns mt-35 wow fadeInUp delay-0-8s">
                <Link href="/contact" className="theme-btn mr-15 mb-10">
                  Get Started <i className="fas fa-angle-right" />
                </Link>
                <Link href="/projects" className="theme-btn style-three mb-10">
                  Explore Work <i className="fas fa-angle-right" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="hero-image-two wow fadeInRight delay-0-4s">
              <img src="/assets/images/hero/hero-two.jpg" alt="Hero" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;