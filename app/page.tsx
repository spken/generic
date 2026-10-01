import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { HowItWorks } from "@/components/site/how-it-works"
import { MobileBookBar } from "@/components/site/mobile-book-bar"
import { StudioPlate } from "@/components/site/studio-plate"
import { ScrollMotion } from "@/components/site/scroll-motion"
import { Services } from "@/components/site/services"
import { Team } from "@/components/site/team"
import { Visit } from "@/components/site/visit"
import { Work } from "@/components/site/work"

export default function Home() {
  return (
    <>
      <a
        href="#services"
        className="type-header sr-only z-50 bg-stamp px-4 py-3 text-[0.75rem] text-stamp-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to services
      </a>
      <Header />
      <main>
        <Hero />
        <StudioPlate />
        <Services />
        <Team />
        <HowItWorks />
        <Work />
        <Visit />
      </main>
      <Footer />
      <MobileBookBar />
      <ScrollMotion />
    </>
  )
}
