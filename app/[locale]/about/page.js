"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Clients from "@/components/Clients";
import Faq from "@/components/Faq";
import PageBanner from "@/components/PageBanner";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import NoxfolioLayout from "@/layout/NoxfolioLayout";

const About = () => {
  const t = useTranslations("aboutPage");
  const locale = useLocale();

  return (
    <NoxfolioLayout>
      <PageBanner pageName={t("banner")} />

      <div className="about-main-image-area pt-40">
        <div className="container">
          <div className="about-main-image wow fadeInUp delay-0-5s">
            <img src="/assets/images/about/about-page.jpg" alt="About Page" />
          </div>
        </div>
      </div>

      <section className="about-page-area py-130 rpy-100 rel z-1">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6">
              <div className="about-page-content-part rel z-2 rmb-55">
                <div className="section-title mb-35 wow fadeInUp delay-0-2s">
                  <span className="sub-title mb-15">{t("subTitle")}</span>
                  <h2>{t("title")}</h2>
                  <p>{t("description")}</p>
                </div>
                <ul className="list-style-one two-column pb-30 wow fadeInUp delay-0-2s">
                  <li>{t("skill1")}</li>
                  <li>{t("skill2")}</li>
                  <li>{t("skill3")}</li>
                  <li>{t("skill4")}</li>
                </ul>
                <Link href={`/${locale}`} className="theme-btn wow fadeInUp delay-0-2s">
                    {t("moreDetails")}
                  </Link>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="about-right-part wow fadeInLeft delay-0-3s">
                <div className="experience-years">
                  <b>{t("experience")}</b>
                  <h5>{t("experienceLabel")}</h5>
                </div>
                <div className="about-btn one wow fadeInRight delay-0-4s">
                  <img src="/assets/images/about/btn-image1.png" alt="Image" />
                  <h6>{t("btn1")}</h6>
                  <i className="fas fa-arrow-right" />
                </div>
                <div className="about-btn two wow fadeInRight delay-0-5s">
                  <img src="/assets/images/about/btn-image2.png" alt="Image" />
                  <h6>{t("btn2")}</h6>
                  <i className="fas fa-arrow-right" />
                </div>
                <div className="about-btn three wow fadeInRight delay-0-4s">
                  <img src="/assets/images/about/btn-image1.png" alt="Image" />
                  <h6>{t("btn3")}</h6>
                  <i className="fas fa-arrow-right" />
                </div>
                <div className="dot-shape one">
                  <img src="/assets/images/shape/about-dots-two.png" alt="Shape" />
                </div>
                <div className="dot-shape two">
                  <img src="/assets/images/shape/about-dots-two.png" alt="Shape" />
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

      <Services extraClass={"bgc-black"} />

      <section id="faqs" className="faqs-area py-130 rpy-100 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="faq-image-part rmb-55 wow fadeInUp delay-0-2s">
                <div className="image-one">
                  <img src="/assets/images/faqs/faq-one.jpg" alt="FAQ" />
                </div>
                <div className="image-two">
                  <img src="/assets/images/faqs/faq-two.jpg" alt="FAQ" />
                </div>
                <div className="square-shape" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-content-part rel z-2">
                <div className="section-title mb-40 wow fadeInUp delay-0-4s">
                  <h2>{t("faqTitle")}</h2>
                </div>
                <Faq />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-lines">
          <span /><span /><span /><span /><span />
          <span /><span /><span /><span /><span />
        </div>
      </section>

      <Testimonial />
      <Clients />
    </NoxfolioLayout>
  );
};
export default About;
