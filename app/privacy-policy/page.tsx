import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { ShieldCheck } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <div className="sticky top-[80px] z-30">
        <ComingSoonBanner />
      </div>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck className="h-16 w-16 text-freedoc-blue mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-freedoc-dark mb-4">Privacy Policy</h1>
          <p className="text-lg text-freedoc-secondary max-w-2xl mx-auto">
            Your privacy is important to us. Our detailed Privacy Policy will be available here soon.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-freedoc-dark mb-4">Content Coming Soon</h2>
          <p className="text-freedoc-secondary">
            We are finalizing our Privacy Policy to ensure it's comprehensive and clear. Please check back shortly.
          </p>
        </div>
      </section>

      <FreedocFooter />
    </div>
  )
}
