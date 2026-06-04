import About from "@/components/About";
import Blog from "@/components/Blog";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Services from "@/components/Services";
import Skill from "@/components/Skill";
import Testimonial from "@/components/Testimonial";
import NoxfolioLayout from "@/layout/NoxfolioLayout";

export default function Home() {
  return (
    <NoxfolioLayout>
      <Hero />
      <About />
      <Resume />
      <Services />
      <Skill />
      <Projects />
      <Testimonial />
      <Pricing />
      <Contact />
      <Blog />
      <Clients />
    </NoxfolioLayout>
  );
}
