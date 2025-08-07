import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ArrowRight, Video, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TelehealthPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader activePage="telehealth" />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Free Telehealth Consultations</h2>
            <p className="text-lg mb-6">
              Speak with a doctor online from the comfort of your home. Get medical advice, prescriptions, and
              referrals.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Consult with registered doctors</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Available 7 days a week</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Video, phone, or chat options</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Completely free of charge</span>
              </li>
            </ul>
            <Link href="/consult">
              <Button
                size="lg"
                className="bg-white hover:bg-blue-50 text-blue-600 transition-all transform hover:-translate-y-1"
              >
                Start Free Consultation
              </Button>
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Telehealth Consultation"
                width={400}
                height={400}
                className="rounded-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Consultation Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Video Consultation</h3>
              <p className="text-slate-600 mb-6">
                Face-to-face video consultations with our doctors for a more personal experience.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Free
              </span>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Phone Consultation</h3>
              <p className="text-slate-600 mb-6">
                Speak with our doctors over the phone for convenient healthcare access.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Free
              </span>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Chat Consultation</h3>
              <p className="text-slate-600 mb-6">
                Text-based consultations for non-urgent health concerns and questions.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Free
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Common Conditions */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Common Conditions We Treat</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Our doctors can help with a wide range of health concerns through telehealth consultations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Cold & Flu</h3>
              <p className="text-sm text-slate-600">Symptoms, treatment, and advice</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Skin Conditions</h3>
              <p className="text-sm text-slate-600">Rashes, acne, and other skin issues</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Mental Health</h3>
              <p className="text-sm text-slate-600">Anxiety, depression, and stress</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Allergies</h3>
              <p className="text-sm text-slate-600">Seasonal allergies and reactions</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">UTIs</h3>
              <p className="text-sm text-slate-600">Urinary tract infections</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Digestive Issues</h3>
              <p className="text-sm text-slate-600">Stomach pain, nausea, and more</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Headaches</h3>
              <p className="text-sm text-slate-600">Migraines and tension headaches</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Sexual Health</h3>
              <p className="text-sm text-slate-600">STI concerns and contraception</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">
              Not sure if we can help with your condition? Contact us or start a consultation to find out.
            </p>
            <Link href="/consult">
              <Button className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                Start Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
