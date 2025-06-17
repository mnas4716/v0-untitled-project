import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { Info } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <div className="sticky top-[80px] z-30">
        <ComingSoonBanner />
      </div>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Info className="h-16 w-16 text-freedoc-blue mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-freedoc-dark mb-4">About Us</h1>
          <p className="text-lg text-freedoc-secondary max-w-2xl mx-auto">
            Information about Freedoc will be available here soon. We are working on bringing you a comprehensive
            overview of our mission, team, and values.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-freedoc-dark mb-4">Stay Tuned!</h2>
          <p className="text-freedoc-secondary">
            This page is currently under construction. Please check back later for more details.
          </p>
        </div>
      </section>

      <FreedocFooter />
    </div>
  )
}
