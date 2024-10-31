import Link from "next/link";

const DropdownBtn = () => (
  <div className="dropdown-btn">
    <span className="fas fa-chevron-down" />
  </div>
);
const MultiMenu = () => {
  return (
    <ul className="navigation clearfix">
      <li className="dropdown">
        <Link href="contact"> تماس با من</Link>
      </li>
      <li>
        <Link href="/about">درباره من</Link>
      </li>
      <li>
        <Link href="/services">خدمات</Link>
      </li>
      <li className="dropdown">
        <a href="#">پروژه ها</a>
        <ul>
          <li>
            <Link href="/projects"> خاتمه یافته</Link>
          </li>
          <li>
            <Link href="/projects-masonry"> در حال ساخت</Link>
          </li>
          <li>
            <Link href="/project-details"> آتی</Link>
          </li>
        </ul>
        <DropdownBtn />
      </li>
      <li className="dropdown">
        <a href="#">وبلاگ</a>
        <ul>
          <li>
            <Link href="/blog"> هوش مصنوعی</Link>
          </li>
          <li>
            <Link href="/blog-details">تازه ها</Link>
          </li>
        </ul>
        <DropdownBtn />
      </li>
     
      <li>
        <Link href="/">صفحه اصلی</Link>
      </li>
    </ul>
  );
};
export default MultiMenu;

export const OnePageMenu = () => {
  return (
    <ul className="navigation onepage clearfix">
      <li>
        <a href="#home">Home</a>
      </li>
      <li>
        <a href="#about">about</a>
      </li>
      <li>
        <a href="#resume">Resume</a>
      </li>
      <li>
        <a href="#services">services</a>
      </li>
      <li>
        <a href="#skills">skills</a>
      </li>
      <li>
        <a href="#portfolio">projects</a>
      </li>
      <li>
        <a href="#blog">blog</a>
      </li>
      <li>
        <a href="#contact">Contact</a>
      </li>
    </ul>
  );
};
