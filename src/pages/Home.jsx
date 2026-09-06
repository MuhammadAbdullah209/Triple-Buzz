import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'
import FeatureProductSection from '../components/FeatureProductSection'
import VapesSection from '../components/VapesSection'
import TrustSection from '../components/TrustSection'
import BrandsSection from '../components/BrandsSection'
import AboutSection from '../components/AboutSection'
import BlogSection from '../components/BlogSection'
import Newsletter from '../components/Newsletter'
import Testimonials from '../components/Testimonials'
import AreasServed from '../components/AreasServed'
import { SHISHA_PRODUCTS, TORCH_PRODUCTS } from '../data/products'
import shishaPromo from '../assets/images/hero-slide-3.png'
import torchPromo from '../assets/images/hero-slide-4.png'

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeatureProductSection title="Shisha Hookah" promoImg={shishaPromo} products={SHISHA_PRODUCTS} columns={6} />
      <VapesSection />
      <FeatureProductSection title="Torches & Lighter" promoImg={torchPromo} products={TORCH_PRODUCTS} />
      <TrustSection />
      <BrandsSection />
      <AboutSection />
      <BlogSection />
      <Newsletter />
      <Testimonials />
      <AreasServed />
    </>
  )
}
