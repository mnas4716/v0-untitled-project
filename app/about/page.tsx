import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Users, Globe, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About freedoc</h1>
            <p className="text-xl text-blue-100 mb-8">
              We're on a mission to make healthcare accessible to everyone in Australia, completely free of charge.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Our Story</h2>
            <div className="prose prose-lg max-w-none text-slate-600">
              <p className="mb-4">
                freedoc was founded in 2022 with a simple yet powerful vision: to remove barriers to healthcare access
                for all Australians. We recognized that many people delay seeking medical care due to cost, time
                constraints, or geographical limitations.
              </p>
              <p className="mb-4">
                After years of working in traditional medical settings, our founders decided to leverage technology to
                create a solution that would make healthcare accessible to everyone, regardless of their location or
                financial situation.
              </p>
              <p className="mb-4">
                What began as a small telehealth service has grown into a comprehensive platform offering consultations,
                prescriptions, medical certificates, and mental health support—all completely free of charge.
              </p>
              <p>
                Today, freedoc connects thousands of Australians with qualified healthcare professionals, providing care
                that is not only accessible but also high-quality and patient-centered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Accessibility</h3>
              <p className="text-slate-600">
                We believe that quality healthcare should be available to everyone, regardless of their financial
                situation or location.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Excellence</h3>
              <p className="text-slate-600">
                We are committed to providing the highest standard of care through our network of qualified and
                experienced healthcare professionals.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Innovation</h3>
              <p className="text-slate-600">
                We continuously explore new technologies and approaches to improve the healthcare experience for our
                patients and doctors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Free */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">How We're Free</h2>
            <div className="prose prose-lg max-w-none text-slate-600">
              <p className="mb-4">
                Many people ask us how we can offer our services for free. The answer lies in our innovative business
                model and strategic partnerships.
              </p>
              <p className="mb-4">
                freedoc is supported by a combination of government grants, partnerships with pharmaceutical companies,
                and philanthropic donations. This funding model allows us to provide free healthcare services while
                ensuring our doctors are fairly compensated for their time and expertise.
              </p>
              <p>
                We're committed to maintaining our free service model while expanding our offerings to reach more
                Australians in need of accessible healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Join Us in Our Mission</h2>
              <p className="text-blue-100 mb-8">
                Whether you're a patient seeking care or a healthcare professional interested in joining our network,
                we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/consult">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 transition-all w-full sm:w-auto">
                    Get Care Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-blue-700 transition-all w-full sm:w-auto"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
