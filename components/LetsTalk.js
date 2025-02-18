import React from 'react';
import Link from 'next/link';

const LetsTalk = () => {
  return (
    <section className="lets-talk-area pt-100 rpt-70 pb-130 rpb-100 rel z-1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="lets-talk-content wow fadeInLeft delay-0-2s">
              <div className="section-title mb-25">
                <span className="sub-title mb-15">Let's Talk</span>
                <h2>Have a Project in Mind?</h2>
              </div>
              <p>
                Ready to start your next project? Let's discuss your ideas and create something amazing together.
                I'm here to help turn your vision into reality.
              </p>
              <div className="lets-talk-buttons mt-35">
                <Link href="/contact" className="theme-btn mr-15 mb-10">
                  Start Project <i className="fas fa-arrow-right"></i>
                </Link>
                <Link href="tel:+123456789" className="theme-btn style-three mb-10">
                  <i className="fas fa-phone"></i> +1 (234) 567-89
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="lets-talk-image wow fadeInRight delay-0-2s">
              <img src="/assets/images/lets-talk/lets-talk.jpg" alt="Let's Talk" />
              <div className="experience-years">
                <span className="years">10</span>
                <h4>Years of Experience</h4>
                <span className="text">in Web Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Shape */}
      <div className="bg-lines">
        {[...Array(10)].map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </section>
  );
};

export default LetsTalk;