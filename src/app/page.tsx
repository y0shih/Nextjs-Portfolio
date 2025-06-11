import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import MusicPlayer from "@/components/MusicPlayer"
import Time from "@/components/Time"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ContactSection />
      <MusicPlayer />
      <Time />
    </main>
  )
}
