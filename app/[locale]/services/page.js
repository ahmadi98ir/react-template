"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Pricing from "@/components/Pricing";
import Services from "@/components/Services";
import NoxfolioLayout from "@/layout/NoxfolioLayout";

const ServicePage = () => {
  const t = useTranslations("servicesPage");
  const locale = useLocale();

  return (
    <NoxfolioLayout>
      <PageBanner pageName={t("banner")} />

      <section className="what-i-do-area pt-25 rpt-0 pb-130 rpb-100 rel z-1">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6">
              <div className="what-i-do-images rmb-55 wow fadeInUp delay-0-2s">
                <div className="first-image">
                  <img src="/assets/images/about/what-i-do1.jpg" alt="What I do" />
                </div>
                <div className="last-image">
                  <img src="/assets/images/about/what-i-do2.jpg" alt="What I do" />
                </div>
                <div className="icon first">
                  <i className="flaticon-asterisk-1" />
                </div>
                <div className="icon last">
                  <i className="flaticon-asterisk-1" />
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="what-i-do-content wow fadeInUp delay-0-4s">
                <div className="section-title mb-40">
                  <span className="sub-title mb-15">{t("whatIDo")}</span>
                  <h2>{t("realSolutions")}</h2>
                  <p>{t("description")}</p>
                </div>
                <ul className="list-style-two pb-50">
                  <li>{t("feature1")}</li>
                  <li>{t("feature2")}</li>
                  <li>{t("feature3")}</li>
                </ul>
                <Link legacyBehavior href={`/${locale}/about`}>
                  <a className="theme-btn">
                    {t("learnMore")} <i className="far fa-angle-right" />
                  </a>
                </Link>
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
      <Pricing extraClass={"pb-100"} />
    </NoxfolioLayout>
  );
};
export default ServicePage;
