import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Projects } from "@/components/portfolio/Projects";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <main className="portfolio-page">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
