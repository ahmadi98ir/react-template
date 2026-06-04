"use client";

import { noxfolioUtilits } from "@/utility";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import MultiMenu, { OnePageMenu } from "./Menu";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Header = ({ header, onePageMenu }) => {
  switch (header) {
    case 2:
      return <Header2 onePageMenu={onePageMenu} />;
    default:
      return <Header1 onePageMenu={onePageMenu} />;
  }
};
export default Header;

const Header1 = ({ onePageMenu }) => {
  const locale = useLocale();

  useEffect(() => {
    noxfolioUtilits.stickyNav();
  }, []);

  const toggleSidebar = () => {
    document.querySelector("body").classList.add("side-content-visible");
  };

  const [toggle, setToggle] = useState(false);

  return (
    <header className="main-header menu-absolute">
      <div className="header-upper">
        <div className="container container-1620 clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link legacyBehavior href={`/${locale}`}>
                  <a>
                    <img
                      src="/assets/images/logos/logo.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix mx-auto">
              <nav className="main-menu navbar-expand-lg">
                <div className="navbar-header">
                  <div className="mobile-logo my-15">
                    <Link legacyBehavior href={`/${locale}`}>
                      <a>
                        <img
                          src="/assets/images/logos/logo.png"
                          alt="Logo"
                          title="Logo"
                        />
                      </a>
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="navbar-toggle me-4"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse"
                    onClick={() => setToggle(!toggle)}
                  >
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div
                  className={`navbar-collapse collapse clearfix ${
                    toggle ? "show" : ""
                  }`}
                >
                  {onePageMenu ? <OnePageMenu /> : <MultiMenu />}
                </div>
              </nav>
            </div>
            <div className="menu-btns d-none d-lg-flex align-items-center gap-2">
              <LanguageSwitcher />
              <div className="menu-sidebar">
                <button onClick={() => toggleSidebar()}>
                  <img
                    src="/assets/images/shape/sidebar-tottler.svg"
                    alt="Toggler"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Header2 = ({ onePageMenu }) => {
  const locale = useLocale();

  useEffect(() => {
    noxfolioUtilits.stickyNav();
  }, []);

  const toggleSidebar = () => {
    document.querySelector("body").classList.add("side-content-visible");
  };

  const [toggle, setToggle] = useState(false);

  return (
    <header className="main-header header-two menu-absolute">
      <div className="header-upper">
        <div className="container container-1620 clearfix">
          <div className="header-inner rel d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link legacyBehavior href={`/${locale}`}>
                  <a>
                    <img
                      src="/assets/images/logos/logo.png"
                      alt="Logo"
                      title="Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix mx-auto">
              <nav className="main-menu navbar-expand-lg">
                <div className="navbar-header">
                  <div className="mobile-logo my-15">
                    <Link legacyBehavior href={`/${locale}`}>
                      <a>
                        <img
                          src="/assets/images/logos/logo.png"
                          alt="Logo"
                          title="Logo"
                        />
                      </a>
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="navbar-toggle me-4"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse"
                    onClick={() => setToggle(!toggle)}
                  >
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div
                  className={`navbar-collapse collapse clearfix ${
                    toggle ? "show" : ""
                  }`}
                >
                  {onePageMenu ? (
                    <ul className="navigation onepage clearfix">
                      <li><a href="#home">Home</a></li>
                      <li><a href="#about">About</a></li>
                      <li><a href="#resume">Resume</a></li>
                      <li><a href="#services">Services</a></li>
                      <li><a href="#skills">Skills</a></li>
                      <li><a href="#projects">Projects</a></li>
                      <li><a href="#blog">Blog</a></li>
                      <li><a href="#contact">Contact</a></li>
                    </ul>
                  ) : (
                    <MultiMenu />
                  )}
                </div>
              </nav>
            </div>
            <div className="menu-btns d-flex align-items-center gap-2">
              <LanguageSwitcher />
              <div className="menu-sidebar d-none d-lg-block">
                <button onClick={() => toggleSidebar()}>
                  <img
                    src="/assets/images/shape/sidebar-tottler-white.svg"
                    alt="Toggler"
                  />
                </button>
              </div>
              <Link legacyBehavior href={`/${locale}/contact`}>
                <a className="theme-btn">Let&apos;s talk</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
