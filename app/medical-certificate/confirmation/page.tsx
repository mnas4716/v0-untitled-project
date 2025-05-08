import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, FileText, Mail } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function MedicalCertificateConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md text-center transform transition-all hover:shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold mb-4 text-slate-800">Certificate Request Submitted</h1>
          <p className="text-slate-600 mb-6">
            Thank you for your medical certificate request. A doctor will review your information and issue your
            certificate shortly.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-slate-800">Certificate Delivery</span>
            </div>
            <p className="text-sm text-slate-600">
              Your medical certificate will be emailed to you at {new Date().toLocaleTimeString()} today.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-2">
              <Mail className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-slate-800">Confirmation Email</span>
            </div>
            <p className="text-sm text-slate-600">
              We've sent a confirmation email to your inbox. Please check your email for details about your request.
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/dashboard">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
