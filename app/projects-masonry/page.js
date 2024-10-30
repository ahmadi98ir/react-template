import PageBanner from "@/components/PageBanner";
import NoxfolioLayout from "@/layout/NoxfolioLayout";
import Link from "next/link";

import dynamic from "next/dynamic";
const ProjectMasonryIsotop = dynamic(
  () => import("@/components/ProjectMasonryIsotop"),
  {
    ssr: false,
  }
);

export const metadata = {
  title: "Projects Masonry",
};

const ProjectMasonry = () => {
  return (
    <NoxfolioLayout>
      <PageBanner pageName={"Project Masonry"} />
      <section className="projects-masonry-area pt-40 pb-130 rpb-100 rel z-1">
        <div className="container">
          <ProjectMasonryIsotop />
          <div className="project-btn mt-25 text-center wow fadeInUp delay-0-2s">
            <Link legacyBehavior href="/projects">
              <a className="theme-btn">
                View More Projects <i className="far fa-angle-right" />
              </a>
            </Link>
          </div>
        </div>
        <div className="bg-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </NoxfolioLayout>
  );
};
export default ProjectMasonry;
