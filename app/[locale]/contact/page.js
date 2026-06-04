"use client";
import { useTranslations } from "next-intl";
import PageBanner from "@/components/PageBanner";
import NoxfolioLayout from "@/layout/NoxfolioLayout";

const ContactPage = () => {
  const t = useTranslations("contactPage");

  return (
    <NoxfolioLayout>
      <PageBanner pageName={t("banner")} />

      <section className="contact-page pt-40 pb-130 rpb-100 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="contact-page-content rmb-55 wow fadeInUp delay-0-2s">
                <div className="section-title mb-30">
                  <span className="sub-title mb-15">{t("subTitle")}</span>
                  <h2>{t("title")}</h2>
                  <p>{t("description")}</p>
                </div>
                <h6>{t("officeTitle")}</h6>
                <div className="widget_contact_info mb-35">
                  <ul>
                    <li>
                      <i className="far fa-map-marker-alt" /> {t("address")}
                    </li>
                    <li>
                      <i className="far fa-envelope" />{" "}
                      <a href="mailto:info@ahmadi98.ir">info@ahmadi98.ir</a>
                    </li>
                    <li>
                      <i className="far fa-phone" />{" "}
                      <a dir="ltr" href="tel:+989102413207">
                        +98 910 241 3207
                      </a>
                    </li>
                  </ul>
                </div>
                <h5>{t("socialTitle")}</h5>
                <div className="social-style-one mt-10">
                  <a
                    href="https://x.com/ahmadi98ir"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="https://wa.me/989102413207">
                    <i className="fab fa-whatsapp" />
                  </a>
                  <a
                    href="https://www.instagram.com/ahmadi98.ir/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                  <a
                    href="https://github.com/ahmadi98ir"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-github" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mahdi-ahmadi-a2454a146/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-page-form contact-form form-style-one wow fadeInUp delay-0-2s">
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
                        <label htmlFor="cp-name">{t("fullName")}</label>
                        <input
                          type="text"
                          id="cp-name"
                          name="name"
                          className="form-control"
                          defaultValue=""
                          required=""
                        />
                        <label htmlFor="cp-name" className="for-icon">
                          <i className="far fa-user" />
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="cp-email">{t("email")}</label>
                        <input
                          type="email"
                          id="cp-email"
                          name="email"
                          className="form-control"
                          defaultValue=""
                          placeholder="support@gmail.com"
                          required=""
                        />
                        <label htmlFor="cp-email" className="for-icon">
                          <i className="far fa-envelope" />
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="cp-phone">{t("phone")}</label>
                        <input
                          type="text"
                          id="cp-phone"
                          name="phone"
                          className="form-control"
                          defaultValue=""
                          placeholder={t("phonePlaceholder")}
                          required=""
                        />
                        <label htmlFor="cp-phone" className="for-icon">
                          <i className="far fa-phone" />
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="cp-subject">{t("subject")}</label>
                        <input
                          type="text"
                          id="cp-subject"
                          name="subject"
                          className="form-control"
                          defaultValue=""
                          placeholder={t("subjectPlaceholder")}
                          required=""
                        />
                        <label htmlFor="cp-subject" className="for-icon">
                          <i className="far fa-text" />
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="cp-message">{t("message")}</label>
                        <textarea
                          name="message"
                          id="cp-message"
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
                          {t("submit")}
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

      <div className="contact-page-map pb-120 rpb-90 wow fadeInUp delay-0-2s">
        <div className="container">
          <div className="our-location" />
        </div>
      </div>
    </NoxfolioLayout>
  );
};
export default ContactPage;
