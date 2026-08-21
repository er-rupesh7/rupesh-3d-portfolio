import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Terminal from '@/components/sections/Terminal';
import Contact from '@/components/sections/Contact';
import HeroScene from '@/components/3d/HeroScene';

export default function Home() {
  return (
    <div className="portfolio-shell">
      <div className="fixed-3d-background">
        <HeroScene />
      </div>
      <Navbar />
      <main id="main-content" className="portfolio-content">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
