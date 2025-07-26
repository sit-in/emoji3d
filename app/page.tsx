import Hero from "@/components/hero"
import Steps from "@/components/steps"
import Gallery from "@/components/gallery"
import Uploader from "@/components/uploader"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Steps />
      <Gallery />
      <Uploader />
      <FAQ />
      <Footer />
    </main>
  )
}
