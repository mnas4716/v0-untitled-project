import { FreedocHeader } from "../components/freedoc-header"
import { FreedocFooter } from "../components/freedoc-footer"
import { ComingSoonBanner } from "../components/coming-soon-banner"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const generalFaqs = [
  {
    question: "What is Freedoc?",
    answer:
      "Freedoc aims to be Australia's first truly free online doctor service, connecting you with Australian Partner Doctors for various healthcare needs without any cost for the consultation or service provided through our platform.",
  },
  {
    question: "Are the doctors qualified?",
    answer:
      "Yes, all Partner Doctors on the Freedoc platform are AHPRA (Australian Health Practitioner Regulation Agency) registered medical practitioners based in Australia.",
  },
  {
    question: "How can Freedoc offer services for free?",
    answer:
      "Our operational model is designed to provide core services free to the patient. More details on our funding and partnerships will be available as we fully launch.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes, we take your privacy and data security very seriously. We use industry-standard security measures to protect your personal and health information.",
  },
]

export default function FaqPage() {
  return (
    <div className="bg-white text-freedoc-dark">
      <FreedocHeader />
      <div className="sticky top-[80px] z-30">
        <ComingSoonBanner />
      </div>

      <section className="py-16 lg:py-24 bg-freedoc-blue-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="h-16 w-16 text-freedoc-blue mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-freedoc-dark mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-freedoc-secondary max-w-2xl mx-auto">
            Find answers to common questions about Freedoc and our services.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            {generalFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="text-lg hover:no-underline text-left py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-freedoc-secondary text-base pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-center mt-8 text-freedoc-secondary">
            More FAQs specific to each service can be found on the respective service pages. This page will be updated
            with more general questions as we launch.
          </p>
        </div>
      </section>

      <FreedocFooter />
    </div>
  )
}
