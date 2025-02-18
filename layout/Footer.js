import React from 'react';
import Link from 'next/link';

const Footer = ({ type = 1 }) => {
  return (
    <footer className={`main-footer footer-${type} rel z-1`}>
      <div className="container">
        <div className="footer-top pt-100 pb-70">
          <div className="row">
            {/* About Widget */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget about-widget wow fadeInUp delay-0-2s">
                <div className="footer-logo mb-30">
                  <Link href="/">
                    <img src="/assets/images/logos/logo-white.png" alt="Logo" />
                  </Link>
                </div>
                <p>
                  Professional web development services with a focus on creating 
                  modern, responsive, and user-friendly websites.
                </p>
                <div className="social-style-one pt-10">
                  <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
                  <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                  <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget quick-links wow fadeInUp delay-0-4s">
                <h4 className="footer-title">Quick Links</h4>
                <div className="row">
                  <div className="col-6">
                    <ul className="list-style-two">
                      <li><Link href="#about">About</Link></li>
                      <li><Link href="#services">Services</Link></li>
                      <li><Link href="#projects">Portfolio</Link></li>
                      <li><Link href="#contact">Contact</Link></li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="list-style-two">
                      <li><Link href="#blog">Blog</Link></li>
                      <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                      <li><Link href="/terms">Terms of Use</Link></li>
                      <li><Link href="/support">Support</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget contact-info wow fadeInUp delay-0-6s">
                <h4 className="footer-title">Get In Touch</h4>
                <ul className="list-style-two">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    123 Street Name, City, Country
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <a href="mailto:info@example.com">info@example.com</a>
                  </li>
                  <li>
                    <i className="fas fa-phone"></i>
                    <a href="tel:+123456789">+1 (234) 567-89</a>
                  </li>
                  <li>
                    <i className="fas fa-clock"></i>
                    Monday - Friday, 09:00 AM - 06:00 PM
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="copyright-text">
                <p>© {new Date().getFullYear()} All Rights Reserved.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer-bottom-menu">
                <ul>
                  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms & Conditions</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;