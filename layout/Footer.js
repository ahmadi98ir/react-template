import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = ({ footer }) => {
  switch (footer) {
    case 1:
      return <Footer1 />;

    case 2:
      return <Footer2 />;

    default:
      return <Footer1 />;
  }
};

export default Footer;

const Footer1 = () => {
  const [date, setDate] = useState();
  useEffect(() => {
    setDate(new Date().getFullYear());
  }, []);

  return (
    <footer className="main-footer rel z-1">
      <div className="footer-top-wrap bgc-black pt-100 pb-75">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-12">
              <div className="footer-widget widget_logo wow fadeInUp delay-0-2s">
                <div className="footer-logo">
                  <Link legacyBehavior href="/">
                    <a>
                      <img src="assets/images/logos/logo.png" alt="Logo" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div dir="rtl" className="col-lg-7 col-md-7">
              <div className="footer-widget widget_nav_menu wow fadeInUp delay-0-4s">
                <h6 className="footer-title">دسترسی سریع</h6>
                <ul>
                  <li>
                    <Link legacyBehavior href="services">
                      سرویس ها
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="projects">
                      پروژه ها
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="services#pricing">
                      خدمات قابل ارائه
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="contact">
                      تماس با ما
                    </Link>
                  </li>
                </ul>
              </div>
              <div dir="ltr" className="footer-widget widget_newsletter wow fadeInUp delay-0-4s">
                <form action="#">
                  <label htmlFor="email-address">
                    <i className="far fa-envelope" />
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    placeholder="آدرس ایمیل"
                    required=""
                  />
                  <button>
                    عضویت در خبرنامه <i className="far fa-angle-right" />
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-3 col-md-5">
              <div dir="rtl" className="footer-widget widget_contact_info wow fadeInUp delay-0-6s">
                <h6 className="footer-title">نشانی</h6>
                <ul>
                  <li>
                    <i className="far fa-map-marker-alt" /> تهران، بلوار میرداماد، ابتدای خیابان شنگرف 
                  </li>
                  <li>
                    <i className="far fa-envelope" />{" "}
                    <a dir="ltr" href="mailto:support@gmail.com">info@ahmadi98.ir</a>
                  </li>
                  <li>
                    <i className="far fa-phone" />{" "}
                    <a dir="ltr" href="callto:+98 9102413207">+98 9102413207</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom pt-20 pb-5 rpt-25">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="copyright-text">
                <p>
                . این وب سایت متعلق به 
                 {" "} <Link legacyBehavior href="/">
                    مهدی احمدی
                  </Link>{" "}
                  می باشد
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-lg-end">
              <ul className="footer-bottom-nav">
                 {/*Social Icons*/}
          <div className="social-style-one">
            <a href="https://x.com/ahmadi98ir?t=uAi46M93v5CEwVLcumpZAg&s=09"target="blank">
              <i className="fab fa-twitter" />
            </a>
            <a href="https://wa.me/989102413207">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="https://www.instagram.com/ahmadi98.ir/profilecard/?igsh=YmN1YzUzbTBtZG81"target="blank">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://github.com/ahmadi98ir"target="blank">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/mahdi-ahmadi-a2454a146/"target="blank">
              <i className="fab fa-linkedin" />
            </a>
          </div>
                
              </ul>
            </div>
          </div>
          {/* Scroll Top Button */}
          <a href="#" className="scroll-top scroll-to-target d-inline-block">
            <span className="fas fa-angle-double-up" />
          </a>
        </div>
        <div className="bg-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </footer>
  );
};

export const Footer2 = () => {
  const [date, setDate] = useState();
  useEffect(() => {
    setDate(new Date().getFullYear());
  }, []);
  return (
    <footer className="main-footer footer-two pt-75 rel z-1">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-3 col-md-5">
            <div className="footer-widget widget_logo text-center text-md-start wow fadeInUp delay-0-2s">
              <div className="footer-logo">
                <Link legacyBehavior href="/">
                  <a>
                    <img src="assets/images/logos/logo.png" alt="Logo" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7">
            <div className="footer-widget widget_nav_menu me-0 wow fadeInUp delay-0-4s">
              <ul>
                <li>
                  <Link legacyBehavior href="services">
                    سرویس ها
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="projects">
                    پروژه ها
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="blog">
                    وبلاگ
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="contact">
                    تماس با من
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12">
            <hr className="mb-40" />
          </div>
          <div className="col-xl-6 col-lg-7">
            <div className="footer-widget widget_text text-center text-lg-start wow fadeInUp delay-0-2s">
              <div className="text pb-20">
                These Terms will be applied fully and affect to your use of this
                Website. By using this Website, you agreed to accept all terms
                and conditions written in here.
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="footer-widget widget_social text-center text-lg-end wow fadeInUp delay-0-4s">
              <div className="social-flow">
                <h4>Follow :</h4>
                <div className="social-style-one">
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="#">
                    <i className="fab fa-pinterest-p" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <hr className="mt-0" />
          </div>
        </div>
      </div>
      <div className="footer-bottom pt-10 pb-15">
        <div className="container">
          <div className="copyright-text text-center">
            <p>
              Copyright @{date},{" "}
              <Link legacyBehavior href="/">
                Noxfolio
              </Link>{" "}
              All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
