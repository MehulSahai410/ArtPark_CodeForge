import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import FeatureGrid from '../components/FeatureGrid'
import HowItWorks from '../components/HowItWorks'
import StatsCounter from '../components/StatsCounter'
import TestimonialCarousel from '../components/TestimonialCarousel'
import CTABanner from '../components/CTABanner'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <StatsCounter />
      <HowItWorks />
      <TestimonialCarousel />
      <CTABanner />
      <Footer />
    </div>
  )
}
