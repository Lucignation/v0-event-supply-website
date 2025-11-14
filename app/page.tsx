import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import HeroSection from '@/components/home/hero-section'
import BenefitsSection from '@/components/home/benefits-section'
import ServicesGrid from '@/components/home/services-grid'
import CTASection from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <BenefitsSection />
        <ServicesGrid />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
