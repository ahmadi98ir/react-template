"use client";
import { Fragment } from "react";
import { useTranslations } from "next-intl";

const SideBar = () => {
  const t = useTranslations("sidebar");

  const toggleSidebar = () => {
    document.querySelector("body").classList.remove("side-content-visible");
  };

  return (
    <Fragment>
      <div className="form-back-drop" onClick={() => toggleSidebar()} />
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon" onClick={() => toggleSidebar()}>
            <span className="fa fa-times" />
          </div>
          <div className="title">
            <h4>{t("title")}</h4>
          </div>
          <div className="appointment-form">
            <form
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                toggleSidebar();
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  name="text"
                  defaultValue=""
                  placeholder={t("namePlaceholder")}
                  required=""
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  defaultValue=""
                  placeholder={t("emailPlaceholder")}
                  required=""
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder={t("messagePlaceholder")}
                  rows={5}
                  defaultValue={""}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="theme-btn">
                  {t("submit")}
                </button>
              </div>
            </form>
          </div>
          <div className="social-style-one">
            <a href="https://x.com/ahmadi98ir" target="_blank" rel="noreferrer">
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
      </section>
    </Fragment>
  );
};
export default SideBar;
