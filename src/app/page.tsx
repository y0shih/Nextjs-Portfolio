'use client'

import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import MusicPlayer from "@/components/MusicPlayer"
import ProjectsSection from "@/components/ProjectsSection"
import Navigation from "@/components/Navigation"

export default function Home() {
  return (
    <main className="min-h-screen snap-container">
      <Navigation />
      <section id="home" className="snap-section">
        <HeroSection />
      </section>
      <section id="about" className="snap-section">
        <AboutSection />
      </section>
      <section id="projects" className="snap-section">
        <ProjectsSection />
      </section>
      <section id="contact" className="snap-section">
        <ContactSection />
      </section>
      <MusicPlayer />
    </main>
  )
}
