import { Card, CardContent } from "@/components/ui/card"
import { Clock, MessageSquare, Users, Mail, Phone, MapPin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader activePage="contact" />

      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're here to help with any questions you might have about our telehealth services. Our team is dedicated
              to providing you with the support you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">General Inquiries</h3>
                  <p className="text-gray-600 text-sm">
                    For general questions about our services, pricing, or how our platform works.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Patient Support</h3>
                  <p className="text-gray-600 text-sm">
                    For assistance with bookings, prescriptions, medical certificates, or account issues.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Response Time</h3>
                  <p className="text-gray-600 text-sm">
                    We aim to respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">How to Reach Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600 text-sm">
                  For non-urgent inquiries, email is the best way to reach our team.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-600 text-sm">
                  Our support team is available during business hours to assist you.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-gray-600 text-sm">Our main office is located in Sydney, Australia.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <div>
                <h3 className="font-semibold">What are your operating hours?</h3>
                <p className="text-gray-600">
                  Our telehealth services are available 7 days a week from 8am to 10pm AEST.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">How quickly can I speak with a doctor?</h3>
                <p className="text-gray-600">
                  Most patients can connect with a doctor within 15-30 minutes during operating hours.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Are your doctors qualified?</h3>
                <p className="text-gray-600">
                  Yes, all our doctors are fully qualified, registered medical practitioners in Australia.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">How do I get my prescription?</h3>
                <p className="text-gray-600">
                  After your consultation, prescriptions can be sent electronically to your preferred pharmacy or
                  delivered to your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
