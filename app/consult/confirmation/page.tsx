import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Consultation Request Submitted</h1>
          <p className="text-lg text-slate-600 mb-8">
            Thank you for your consultation request. We have sent a confirmation email with your details to your email
            address. A doctor will review your information and connect with you shortly.
          </p>
          <p className="text-slate-600 mb-8">
            If you uploaded any documents, they have been received and will be reviewed along with your request.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
