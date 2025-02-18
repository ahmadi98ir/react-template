import React from 'react';

export const About = () => {
  return (
    <section id="about" className="about-area rel z-1 pt-130 rpt-100 pb-70 rpb-40">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-content rmb-65">
              <div className="section-title mb-35">
                <span className="sub-title mb-15">About Me</span>
                <h2>Professional Web Developer & Designer</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="about-features">
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>Clean Code</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>Modern Design</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check"></i>
                  <span>Great Support</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-image">
              <img src="/assets/images/about/about.jpg" alt="About Me" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;