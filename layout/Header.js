import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const menuItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '#about' },
  { name: 'Services', link: '#services' },
  { name: 'Portfolio', link: '#projects' },
  { name: 'Blog', link: '#blog' },
  { name: 'Contact', link: '#contact' }
];

const Header = ({ type = 1, onePageMenu = false }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header header-${type} ${isSticky ? 'fixed-header' : ''}`}>
      <div className="header-upper">
        <div className="container">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link href="/">
                  <img src="/assets/images/logos/logo.png" alt="Logo" />
                </Link>
              </div>
            </div>

            <div className="nav-outer clearfix">
              {/* Mobile Nav Toggler */}
              <div 
                className="mobile-nav-toggler" 
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span className="icon">
                  <i className="fas fa-bars"></i>
                </span>
              </div>

              {/* Main Menu */}
              <nav className="main-menu navbar-expand-lg">
                <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
                  <ul className="navigation">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link 
                          href={item.link}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>

            {/* Menu Button */}
            <div className="menu-btns">
              <Link href="/contact" className="theme-btn">
                Get a Quote <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-visible' : ''}`}>
        <div 
          className="menu-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
          <i className="fas fa-times"></i>
        </div>
        <nav className="menu-box">
          <div className="nav-logo">
            <Link href="/">
              <img src="/assets/images/logos/logo.png" alt="Logo" />
            </Link>
          </div>
          <ul className="navigation">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;