"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Services = ({ extraClass }) => {
  const t = useTranslations("services");

  const services = [
    { id: 1, title: t("service1Title"), text: t("service1Text") },
    { id: 2, title: t("service2Title"), text: t("service2Text") },
    { id: 3, title: t("service3Title"), text: t("service3Text") },
    { id: 4, title: t("service4Title"), text: t("service4Text") },
    { id: 5, title: t("service5Title"), text: t("service5Text") },
    { id: 6, title: t("service6Title"), text: t("service6Text") },
  ];

  return (
    <section
      id="services"
      className={`services-area pt-130 rpt-100 pb-100 rpb-70 rel z-1 ${extraClass || ""}`}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">{t("subTitle")}</span>
              <h2>{t("title")}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((service) => (
            <div className="col-lg-6" key={service.id}>
              <div className="service-item wow fadeInUp delay-0-2s">
                <div className="number">
                  {service.id >= 9 ? service.id : `0${service.id}`}.
                </div>
                <div className="content">
                  <h4>{service.title}</h4>
                  <p>{service.text}</p>
                </div>
                <Link href="/#" className="details-btn">
                    <i className="fas fa-arrow-right" />
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-lines">
        <span /><span /><span /><span /><span />
        <span /><span /><span /><span /><span />
      </div>
    </section>
  );
};
export default Services;

export const Services2 = () => {
  return (
    <section
      id="services"
      className="services-area-two pt-130 rpt-100 pb-140 rpb-100 rel z-1"
    >
      <div className="container container-1200">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="section-title text-center mb-50 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">
                <i className="flaticon-asterisk-1" /> my services area
              </span>
              <h2>MY SERVICE AREA</h2>
            </div>
          </div>
        </div>
        <div className="services-two-wrap">
          {[
            { icon: "service1", title: "WEBSITE Development", items: ["Ui/Ux Design", "Research", "Web & Mobile app"] },
            { icon: "service2", title: "Digital Marketing", items: ["Ui/Ux Design", "Research", "Web & Mobile app"] },
            { icon: "service3", title: "Front End Development", items: ["Ui/Ux Design", "Research", "Web & Mobile app"] },
            { icon: "service4", title: "Joomla redesigning", items: ["Ui/Ux Design", "Research", "Web & Mobile app"] },
          ].map((svc) => (
            <div key={svc.title} className="service-item-two wow fadeInUp delay-0-2s">
              <div className="icon">
                <img src={`/assets/images/icons/${svc.icon}.png`} alt="Icon" />
              </div>
              <h5 className="title">
                <a href="#">{svc.title}</a>
              </h5>
              <div className="text">
                Welcome to our portfolio website! We are a professional company
                that offers a wide range of services.
              </div>
              <ul className="list">
                {svc.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href="#" className="details-btn">
                <i className="fal fa-long-arrow-right" />
              </a>
            </div>
          ))}
        </div>
        <div className="services-more-btn text-center pt-55 wow fadeInUp delay-0-2s">
          <Link href="services" className="theme-btn">
            Get more services
          </Link>
        </div>
      </div>
    </section>
  );
};
