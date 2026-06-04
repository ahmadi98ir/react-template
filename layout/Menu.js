"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const DropdownBtn = () => (
  <div className="dropdown-btn">
    <span className="fas fa-chevron-down" />
  </div>
);

const MultiMenu = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const base = `/${locale}`;

  return (
    <ul className="navigation clearfix">
      <li className="dropdown">
        <Link href={`${base}/contact`}>{t("contact")}</Link>
      </li>
      <li>
        <Link href={`${base}/about`}>{t("about")}</Link>
      </li>
      <li>
        <Link href={`${base}/services`}>{t("services")}</Link>
      </li>
      <li className="dropdown">
        <a href="#">{t("projects")}</a>
        <ul>
          <li>
            <Link href={`${base}/projects`}>{t("projectsCompleted")}</Link>
          </li>
          <li>
            <Link href={`${base}/projects-masonry`}>{t("projectsInProgress")}</Link>
          </li>
          <li>
            <Link href={`${base}/project-details`}>{t("projectsFuture")}</Link>
          </li>
        </ul>
        <DropdownBtn />
      </li>
      <li className="dropdown">
        <a href="#">{t("blog")}</a>
        <ul>
          <li>
            <Link href={`${base}/blog`}>{t("blogAI")}</Link>
          </li>
          <li>
            <Link href={`${base}/blog-details`}>{t("blogLatest")}</Link>
          </li>
        </ul>
        <DropdownBtn />
      </li>
      <li>
        <Link href={`${base}`}>{t("home")}</Link>
      </li>
    </ul>
  );
};
export default MultiMenu;

export const OnePageMenu = () => {
  const t = useTranslations("nav");

  return (
    <ul className="navigation onepage clearfix">
      <li><a href="#home">{t("home")}</a></li>
      <li><a href="#about">{t("about")}</a></li>
      <li><a href="#resume">Resume</a></li>
      <li><a href="#services">{t("services")}</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#portfolio">{t("projects")}</a></li>
      <li><a href="#blog">{t("blog")}</a></li>
      <li><a href="#contact">{t("contact")}</a></li>
    </ul>
  );
};
