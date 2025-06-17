import { CheckCircle2, FileText, UserCheck, MessageSquare, ShieldCheck, Users, Smile } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"

const trustBadges = [
  {
    icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />,
    text: "Confidential & Secure Platform",
  },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />, text: "AHPRA Registered Doctors" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2 flex-shrink-0" />, text: "Completely Free Service" },
]

const howItWorksStepsMentalHealth = [
  {
    icon: <FileText className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Complete online assessment",
    description: "Fill out a confidential questionnaire about your mental health concerns and history.",
  },
  {
    icon: <UserCheck className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Doctor reviews your assessment",
    description: "An Australian Partner Doctor specializing in mental health will review your information.",
  },
  {
    icon: <MessageSquare className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Receive your plan or referral",
    description: "If appropriate, receive guidance, a mental health care plan, or a referral for further support.",
  },
]

const areasWeAssist = [
  "Stress & Anxiety",
  "Low Mood & Depression",
  "Sleep Difficulties",
  "Relationship Issues",
  "Grief & Loss",
  "General Wellbeing",
]

const whyChooseFreedocMH = [
  {
    icon: <Users className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Accessible Support",
    description: "Get initial mental health guidance without barriers, from the comfort of your home.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Confidential & Free",
    description: "Our platform is secure, and consultations for mental health support are entirely free.",
  },
  {
    icon: <Smile className="h-10 w-10 lg:h-12 lg:w-12 text-freedoc-blue mb-3" />,
    title: "Professional Guidance",
    description: "Connect with AHPRA registered doctors who can provide advice and referrals if needed.",
  },
]

const faqsMH = [
  {
    question: "What kind of mental health support can I get?",
    answer:
      "Our Partner Doctors can provide initial assessments, guidance for common mental health concerns like stress and anxiety, discuss potential coping strategies, and help determine if a mental health care plan or referral to a specialist is appropriate. This service is free.",
  },
  {
    question: "Is this service a replacement for therapy?",
    answer:
      "No, Freedoc provides initial consultations and guidance. For ongoing therapy or specialized psychiatric care, our doctors can provide referrals to appropriate services. Our goal is to make the first step in seeking help easier and free.",
  },
  {
    question: "How is my privacy protected?",
    answer:
      "We use a secure platform and adhere to strict privacy policies to ensure your personal and health information is kept confidential, in line with Australian healthcare regulations.",
  },
]

export default function MentalHealthPage() {
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
              Online Mental Health Support
            </h1>
            <p className="text-lg sm:text-xl text-freedoc-secondary mb-6">
              Access mental health assessments and guidance from Australian Partner Doctors, free of charge.
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-freedoc-dark mb-4">
            How Our Mental Health Service Works
          </h2>
          <p className="text-base sm:text-lg text-freedoc-secondary mb-12 max-w-2xl mx-auto">
            A simple, confidential process to access mental health support online.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksStepsMentalHealth.map((step, index) => (
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
            Areas We Can Assist With
          </h2>
          <p className="text-base sm:text-lg text-freedoc-secondary mb-12 max-w-2xl mx-auto">
            Our doctors can provide initial guidance for a range of concerns.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {areasWeAssist.map((area) => (
              <span
                key={area}
                className="bg-blue-100 text-freedoc-blue px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-freedoc-dark mb-12">
            Why Choose Freedoc for Mental Health Support?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseFreedocMH.map((reason) => (
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
            Mental Health FAQs
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            {faqsMH.map((faq, index) => (
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
