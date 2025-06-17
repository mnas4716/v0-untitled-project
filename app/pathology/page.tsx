import { CheckCircle2, FileText, UserCheck, FileSpreadsheet, Microscope, HeartPulse, Dna } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"

const trustBadges = [
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2" />, text: "Referrals to Major Pathology Labs" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2" />, text: "AHPRA Registered Doctors" },
  { icon: <CheckCircle2 className="h-5 w-5 text-freedoc-blue mr-2" />, text: "Completely Free Service" },
]

const howItWorksStepsPathology = [
  {
    icon: <FileText className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Complete online request",
    description: "Provide details about your health and the reason for needing a pathology test.",
  },
  {
    icon: <UserCheck className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Doctor reviews your request",
    description: "An Australian Partner Doctor will assess your need for the requested pathology tests.",
  },
  {
    icon: <FileSpreadsheet className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Receive your referral",
    description: "If appropriate, your pathology referral will be sent to you to take to any major collection centre.",
  },
]

const commonTests = [
  "Full Blood Count",
  "Liver Function Tests",
  "Kidney Function Tests",
  "Thyroid Function Tests",
  "Cholesterol & Lipids",
  "Blood Sugar (Glucose/HbA1c)",
  "Iron Studies",
  "Vitamin D Levels",
  "STI Screening",
  "Urine Tests",
]

const whyChooseFreedocPathology = [
  {
    icon: <Microscope className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Easy Referrals",
    description: "Get necessary pathology referrals online without needing an in-person GP visit first.",
  },
  {
    icon: <HeartPulse className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Free & Convenient",
    description: "Our referral service is completely free, saving you time and potential consultation costs.",
  },
  {
    icon: <Dna className="h-10 w-10 text-freedoc-blue mb-3" />,
    title: "Comprehensive Care",
    description: "Our Partner Doctors can assess your needs and refer for a wide range of common tests.",
  },
]

const faqsPathology = [
  {
    question: "What pathology tests can I get a referral for?",
    answer:
      "Our Partner Doctors can provide free referrals for a wide range of common blood tests, urine tests, and STI screenings. The doctor will determine if the requested tests are appropriate based on your online submission.",
  },
  {
    question: "Where can I use the pathology referral?",
    answer:
      "Referrals issued through Freedoc are generally accepted at all major pathology collection centres across Australia (e.g., Sonic Healthcare, Healius, Australian Clinical Labs).",
  },
  {
    question: "Is the pathology test itself free?",
    answer:
      "Freedoc provides the doctor's consultation and referral service for free. The cost of the actual pathology tests will depend on the tests ordered and whether you are eligible for Medicare bulk billing at the collection centre. Many common tests are bulk-billed.",
  },
]

export default function PathologyPage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <div className="sticky top-[80px] z-30">
        <ComingSoonBanner />
      </div>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-freedoc-dark mb-4">Online Pathology Referrals</h1>
            <p className="text-lg text-freedoc-secondary mb-6">
              Get free referrals for a range of pathology tests from Australian Partner Doctors.
            </p>
            <p className="text-2xl font-semibold text-freedoc-blue mb-8">100% Free Referral Service</p>
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
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-4">How to Get a Pathology Referral</h2>
          <p className="text-lg text-freedoc-secondary mb-12 max-w-2xl mx-auto">
            A straightforward process to obtain your pathology referral online.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksStepsPathology.map((step, index) => (
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
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-4">Types of Tests We Can Refer For</h2>
          <p className="text-lg text-freedoc-secondary mb-12 max-w-2xl mx-auto">
            Our Partner Doctors can provide free referrals for many common pathology tests.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {commonTests.map((test) => (
              <span
                key={test}
                className="bg-blue-100 text-freedoc-blue px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              >
                {test}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-12">
            Why Get Your Pathology Referral Online?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseFreedocPathology.map((reason) => (
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
          <h2 className="text-3xl sm:text-4xl font-bold text-freedoc-dark mb-12 text-center">
            Pathology Referral FAQs
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            {faqsPathology.map((faq, index) => (
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
