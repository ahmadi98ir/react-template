import React from 'react';

const clients = [
  {
    name: 'Client 1',
    logo: '/assets/images/clients/client1.png',
    link: '#'
  },
  {
    name: 'Client 2',
    logo: '/assets/images/clients/client2.png',
    link: '#'
  },
  {
    name: 'Client 3',
    logo: '/assets/images/clients/client3.png',
    link: '#'
  },
  {
    name: 'Client 4',
    logo: '/assets/images/clients/client4.png',
    link: '#'
  },
  {
    name: 'Client 5',
    logo: '/assets/images/clients/client5.png',
    link: '#'
  },
  {
    name: 'Client 6',
    logo: '/assets/images/clients/client6.png',
    link: '#'
  }
];

const testimonials = [
  {
    name: 'John Doe',
    position: 'CEO, Tech Company',
    image: '/assets/images/testimonials/testi1.jpg',
    text: 'Excellent work! Very professional and delivered beyond expectations.'
  },
  {
    name: 'Jane Smith',
    position: 'Marketing Director',
    image: '/assets/images/testimonials/testi2.jpg',
    text: 'Great communication and outstanding results. Highly recommended!'
  },
  {
    name: 'Mike Johnson',
    position: 'Project Manager',
    image: '/assets/images/testimonials/testi3.jpg',
    text: 'Very reliable and professional service. Will definitely work together again.'
  }
];

export const Clients = () => {
  return (
    <section className="clients-area pt-130 rpt-100 pb-100 rpb-70">
      {/* Client Logos */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">Popular Clients</span>
              <h2>Trusted by Companies</h2>
            </div>
          </div>
        </div>
        <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-md-3 row-cols-2 justify-content-center">
          {clients.map((client, index) => (
            <div key={index} className="col">
              <a href={client.link} className="client-item wow fadeInUp delay-0-2s">
                <img src={client.logo} alt={client.name} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-area pt-100 rpt-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
                <span className="sub-title mb-15">Testimonials</span>
                <h2>What Clients Say</h2>
              </div>
            </div>
          </div>
          <div className="row testimonials-wrap">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="testimonial-item wow fadeInUp delay-0-2s">
                  <div className="author-speech">
                    <p>{testimonial.text}</p>
                  </div>
                  <div className="testimonial-footer">
                    <div className="author-image">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.position}</span>
                    </div>
                    <div className="quote">
                      <i className="fas fa-quote-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;