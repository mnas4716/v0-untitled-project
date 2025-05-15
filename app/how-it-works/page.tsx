import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Phone, FileText, Clock } from "lucide-react"
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

      {/* Process Flow */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-slate-800">Book Your Consultation</h2>
                <p className="text-slate-600 mb-6">
                  Choose the type of service you need and fill in a simple form with your health concern. You can select
                  from medical certificates, prescriptions, or general consultations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Quick and easy registration with just your email</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Secure and private account creation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Multiple service options available 24/7</span>
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
              <div className="bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Book consultation"
                  width={400}
                  height={300}
                  className="rounded-md w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 md:order-1 bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Doctor consultation"
                  width={400}
                  height={300}
                  className="rounded-md w-full"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>Within 1 hour</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-800">Speak With a Doctor</h2>
                <p className="text-slate-600 mb-6">
                  After booking, one of our qualified doctors will call you within 1 hour. They'll discuss your health
                  concerns, ask relevant questions, and provide professional medical advice.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Quick response from qualified doctors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Thorough assessment of your condition</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Personalized medical advice</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <div className="inline-flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>Same-day service</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-800">Receive Your Documents</h2>
                <p className="text-slate-600 mb-6">
                  After your consultation, you'll receive any necessary documents directly to your email. This includes
                  prescriptions, medical certificates, referrals, or treatment plans.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Digital documents delivered to your email</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Legally valid prescriptions and certificates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Access your documents anytime in your dashboard</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Medical documents"
                  width={400}
                  height={300}
                  className="rounded-md w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Follow-up care"
                  width={400}
                  height={300}
                  className="rounded-md w-full"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Ongoing support</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-800">Follow-Up Care</h2>
                <p className="text-slate-600 mb-6">
                  Your care doesn't end after the consultation. We provide follow-up support to ensure your treatment is
                  effective. You can access your medical history and request additional consultations if needed.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Access to your complete medical history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Easy follow-up consultations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                    <span className="text-slate-700">Continuous care for chronic conditions</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/auth/signin">
                    <Button className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                      Access Your Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-blue-100 mb-8">
                Experience healthcare that's designed around your needs. Book your consultation today and speak with a
                doctor within an hour.
              </p>
              <Link href="/consult">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all transform hover:-translate-y-1"
                >
                  Book Your Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
