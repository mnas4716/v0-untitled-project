import { ArrowRight, Pill, Stethoscope, Brain, TestTube2, BookOpen, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { FreedocHeader } from "./components/freedoc-header"
import { FreedocFooter } from "./components/freedoc-footer"
import { ComingSoonBanner } from "./components/coming-soon-banner"

const services = [
  {
    name: "Online Prescriptions",
    href: "/prescription",
    icon: <Pill className="h-8 w-8 text-freedoc-blue" />,
    description: "Renew your scripts online quickly and easily.",
  },
  {
    name: "Medical Certificates",
    href: "/medical-certificate",
    icon: <Stethoscope className="h-8 w-8 text-freedoc-blue" />,
    description: "Get medical certificates for work or study.",
  },
  {
    name: "Mental Health Support",
    href: "/mental-health",
    icon: <Brain className="h-8 w-8 text-freedoc-blue" />,
    description: "Access mental health care plans and support.",
  },
  {
    name: "Telehealth Consults",
    href: "/telehealth",
    icon: <Stethoscope className="h-8 w-8 text-freedoc-blue" />,
    description: "Speak to an Australian Partner Doctor online.",
  },
  {
    name: "Pathology Referrals",
    href: "/pathology",
    icon: <TestTube2 className="h-8 w-8 text-freedoc-blue" />,
    description: "Online referrals for a range of pathology tests.",
  },
  {
    name: "How It Works",
    href: "/how-it-works",
    icon: <BookOpen className="h-8 w-8 text-freedoc-blue" />,
    description: "Learn how our online services operate.",
  },
]

export default function HomePage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <ComingSoonBanner />

      <section className="relative py-20 lg:py-28 bg-freedoc-blue-light overflow-hidden">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-freedoc-dark mb-6 leading-tight">
            Australia's First Truly <span className="text-freedoc-blue">Free</span> Online Doctor
          </h1>
          <p className="text-lg text-freedoc-secondary mb-8 max-w-2xl mx-auto">
            Freedoc connects you with Australian Partner Doctors for prescriptions, medical certificates, and more — all
            from the comfort of your home, completely free of charge.
          </p>
          <div className="inline-flex items-center justify-center bg-blue-100 text-freedoc-blue font-bold px-6 py-3 rounded-full">
            <BadgeCheck className="w-6 h-6 mr-2" />
            <span>100% Free Consultations & Services</span>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-16 text-center">How We Can Help You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                href={service.href}
                key={service.name}
                className="group block p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200"
              >
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold text-freedoc-dark ml-4">{service.name}</h3>
                </div>
                <p className="text-freedoc-secondary mb-4">{service.description}</p>
                <div className="text-freedoc-blue font-semibold flex items-center text-sm">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FreedocFooter />
    </div>
  )
}
