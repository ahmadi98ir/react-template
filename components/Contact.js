"use client";
import React from 'react';

export const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-title">
          <h2>Contact Me</h2>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>Email</h3>
              <p>example@domain.com</p>
            </div>
            <div className="info-item">
              <h3>Phone</h3>
              <p>+1234567890</p>
            </div>
          </div>
          <div className="contact-form">
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message"></textarea>
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;