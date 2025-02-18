import React from 'react';

const services = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Web Development',
    description: 'Full-stack web development with modern technologies and best practices.'
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'App Development',
    description: 'Mobile-first responsive applications with cross-platform compatibility.'
  },
  {
    icon: 'fas fa-paint-brush',
    title: 'UI/UX Design',
    description: 'User-centered design approach with focus on usability and aesthetics.'
  },
  {
    icon: 'fas fa-search',
    title: 'SEO Optimization',
    description: 'Search engine optimization to improve visibility and ranking.'
  }
];

export const Services = () => {
  return (
    <section id="services" className="services-area-two pt-130 rpt-100 pb-100 rpb-70 rel z-1">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">Services</span>
              <h2>Services I Provide</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-lg-3 col-sm-6">
              <div className="service-item style-two wow fadeInUp delay-0-2s">
                <div className="icon">
                  <i className={service.icon}></i>
                </div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;