import Link from "next/link";

export const metadata = {
  title: "404 Error",
};

export default function NotFound() {
  return (
    <section className="error-area pt-185 rpt-130 pb-130 rpb-100 rel z-1 text-center">
      <div className="container">
        <div className="error-content">
          <div className="section-title mb-40">
            <h1>404</h1>
            <h2>Page Not Found</h2>
          </div>
          <Link href="/" className="theme-btn">
            Go To Homepage <i className="far fa-angle-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
