import { CinemaNavbar } from "@/components/cinema/CinemaNavbar";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaAbout } from "@/components/cinema/CinemaAbout";
import { CinemaProjects } from "@/components/cinema/CinemaProjects";
import { CinemaSkills } from "@/components/cinema/CinemaSkills";
import { CinemaContact } from "@/components/cinema/CinemaContact";
import { CinemaFooter } from "@/components/cinema/CinemaFooter";

const META = {
  fa: {
    title: "مهدی احمدی – توسعه‌دهنده فول‌استک و مدیر سیستم",
    description:
      "در تلاقی معماری سرور Ubuntu 24، توسعه Next.js/PostgreSQL و یکپارچه‌سازی مدل‌های زبانی — راهکارهای سازمانی می‌سازم که واقعاً کار می‌کنند.",
  },
  en: {
    title: "Mahdi Ahmadi – Full-Stack Developer & Systems Administrator",
    description:
      "At the intersection of Ubuntu 24 server architecture, Next.js/PostgreSQL development and LLM integration — building enterprise solutions that actually work.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: "https://ahmadi98.ir",
      siteName: locale === "fa" ? "مهدی احمدی" : "Mahdi Ahmadi",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

async function getPublishedProjects() {
  try {
    // Dynamic import keeps the DB out of the Edge bundle
    const { db } = await import("@/drizzle/db");
    const { projects } = await import("@/drizzle/schema");
    const { asc, eq, and } = await import("drizzle-orm");

    return await db
      .select({
        id: projects.id,
        slug: projects.slug,
        title: projects.title,
        description: projects.description,
        category: projects.category,
        tags: projects.tags,
        projectUrl: projects.projectUrl,
        githubUrl: projects.githubUrl,
        coverImageUrl: projects.coverImageUrl,
        featured: projects.featured,
        order: projects.order,
      })
      .from(projects)
      .where(and(eq(projects.published, true)))
      .orderBy(asc(projects.order));
  } catch {
    return [];
  }
}

export default async function Home() {
  const dbProjects = await getPublishedProjects();

  return (
    <main className="cinema-page">
      <CinemaNavbar />
      <CinemaHero />
      <CinemaAbout />
      <CinemaProjects dbProjects={dbProjects} />
      <CinemaSkills />
      <CinemaContact />
      <CinemaFooter />
    </main>
  );
}
