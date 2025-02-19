'use client';

import Hero from './Hero';
import About from './About';
import Services from './Services';
import Projects from './Projects';
import Resume from './Resume';
import Counter from './Counter';
import Testimonial from './Testimonial';
import Clients from './Clients';
import Blog from './Blog';
import Contact from './Contact';
import LetsTalk from './LetsTalk';
import MarqueeSection from './MarqueeSection';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Resume />
      <Counter />
      <Testimonial />
      <Clients />
      <Blog />
      <Contact />
      <LetsTalk />
      <MarqueeSection />
    </>
  );
}