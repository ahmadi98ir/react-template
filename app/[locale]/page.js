import { CinemaNavbar } from "@/components/cinema/CinemaNavbar";
import { CinemaHero } from "@/components/cinema/CinemaHero";
import { CinemaAbout } from "@/components/cinema/CinemaAbout";
import { CinemaProjects } from "@/components/cinema/CinemaProjects";
import { CinemaSkills } from "@/components/cinema/CinemaSkills";
import { CinemaContact } from "@/components/cinema/CinemaContact";
import { CinemaFooter } from "@/components/cinema/CinemaFooter";

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
