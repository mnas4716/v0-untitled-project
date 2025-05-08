import Link from "next/link"
import { Logo } from "@/components/logo"

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="white" />
            <p className="text-slate-400 mt-4">
              Connecting you with healthcare professionals online, anytime, anywhere.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/medical-certificate" className="text-slate-400 hover:text-white transition-colors">
                  Medical Certificates
                </Link>
              </li>
              <li>
                <Link href="/prescription" className="text-slate-400 hover:text-white transition-colors">
                  Online Prescriptions
                </Link>
              </li>
              <li>
                <Link href="/telehealth" className="text-slate-400 hover:text-white transition-colors">
                  Telehealth Consultations
                </Link>
              </li>
              <li>
                <Link href="/mental-health" className="text-slate-400 hover:text-white transition-colors">
                  Mental Health
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-slate-400 hover:text-white transition-colors">
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} freedoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
