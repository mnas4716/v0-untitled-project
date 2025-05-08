import Link from "next/link"
import { CheckCircle, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrescriptionConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Prescription Request Submitted</h1>
            <p className="text-slate-600 mb-6">
              Thank you for your prescription request. A doctor will review your information and process your
              prescription shortly.
            </p>
            <p className="text-slate-600 mb-6">
              We've sent a confirmation email to your email address with the details of your request.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">Go to Dashboard</Button>
              </Link>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            If you have any questions, please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
