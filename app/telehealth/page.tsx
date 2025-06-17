import { CheckCircle2, FileText, UserCheck, Video, Clock, Tv, Users2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"

const trustBadges = [
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2" />, text: "Secure Video/Phone Consultations" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2" />, text: "Experienced AHPRA Registered Doctors" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2" />, text: "Completely Free Service" },
]

const howItWorksStepsTelehealth = [
  {
    icon: <FileText className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Request a consultation",
    description: "Briefly describe your health concern and select a preferred time if applicable.",
  },
  {
    icon: <UserCheck className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Doctor connects with you",
    description: "An Australian Partner Doctor will initiate a secure video or phone call at the scheduled time.",
  },
  {
    icon: <Video className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Discuss your health needs",
    description: "Have a private consultation with the doctor to discuss your symptoms and receive medical advice.",
  },
]

const commonIssues = [
  "Cold & Flu Symptoms",
  "Minor Infections (e.g., UTI, skin)",
  "General Medical Advice",
  "Medication Queries",
  "Referral Letters (non-urgent)",
  "Lifestyle Advice",
]

const whyChooseFreedocTH = [
  {
    icon: <Clock className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Convenient Access",
    description: "Speak to a doctor from anywhere, saving travel time and fitting into your schedule.",
  },
  {
    icon: <Tv className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Free & Secure",
    description: "All telehealth consultations are free and conducted over a secure platform.",
  },
  {
    icon: <Users2 className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Quality Care",
    description: "Receive advice from AHPRA registered Australian doctors for a range of common health issues.",
  },
]

const faqsTH = [
  {
    question: "What can I use telehealth for?",
    answer:
      "Telehealth is suitable for non-emergency medical advice, discussing symptoms, medication queries, obtaining certain referrals, and follow-up consultations. It's ideal for situations where a physical examination isn't essential. This service is free.",
  },
  {
    question: "How do I connect for my telehealth appointment?",
    answer:
      "You will receive instructions on how to connect via secure video or phone call once your appointment is confirmed. Ensure you have a stable internet connection and a private space for your consultation.",
  },
  {
    question: "Can I get a prescription or medical certificate via telehealth?",
    answer:
      "Yes, if the doctor deems it appropriate during your free telehealth consultation, they can issue prescriptions or medical certificates. Please see our specific pages for those services for more details.",
  },
]

export default function TelehealthPage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <div className="sticky top-[80px] z-30">
        <ComingSoonBanner />
      </div>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="max-w-3xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-freedoc-dark mb-4">Online Telehealth Consultations</h1>
              <p className="text-lg text-freedoc-secondary mb-6">
                Speak with an Australian Partner Doctor via video or phone, from anywhere, for free.
              </p>
              <p className="text-2xl font-semibold text-freedoc-blue mb-8">100% Free Consultation</p>
              <div className="mt-10 space-y-3 flex flex-col items-center">
                {trustBadges.map((badge) => (
                  <div key={badge.text} className="flex items-center text-freedoc-secondary">
                    {badge.icon}
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-4">How Telehealth Works</h2>
          <p className="text-lg text-freedoc-secondary mb-12 max-w-2xl mx-auto">
            Connect with a doctor online in three easy steps.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksStepsTelehealth.map((step, index) => (
              <div key={step.title} className="p-8 bg-white rounded-lg shadow-md border border-slate-200">
                <div className="flex justify-center items-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-freedoc-dark mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-freedoc-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-4">
            Common Issues Addressed via Telehealth
          </h2>
          <p className="text-lg text-freedoc-secondary mb-12 max-w-2xl mx-auto">
            Our doctors can provide free advice for many common health concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {commonIssues.map((issue) => (
              <span
                key={issue}
                className="bg-blue-100 text-freedoc-blue px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              >
                {issue}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-12">Benefits of Freedoc Telehealth</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseFreedocTH.map((reason) => (
              <div key={reason.title} className="p-6">
                <div className="flex justify-center items-center mb-4">{reason.icon}</div>
                <h3 className="text-xl font-semibold text-freedoc-dark mb-2">{reason.title}</h3>
                <p className="text-freedoc-secondary">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-12 text-center">Telehealth FAQs</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            {faqsTH.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="text-lg hover:no-underline text-left py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-freedoc-secondary text-base pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FreedocFooter />
    </div>
  )
}
