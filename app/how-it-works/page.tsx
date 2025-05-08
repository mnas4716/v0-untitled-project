import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader activePage="how-it-works" />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">How freedoc Works</h1>
            <p className="text-xl text-blue-100 mb-8">
              Getting the healthcare you need is simple, fast, and completely free with freedoc.
            </p>
            <Link href="/consult">
              <Button
                size="lg"
                className="bg-white hover:bg-blue-50 text-blue-600 transition-all transform hover:-translate-y-1"
              >
                Start Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Step 1
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-800">Create Your Account</h2>
                <p className="text-slate-600 mb-6">
                  Sign up for a free account to access all our healthcare services. It only takes a minute and all you
                  need is your email address.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Quick and easy registration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Secure and private</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Access to all services</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/auth/signup">
                    <Button className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Create account"
                  width={400}
                  height={300}
                  className="rounded-md w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 md:order-1 bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Book consultation"
                  width={400}
                  height={300}
                  className="rounded-md w-full"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Step 2
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-800">Book Your Consultation</h2>
                <p className="text-slate-600 mb-6">
                  Choose the type of service you need and fill in a simple form with your health concern. You can select
                  from medical certificates, prescriptions, or general consultations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Multiple service options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Simple booking process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Available 24/7</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/consult">
                    <Button className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                      Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
