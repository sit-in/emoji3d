import Hero from "@/components/hero-creative"
import Features from "@/components/features"
import Gallery from "@/components/gallery"
import Uploader from "@/components/uploader"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import FeatureDemo from "@/components/feature-demo"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeatureDemo />
      <Features />
      <Gallery />
      <div id="uploader">
        <Uploader />
      </div>
      <FAQ />
      <Footer />
    </main>
  )
}