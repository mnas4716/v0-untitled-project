import { CheckCircle2, FileText, UserCheck, ClipboardList, Clock, ShieldCheck, BadgeDollarSign } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"

const trustBadges = [
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />, text: "100% Secure & Private" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />, text: "AHPRA Registered Doctors" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />, text: "Completely Free Service" },
]

const howItWorksSteps = [
  {
    icon: <FileText className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Complete online form",
    description: "Fill out our quick online form with your medical history and prescription details.",
  },
  {
    icon: <UserCheck className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Doctor reviews your request",
    description: "An Australian Partner Doctor will review your request and assess your suitability.",
  },
  {
    icon: <ClipboardList className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Prescription sent to your pharmacy",
    description: "If suitable, your script will be sent directly to your preferred pharmacy or to your phone.",
  },
]

const commonConditions = [
  "Asthma",
  "Blood Pressure",
  "Contraception",
  "Diabetes",
  "Eczema",
  "Hair Loss",
  "Migraine",
  "Reflux",
  "Sleep Issues",
  "Thyroid",
  "UTI",
  "Weight Loss",
]

const whyChooseFreedoc = [
  {
    icon: <Clock className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Convenient & Fast",
    description: "Skip the waiting room. Request your script online, anytime, anywhere.",
  },
  {
    icon: <BadgeDollarSign className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Absolutely Free",
    description: "No consultation fees, no hidden charges. Access healthcare without the cost.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Qualified Doctors",
    description: "Our Partner Doctors are AHPRA registered and based in Australia.",
  },
]

const faqs = [
  {
    question: "How does the free online prescription service work?",
    answer:
      "Our online prescription service allows you to request a repeat prescription by completing a secure online form. An Australian Partner Doctor reviews your request and, if appropriate, sends the prescription to your chosen pharmacy or directly to your phone, all free of charge.",
  },
  {
    question: "Is it safe to get a prescription online?",
    answer:
      "Yes, it is safe when conducted through a reputable platform like Freedoc. Our Partner Doctors are AHPRA registered and follow strict medical guidelines. We use secure technology to protect your personal information.",
  },
  {
    question: "What medications can I get prescribed?",
    answer:
      "We can help with renewals for many common medications for stable, ongoing conditions. We do not prescribe controlled drugs, S8 medications, or drugs of addiction. The doctor will assess your suitability based on your medical history.",
  },
  {
    question: "How long does it take to get my prescription?",
    answer:
      "Most requests are reviewed by a doctor within a few hours, though it can sometimes take up to 24 hours. Once approved, the prescription is sent to your pharmacy or phone promptly.",
  },
]

export default function PrescriptionPage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <div className="sticky top-[80px] z-30">
        <ComingSoonBanner />
      </div>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-freedoc-dark mb-4">Online Prescriptions</h1>
            <p className="text-lg sm:text-xl text-freedoc-secondary mb-6">
              Get your script renewed online by one of our Australian Partner Doctors.
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-freedoc-blue mb-8">100% Free Consultation</p>
            <div className="space-y-3 flex flex-col items-center sm:items-start">
              {trustBadges.map((badge) => (
                <div key={badge.text} className="flex items-center text-freedoc-secondary text-sm sm:text-base">
                  {badge.icon}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-freedoc-dark mb-4">How it works</h2>
          <p className="text-base sm:text-lg text-freedoc-secondary mb-12 max-w-2xl mx-auto">
            Get your prescription in 3 simple steps
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={step.title} className="p-6 sm:p-8 bg-white rounded-lg shadow-lg border border-slate-200">
                <div className="flex justify-center items-center mb-4">{step.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-freedoc-dark mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-freedoc-secondary text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-freedoc-dark mb-4">
            Common Conditions We Treat
          </h2>
          <p className="text-base sm:text-lg text-freedoc-secondary mb-12 max-w-2xl mx-auto">
            We can help with a wide range of common conditions and repeat prescriptions.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {commonConditions.map((condition) => (
              <span
                key={condition}
                className="bg-blue-100 text-freedoc-blue px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-freedoc-dark mb-12">
            Why Choose Freedoc for Online Prescriptions?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseFreedoc.map((reason) => (
              <div key={reason.title} className="p-6">
                <div className="flex justify-center items-center mb-4">{reason.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-freedoc-dark mb-2">{reason.title}</h3>
                <p className="text-freedoc-secondary text-sm sm:text-base">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-freedoc-dark mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="text-lg sm:text-xl hover:no-underline text-left py-4 font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-freedoc-secondary text-base sm:text-lg pb-4 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FreedocFooter />
    </div>
  )
}
