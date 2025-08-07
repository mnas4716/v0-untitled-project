import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, FileText, Pill, ShieldCheck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader activePage="home" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Healthcare at your fingertips, completely free
              </h1>
              <p className="text-blue-100 text-lg mb-8 max-w-lg">
                Connect with Australian doctors online 24/7. Get prescriptions, medical certificates, and health advice
                without any cost.
              </p>
              <div>
                <Link href="/consult">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Start Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative bg-white p-2 rounded-2xl shadow-xl transform transition-all hover:-translate-y-1 hover:shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Doctor consultation"
                  width={600}
                  height={400}
                  className="rounded-xl w-full"
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
                  100% Free
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">Our Services</span>
            <h2 className="text-3xl font-bold mt-4 mb-4 text-slate-800">Free Healthcare Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Get the healthcare you need, when you need it, completely free. Our doctors can help with a range of
              health concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-lg">
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <FileText className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Medical Certificate</h3>
                <p className="text-slate-600 mb-6">
                  Get a medical certificate for work, school or university without leaving home.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-slate-700">Valid for work or education</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-slate-700">Issued within 60 minutes</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-slate-700">Delivered to your email</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600">Free</span>
                  <Link href="/medical-certificate">
                    <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-lg">
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <Pill className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Online Prescription</h3>
                <p className="text-slate-600 mb-6">
                  Get prescriptions for new medications or repeats for existing ones.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-slate-700">New and repeat prescriptions</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-slate-700">Delivery or pharmacy pickup</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-slate-700">E-prescription to your phone</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600">Free</span>
                  <Link href="/prescription">
                    <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-lg">
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Telehealth Consultation</h3>
                <p className="text-slate-600 mb-6">Speak with a doctor about any health concern via video or phone.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-slate-700">Consult about any health issue</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-slate-700">Available 6am to midnight</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-slate-700">No extra cost for weekends</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600">Free</span>
                  <Link href="/telehealth">
                    <Button variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2 text-slate-800">24/7 Availability</h3>
              <p className="text-sm text-slate-600">Doctors available when you need them</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2 text-slate-800">Registered Doctors</h3>
              <p className="text-sm text-slate-600">All doctors are fully qualified</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2 text-slate-800">Digital Documents</h3>
              <p className="text-sm text-slate-600">Prescriptions and certificates delivered digitally</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 hover:bg-blue-50 rounded-lg transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2 text-slate-800">Instant Booking</h3>
              <p className="text-sm text-slate-600">Book and connect with doctors instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 shadow-lg transform transition-all hover:shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Ready to see a doctor?</h2>
                <p className="text-blue-100 mb-6">
                  Skip the waiting room and connect with a doctor online today. Get the care you need, completely free.
                </p>
                <Link href="/consult">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 transition-all transform hover:-translate-y-1"
                  >
                    Start Free Consultation
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="bg-white p-2 rounded-xl shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Doctor consultation"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
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
