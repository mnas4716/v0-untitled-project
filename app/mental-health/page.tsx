import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ArrowRight, Brain, Heart, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function MentalHealthPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader activePage="mental-health" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Online Mental Health Support</h2>
            <p className="text-lg mb-6">
              Access professional mental health care from the comfort of your home. Our experienced doctors provide
              confidential support for a range of mental health concerns.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Confidential and private consultations</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Experienced mental health professionals</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Prescription medications when appropriate</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-300" />
                <span>Ongoing support and follow-up care</span>
              </li>
            </ul>
            <Link href="/consult">
              <Button
                size="lg"
                className="bg-white hover:bg-blue-50 text-blue-600 transition-all transform hover:-translate-y-1"
              >
                Book Mental Health Consultation
              </Button>
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Mental Health Support"
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
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Mental Health Services</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Our doctors can help with a wide range of mental health concerns through confidential online consultations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Anxiety & Depression</h3>
              <p className="text-slate-600 mb-6">
                Get support for anxiety, depression, and mood disorders with evidence-based treatments and medication
                management.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Free Consultation
              </span>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Stress Management</h3>
              <p className="text-slate-600 mb-6">
                Learn effective strategies to manage stress, improve sleep, and enhance your overall wellbeing.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Free Consultation
              </span>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Relationship Issues</h3>
              <p className="text-slate-600 mb-6">
                Address relationship challenges, communication problems, and family concerns with professional guidance.
              </p>
              <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Free Consultation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Common Conditions */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">Mental Health Conditions We Treat</h2>
          <p className="text-center text-slate-600 mb-12 max-w-3xl mx-auto">
            Our doctors are experienced in treating a wide range of mental health conditions.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Anxiety Disorders</h3>
              <p className="text-sm text-slate-600">Generalized anxiety, panic attacks, phobias</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Depression</h3>
              <p className="text-sm text-slate-600">Major depression, persistent depressive disorder</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">ADHD</h3>
              <p className="text-sm text-slate-600">Attention deficit hyperactivity disorder</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Insomnia</h3>
              <p className="text-sm text-slate-600">Sleep disorders and sleep management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">PTSD</h3>
              <p className="text-sm text-slate-600">Post-traumatic stress disorder</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">OCD</h3>
              <p className="text-sm text-slate-600">Obsessive-compulsive disorder</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Bipolar Disorder</h3>
              <p className="text-sm text-slate-600">Mood stabilization and management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <h3 className="font-semibold mb-2 text-slate-800">Stress</h3>
              <p className="text-sm text-slate-600">Work-related stress and burnout</p>
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

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Our Approach to Mental Health Care</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-slate-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Confidential & Private</h3>
              <p className="text-slate-600">
                Your privacy is our priority. All consultations are completely confidential and conducted in a secure
                environment.
              </p>
            </div>

            <div className="text-center bg-slate-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Personalized Care</h3>
              <p className="text-slate-600">
                We develop individualized treatment plans tailored to your specific needs, goals, and circumstances.
              </p>
            </div>

            <div className="text-center bg-slate-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Ongoing Support</h3>
              <p className="text-slate-600">
                We provide continuous support with follow-up appointments and check-ins to monitor your progress and
                adjust treatment as needed.
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
              <h2 className="text-3xl font-bold text-white mb-4">Ready to take the first step?</h2>
              <p className="text-blue-100 mb-8">
                Our mental health professionals are here to help. Book a consultation today and start your journey to
                better mental wellbeing.
              </p>
              <Link href="/consult">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all transform hover:-translate-y-1"
                >
                  Book Mental Health Consultation
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
