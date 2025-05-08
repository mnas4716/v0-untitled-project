import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ArrowRight, Pill, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrescriptionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader activePage="prescription" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Online Prescription Service</h2>
            <p className="text-lg mb-6">
              Get your prescriptions quickly and conveniently from the comfort of your home. Our qualified doctors can
              prescribe a wide range of medications for various conditions.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Convenient online consultations</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Legally valid prescriptions</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Multiple delivery options</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Secure and confidential service</span>
              </li>
            </ul>
            <Link href="/prescription/request">
              <Button
                size="lg"
                className="bg-white hover:bg-blue-50 text-blue-600 transition-all transform hover:-translate-y-1"
              >
                Request Prescription
              </Button>
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <Image
                src="/placeholder.svg?key=ch4yg"
                alt="Prescription Service"
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
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Prescription Services</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Our doctors can prescribe medications for a variety of conditions through secure online consultations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Pill className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">New Prescriptions</h3>
              <p className="text-slate-600 mb-6">
                Get a new prescription for a condition after consultation with one of our qualified doctors.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Most Common
              </span>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Repeat Prescriptions</h3>
              <p className="text-slate-600 mb-6">
                Easily renew your existing prescriptions without needing to visit a doctor in person.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Fast Service
              </span>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Medication Delivery</h3>
              <p className="text-slate-600 mb-6">
                Have your prescribed medications delivered directly to your home or sent to your local pharmacy.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Convenient
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Common Conditions */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Common Conditions We Prescribe For</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Our doctors can prescribe medications for a wide range of conditions.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Allergies</h3>
              <p className="text-sm text-slate-600">Seasonal and chronic allergies</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Asthma</h3>
              <p className="text-sm text-slate-600">Inhalers and preventative medications</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Blood Pressure</h3>
              <p className="text-sm text-slate-600">Hypertension management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Diabetes</h3>
              <p className="text-sm text-slate-600">Type 2 diabetes medications</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Skin Conditions</h3>
              <p className="text-sm text-slate-600">Eczema, acne, and rashes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Pain Management</h3>
              <p className="text-sm text-slate-600">Appropriate pain relief options</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Mental Health</h3>
              <p className="text-sm text-slate-600">Depression and anxiety medications</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Infections</h3>
              <p className="text-sm text-slate-600">Antibiotics for bacterial infections</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Not sure if we can prescribe for your condition? Contact us or start a consultation to find out.
            </p>
            <Link href="/prescription/request">
              <Button className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                Request Prescription <ArrowRight className="ml-2 h-4 w-4" />
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
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Request a Prescription</h3>
              <p className="text-slate-600">
                Fill out our simple online form with your details and the medication you need.
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
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Receive Your Prescription</h3>
              <p className="text-slate-600">
                If approved, your prescription will be sent to your chosen pharmacy or delivered directly to your home.
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
              <h2 className="text-3xl font-bold text-white mb-4">Need a prescription?</h2>
              <p className="text-blue-100 mb-8">
                Our doctors can provide you with a valid prescription quickly and conveniently. Start your request
                today.
              </p>
              <Link href="/prescription/request">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all transform hover:-translate-y-1"
                >
                  Request Prescription
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
