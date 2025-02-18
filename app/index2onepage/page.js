import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import LetsTalk from "@/components/LetsTalk";
import { Pricing } from "@/components/Pricing";
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import ScrollTop from "@/components/ScrollTop";
import { Services } from "@/components/Services";
import { Skill } from "@/components/Skill";
import NoxfolioLayout from "@/layout/NoxfolioLayout";

export const metadata = {
  title: 'Portfolio - One Page',
  description: 'Professional portfolio showcasing development and design work',
};

const Index2 = () => {
  return (
    <NoxfolioLayout header={2} footer={2} onePageMenu={true}>
      <Hero />
      <About />
      <Resume />
      <Services />
      <Skill />
      <Projects />
      <Pricing />
      <Clients />
      <Contact />
      <Blog />
      <LetsTalk />
      <ScrollTop />
    </NoxfolioLayout>
  );
};

export default Index2;