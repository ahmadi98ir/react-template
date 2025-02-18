import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="contact-area rel z-1 pt-130 rpt-100 pb-130 rpb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="contact-content rmb-65 wow fadeInLeft delay-0-2s">
              <div className="section-title mb-25">
                <span className="sub-title mb-15">Get In Touch</span>
                <h2>Let's Work Together</h2>
              </div>
              <div className="contact-info">
                <div className="contact-info-item">
                  <div className="icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="content">
                    <span>Phone Number</span>
                    <h5><a href="tel:+123456789">+1 (234) 567-89</a></h5>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="content">
                    <span>Email Address</span>
                    <h5><a href="mailto:info@example.com">info@example.com</a></h5>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="content">
                    <span>Office Location</span>
                    <h5>123 Street Name, City, Country</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <form onSubmit={handleSubmit} className="contact-form wow fadeInRight delay-0-2s">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write Message"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb-0">
                    <button type="submit" className="theme-btn">
                      Send Message <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;