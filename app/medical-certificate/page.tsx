import {
  CheckCircle2,
  FileText,
  UserCheck,
  FileSpreadsheet,
  Clock,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Baby,
  BadgeCheckIcon as CheckBadge,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"

const trustBadges = [
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />, text: "AHPRA Registered Doctors" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />, text: "Accepted Australia-Wide" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />, text: "Secure & Confidential" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />, text: "Completely Free Service" },
]

const howItWorksStepsMc = [
  {
    icon: <FileText className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Complete online form",
    description: "Fill out a simple online questionnaire about your symptoms and reasons for needing a certificate.",
  },
  {
    icon: <UserCheck className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Doctor reviews your request",
    description: "An Australian Partner Doctor will review your information to assess your eligibility.",
  },
  {
    icon: <FileSpreadsheet className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Receive your certificate",
    description: "If approved, your medical certificate will be securely sent to your email, typically within hours.",
  },
]

const usesOfCertificate = [
  { icon: <Briefcase className="h-6 w-6 text-freedoc-blue mr-3 flex-shrink-0" />, text: "Absence from Work" },
  {
    icon: <GraduationCap className="h-6 w-6 text-freedoc-blue mr-3 flex-shrink-0" />,
    text: "Absence from University or School",
  },
  {
    icon: <Baby className="h-6 w-6 text-freedoc-blue mr-3 flex-shrink-0" />,
    text: "Carer's Leave (for family members)",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-freedoc-blue mr-3 flex-shrink-0" />,
    text: "Other general purpose leave",
  },
]

const whyChooseFreedocMc = [
  {
    icon: <Clock className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Fast & Easy",
    description: "Get your medical certificate quickly without leaving home. Simple online process.",
  },
  {
    icon: <CheckBadge className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Accepted Australia-Wide",
    description: "Our medical certificates are issued by AHPRA registered doctors and are widely accepted.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Qualified Doctors & Free",
    description: "All requests are reviewed by experienced Australian Partner Doctors, completely free.",
  },
]

const faqsMc = [
  {
    question: "How quickly will I receive my medical certificate?",
    answer:
      "Most medical certificates are issued within a few hours of submitting your request, provided it's approved by the doctor. In some cases, it may take up to 24 hours. This service is entirely free.",
  },
  {
    question: "Is an online medical certificate valid?",
    answer:
      "Yes, medical certificates obtained online from services like Freedoc, issued by AHPRA registered doctors, are legitimate and generally accepted by employers and educational institutions across Australia.",
  },
  {
    question: "What information is on the medical certificate?",
    answer:
      "The certificate will include your name, the date of consultation, the period you are unfit for work/study, the doctor's details, and their AHPRA registration number.",
  },
  {
    question: "Can I get a certificate for multiple days?",
    answer:
      "Yes, depending on the doctor's assessment of your condition, certificates can be issued for single or multiple days. Please provide accurate information in your online form.",
  },
]

export default function MedicalCertificatePage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <div className="sticky top-[80px] z-30">
        <ComingSoonBanner />
      </div>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-freedoc-dark mb-4">
              Online Medical Certificates
            </h1>
            <p className="text-lg sm:text-xl text-freedoc-secondary mb-6">
              Get a medical certificate online from an Australian Partner Doctor.
            </p>
            <p className="text-xl sm:text-2xl font-semibold text-freedoc-blue mb-8">100% Free Certificate</p>
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-freedoc-dark mb-4">
            How to Get Your Medical Certificate
          </h2>
          <p className="text-base sm:text-lg text-freedoc-secondary mb-12 max-w-2xl mx-auto">
            A simple and confidential process to get your certificate online.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksStepsMc.map((step, index) => (
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-freedoc-dark mb-12 text-center">
            When Can You Use an Online Medical Certificate?
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {usesOfCertificate.map((use) => (
              <div
                key={use.text}
                className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {use.icon}
                <span className="text-freedoc-dark ml-3 text-sm sm:text-base">{use.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-freedoc-dark mb-12">
            Why Choose Freedoc for Medical Certificates?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseFreedocMc.map((reason) => (
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
            Medical Certificate FAQs
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            {faqsMc.map((faq, index) => (
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
