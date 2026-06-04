"use client";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="contact-area pt-95 pb-130 rpt-70 rpb-100 rel z-1"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="contact-content-part pt-5 rpt-0 rmb-55 wow fadeInUp delay-0-2s">
              <div className="section-title mb-40">
                <span className="sub-title mb-15">{t("subTitle")}</span>
                <h2>{t("title")}</h2>
                <p>{t("description")}</p>
              </div>
              <ul className="list-style-two">
                <li>{t("feature1")}</li>
                <li>{t("feature2")}</li>
                <li>{t("feature3")}</li>
                <li>{t("feature4")}</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="contact-form contact-form-wrap form-style-one wow fadeInUp delay-0-4s">
              <form
                id="contactForm"
                className="contactForm"
                name="contactForm"
                action="/api/contacts"
                method="post"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">{t("fullName")}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        defaultValue=""
                        placeholder={t("namePlaceholder")}
                        required=""
                      />
                      <label htmlFor="name" className="for-icon">
                        <i className="far fa-user" />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">{t("email")}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        defaultValue=""
                        placeholder={t("emailPlaceholder")}
                        required=""
                      />
                      <label htmlFor="email" className="for-icon">
                        <i className="far fa-envelope" />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone_number">{t("phone")}</label>
                      <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        className="form-control"
                        defaultValue=""
                        placeholder={t("phonePlaceholder")}
                        required=""
                      />
                      <label htmlFor="phone_number" className="for-icon">
                        <i className="far fa-phone" />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="subject">{t("subject")}</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                        defaultValue=""
                        placeholder={t("subjectPlaceholder")}
                        required=""
                      />
                      <label htmlFor="subject" className="for-icon">
                        <i className="far fa-text" />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="message">{t("message")}</label>
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        rows={4}
                        placeholder={t("messagePlaceholder")}
                        required=""
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-0">
                      <button type="submit" className="theme-btn">
                        {t("submit")} <i className="far fa-angle-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-lines">
        <span /><span /><span /><span /><span />
        <span /><span /><span /><span /><span />
      </div>
    </section>
  );
};
export default Contact;

export const Contact2 = () => {
  return (
    <section id="contact" className="contact-area py-115 rpy-100 rel z-1">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-7 col-lg-8">
            <div className="contact-two-content pt-5 rpt-0 rmb-55 wow fadeInUp delay-0-2s">
              <div className="section-title mb-25">
                <span className="sub-title mb-15">
                  <i className="flaticon-asterisk-1" /> let&apos;s work together
                </span>
                <h2>Let&apos;s Work Together</h2>
              </div>
              <div className="row align-items-center">
                <div className="col-sm-8">
                  <h3>I&apos;m available at</h3>
                  <h5>
                    <i className="far fa-envelope" /> info@ahmadi98.ir
                  </h5>
                  <h5>
                    <i className="far fa-phone" /> +98 910 241 3207
                  </h5>
                </div>
                <div className="col-sm-4">
                  <div className="arrow">
                    <i className="fal fa-arrow-right" />
                  </div>
                </div>
              </div>
              <div className="social-flow">
                <h4>Follow:</h4>
                <div className="social-style-one">
                  <a href="https://x.com/ahmadi98ir" target="_blank" rel="noreferrer">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="https://wa.me/989102413207">
                    <i className="fab fa-whatsapp-f" />
                  </a>
                  <a href="https://www.instagram.com/ahmadi98.ir/" target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram-f" />
                  </a>
                  <a href="https://github.com/ahmadi98ir" target="_blank" rel="noreferrer">
                    <i className="fab fa-github-f" />
                  </a>
                  <a href="https://www.linkedin.com/in/mahdi-ahmadi-a2454a146/" target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin-f" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="contact-form-two form-style-one wow fadeInUp delay-0-4s">
              <form
                id="contactForm2"
                className="contactForm"
                name="contactForm"
                action="/api/contacts"
                method="post"
              >
                <div className="form-group">
                  <label className="for-title" htmlFor="email2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email2"
                    name="email"
                    className="form-control"
                    required=""
                  />
                  <label htmlFor="email2" className="for-icon">
                    <i className="far fa-envelope" />
                  </label>
                </div>
                <div className="form-group">
                  <label className="for-title" htmlFor="name2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name2"
                    name="name"
                    className="form-control"
                    required=""
                  />
                  <label htmlFor="name2" className="for-icon">
                    <i className="far fa-user" />
                  </label>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message2"
                    className="form-control"
                    rows={7}
                    placeholder="Write Message..."
                    required=""
                    defaultValue={""}
                  />
                </div>
                <div className="form-group mb-0">
                  <button type="submit" className="theme-btn">
                    <i className="far fa-envelope" /> Message me
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
