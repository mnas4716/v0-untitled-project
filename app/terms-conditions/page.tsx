import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { FileText } from "lucide-react"

export default function TermsConditionsPage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <div className="sticky top-[80px] z-30">
        <ComingSoonBanner />
      </div>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="h-16 w-16 text-freedoc-blue mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-freedoc-dark mb-4">Terms & Conditions</h1>
          <p className="text-lg text-freedoc-secondary max-w-2xl mx-auto">
            Please read our Terms & Conditions carefully. The full document will be available here soon.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-freedoc-dark mb-4">Details Coming Soon</h2>
          <p className="text-freedoc-secondary">
            Our Terms & Conditions are being finalized and will be published here shortly.
          </p>
        </div>
      </section>

      <FreedocFooter />
    </div>
  )
}
