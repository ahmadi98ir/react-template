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
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
  };
}

export default function Home() {
  return (
    <main className="cinema-page">
      <CinemaNavbar />
      <CinemaHero />
      <CinemaAbout />
      <CinemaProjects />
      <CinemaSkills />
      <CinemaContact />
      <CinemaFooter />
    </main>
  );
}
