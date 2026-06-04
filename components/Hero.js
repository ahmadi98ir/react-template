"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Counter from "./Counter";

const Hero = () => {
  const t = useTranslations("hero");
  const locale = useLocale();

  const counterData = [
    {
      id: 1,
      text: t("experienceLabel"),
      value: "13",
      valueType: "plus",
      valueType2: t("experienceSuffix"),
    },
    {
      id: 2,
      text: t("projectsLabel"),
      value: "22",
      valueType: "plus",
      valueType2: "",
    },
    {
      id: 3,
      text: t("satisfactionLabel"),
      value: "100",
      valueType: "percent",
      valueType2: "",
    },
  ];

  return (
    <section id="home" className="main-hero-area pt-150 pb-80 rel z-1">
      <div className="container container-1620">
        <div className="row align-items-center">
          <div className="col-lg-4 col-sm-7">
            <div className="hero-content rmb-55 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">{t("greeting")}</span>
              <h1>
                <b>{t("name")}</b>
              </h1>
              <p className="tagline-text mb-20" style={{
                fontWeight: 500,
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                opacity: 0.8,
              }}>
                {t("tagline")}
              </p>
              <p style={{ textAlign: "justify" }}>
                {t("description")}
              </p>
              <div className="hero-btns">
                <Link legacyBehavior href={`/${locale}/about`}>
                  <a className="theme-btn">
                    <b>{t("aboutBtn")}</b>{" "}
                    <i className="far fa-angle-right" />
                  </a>
                </Link>
                <Link legacyBehavior href={`/${locale}/contact`}>
                  <a className="read-more">
                    {t("resumeBtn")} <i className="far fa-angle-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-5 order-lg-3">
            <div className="hero-counter-wrap ms-lg-auto rmb-55 wow fadeInUp delay-0-4s">
              {counterData.map((count) => (
                <div className="counter-item counter-text-wrap" key={count.id}>
                  <span className="count-text">{count.valueType2}</span>
                  <Counter end={count.value} extraClass={count.valueType} />
                  <span className="counter-title">{count.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="author-image-part wow fadeIn delay-0-3s">
              <div className="bg-circle" />
              <img src="/assets/images/hero/me.png" alt="Mahdi Ahmadi" />
              <div className="progress-shape">
                <img
                  src="/assets/images/hero/progress-shape.png"
                  alt="Progress"
                />
              </div>
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
export default Hero;

export const Hero2 = () => {
  return (
    <div id="home" className="hero-area-two pt-150 rel z-2">
      <div className="container rel z-3">
        <div className="hero-two-content">
          <span className="sub-title wow fadeInLeft delay-0-1s">
            <i className="flaticon-asterisk-1" /> Tech Lead & Full-Stack Architect
          </span>
          <span className="title wow fadeInLeft delay-0-2s">
            Hello <small>I&apos;m</small>
          </span>
          <span className="name wow fadeInRight delay-0-4s">Mahdi Ahmadi</span>
          <span className="designations wow fadeInLeft delay-0-6s">
            <span>MSc</span> Bank Accounting
          </span>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <div className="author-image-part wow fadeIn delay-0-3s">
              <div className="bg-circle" />
              <img src="/assets/images/hero/hero-two.png" alt="Mahdi Ahmadi" />
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-down">
        <img src="/assets/images/hero/scroll-down.png" alt="" />
      </a>
      <div className="bg-lines">
        <span /><span /><span /><span /><span />
        <span /><span /><span /><span /><span />
      </div>
    </div>
  );
};
