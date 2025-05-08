import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ArrowRight, FileText, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function MedicalCertificatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader activePage="medical-certificate" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Online Medical Certificates</h2>
            <p className="text-lg mb-6">
              Get a medical certificate from the comfort of your home. Our qualified doctors can provide medical
              certificates for work, school, or other purposes.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Quick and convenient online consultations</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Legally valid medical certificates</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Certificates emailed directly to you</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Secure and confidential service</span>
              </li>
            </ul>
            <Link href="/medical-certificate/request">
              <Button
                size="lg"
                className="bg-white hover:bg-blue-50 text-blue-600 transition-all transform hover:-translate-y-1"
              >
                Request Medical Certificate
              </Button>
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <Image
                src="/placeholder.svg?key=3gzol"
                alt="Medical Certificate"
                width={400}
                height={400}
                className="rounded-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Medical Certificate Services</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Our doctors can provide medical certificates for a variety of situations through secure online
            consultations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Sick Leave</h3>
              <p className="text-slate-600 mb-6">
                Get a medical certificate for sick leave from work or school due to illness or injury.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Most Common
              </span>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Time Off Work</h3>
              <p className="text-slate-600 mb-6">
                Medical certificates for extended time off work due to ongoing health conditions or recovery.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Fast Service
              </span>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Fitness Certificates</h3>
              <p className="text-slate-600 mb-6">
                Certificates confirming your fitness to return to work, school, or participate in activities.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Comprehensive
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Common Conditions */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
            Common Reasons for Medical Certificates
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Our doctors can provide medical certificates for a wide range of conditions and situations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Cold & Flu</h3>
              <p className="text-sm text-slate-600">Viral infections requiring rest</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Gastroenteritis</h3>
              <p className="text-sm text-slate-600">Stomach flu and digestive issues</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Migraines</h3>
              <p className="text-sm text-slate-600">Severe headaches and related symptoms</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Back Pain</h3>
              <p className="text-sm text-slate-600">Acute or chronic back injuries</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Mental Health</h3>
              <p className="text-sm text-slate-600">Stress, anxiety, and depression</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Injuries</h3>
              <p className="text-sm text-slate-600">Sprains, strains, and minor injuries</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Respiratory Issues</h3>
              <p className="text-sm text-slate-600">Asthma, bronchitis, and infections</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Recovery</h3>
              <p className="text-sm text-slate-600">Post-surgery or procedure recovery</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Not sure if we can help with your situation? Contact us or start a consultation to find out.
            </p>
            <Link href="/medical-certificate/request">
              <Button className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                Request Medical Certificate <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-slate-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Request a Certificate</h3>
              <p className="text-slate-600">
                Fill out our simple online form with your details and the reason you need a medical certificate.
              </p>
            </div>

            <div className="text-center bg-slate-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Doctor Review</h3>
              <p className="text-slate-600">
                One of our qualified doctors will review your request and may contact you for additional information if
                needed.
              </p>
            </div>

            <div className="text-center bg-slate-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Receive Your Certificate</h3>
              <p className="text-slate-600">
                If approved, you'll receive your medical certificate via email, ready to use for work, school, or other
                purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Need a medical certificate?</h2>
              <p className="text-blue-100 mb-8">
                Our doctors can provide you with a valid medical certificate quickly and conveniently. Start your
                request today.
              </p>
              <Link href="/medical-certificate/request">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all transform hover:-translate-y-1"
                >
                  Request Medical Certificate
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
