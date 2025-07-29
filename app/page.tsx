import Hero from "@/components/hero"
import Steps from "@/components/steps"
import Gallery from "@/components/gallery"
import Uploader from "@/components/uploader"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import FeatureDemo from "@/components/feature-demo"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Steps />
      <FeatureDemo />
      <Gallery />
      <div id="uploader">
        <Uploader />
      </div>
      <FAQ />
      <Footer />
    </main>
  )
}