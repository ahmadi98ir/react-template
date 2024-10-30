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

export default function HomeOnePage() {
  return (
    <NoxfolioLayout onePageMenu={true}>
      {/* Hero Section Start */}
      <Hero />
      {/* Hero Section End */}
      {/* About Area start */}
      <About />
      {/* About Area end */}
      {/* Resume Area start */}
      <Resume />
      {/* Resume Area end */}
      {/* Services Area start */}
      <Services />
      {/* Services Area end */}
      {/* Skill Area start */}
      <Skill />
      {/* Skill Area end */}
      {/* Projects Area start */}
      <Projects />
      {/* Projects Area end */}
      {/* Testimonial Area start */}
      <Testimonial />
      {/* Testimonial Area end */}
      {/* Pricing Area start */}
      <Pricing />
      {/* Pricing Area end */}
      {/* Contact Area start */}
      <Contact />
      {/* Contact Area end */}
      {/* Blog Area start */}
      <Blog />
      {/* Blog Area end */}
      {/* Client Log start */}
      <Clients />
      {/* Client Log end */}
    </NoxfolioLayout>
  );
}
