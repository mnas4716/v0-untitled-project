import { CheckCircle2, FileText, UserCheck, MessageSquare, ShieldCheck, Clock, Users } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"

const generalSteps = [
  {
    number: 1,
    icon: <FileText className="h-12 w-12 text-freedoc-blue mb-4" />,
    title: "Select Your Service",
    description:
      "Choose the service you need from our website – whether it's an online prescription, medical certificate, mental health support, telehealth consultation, or pathology referral.",
  },
  {
    number: 2,
    icon: <UserCheck className="h-12 w-12 text-freedoc-blue mb-4" />,
    title: "Complete Online Form/Assessment",
    description:
      "Fill out a secure online form relevant to your chosen service. Provide accurate information about your health, symptoms, and needs. This helps our Partner Doctors assess your request.",
  },
  {
    number: 3,
    icon: <MessageSquare className="h-12 w-12 text-freedoc-blue mb-4" />,
    title: "Doctor Review & Consultation",
    description:
      "An AHPRA registered Australian Partner Doctor will review your submission. For some services like telehealth, this may involve a direct video or phone consultation. For others, the review is based on your form.",
  },
  {
    number: 4,
    icon: <CheckCircle2 className="h-12 w-12 text-freedoc-blue mb-4" />,
    title: "Receive Outcome/Service",
    description:
      "If your request is approved and deemed appropriate by the doctor, you'll receive your prescription, medical certificate, referral, or advice directly through our secure platform or to your email/phone. All services are free.",
  },
]

const whatToExpect = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-freedoc-blue mr-3" />,
    title: "Privacy and Security",
    description: "Your personal and health information is protected with industry-standard security measures.",
  },
  {
    icon: <Clock className="h-8 w-8 text-freedoc-blue mr-3" />,
    title: "Timely Responses",
    description: "Our Partner Doctors aim to review requests promptly, typically within a few hours.",
  },
  {
    icon: <Users className="h-8 w-8 text-freedoc-blue mr-3" />,
    title: "Professional Care",
    description: "All consultations and reviews are conducted by AHPRA registered Australian doctors.",
  },
]

const faqsHIW = [
  {
    question: "Is Freedoc really free?",
    answer:
      "Yes, all consultations and services provided directly by Freedoc Partner Doctors through our platform are completely free. This includes online prescriptions, medical certificates, mental health support consultations, telehealth consultations, and pathology referrals.",
  },
  {
    question: "Who are the doctors?",
    answer:
      "Our Partner Doctors are all AHPRA (Australian Health Practitioner Regulation Agency) registered medical practitioners based in Australia, with experience in providing telehealth services.",
  },
  {
    question: "What if my request is not approved?",
    answer:
      "The doctor will assess your request based on clinical appropriateness and safety. If your request cannot be fulfilled online, the doctor may provide advice or recommend an in-person consultation with your local GP. There is no charge even if your request is not approved.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply navigate to the service you require from our homepage or menu, and follow the prompts to complete the online form. The process is designed to be quick and straightforward.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <div className="sticky top-[80px] z-30">
        <ComingSoonBanner />
      </div>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-freedoc-dark mb-4">How Freedoc Works</h1>
          <p className="text-lg text-freedoc-secondary max-w-2xl mx-auto">
            Accessing free online healthcare services with Freedoc is simple and convenient. Here’s a general overview
            of our process.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {generalSteps.map((step) => (
              <div key={step.number} className="p-6 bg-white rounded-lg shadow-md border border-slate-200 text-center">
                <div className="flex justify-center items-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-freedoc-dark mb-2">
                  Step {step.number}: {step.title}
                </h3>
                <p className="text-freedoc-secondary text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-12 text-center">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {whatToExpect.map((item) => (
              <div key={item.title} className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                  {item.icon}
                  <h3 className="text-xl font-semibold text-freedoc-dark">{item.title}</h3>
                </div>
                <p className="text-freedoc-secondary text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-12 text-center">
            General FAQs about Freedoc
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            {faqsHIW.map((faq, index) => (
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
