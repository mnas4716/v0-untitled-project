import Link from "next/link"

export function FreedocFooter() {
  return (
    <footer className="bg-slate-100 text-freedoc-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-semibold text-freedoc-dark mb-3">Services</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/prescription" className="hover:text-freedoc-blue">
                  Online Prescriptions
                </Link>
              </li>
              <li>
                <Link href="/medical-certificate" className="hover:text-freedoc-blue">
                  Medical Certificates
                </Link>
              </li>
              <li>
                <Link href="/mental-health" className="hover:text-freedoc-blue">
                  Mental Health
                </Link>
              </li>
              <li>
                <Link href="/telehealth" className="hover:text-freedoc-blue">
                  Telehealth
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-freedoc-dark mb-3">About</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="hover:text-freedoc-blue">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-freedoc-blue">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-freedoc-blue">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-freedoc-blue">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-freedoc-dark mb-3">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-freedoc-blue">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-freedoc-blue">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-freedoc-dark mb-3">Connect</h5>
            <p className="text-sm">Follow us for updates!</p>
          </div>
        </div>
        <div className="text-center text-slate-500 text-sm border-t border-slate-200 pt-8">
          © {new Date().getFullYear()} Freedoc. All rights reserved.
          <p className="text-xs mt-2 max-w-3xl mx-auto">
            This website is for informational purposes and does not constitute medical advice. Always consult with a
            qualified healthcare provider for any health concerns or before making any decisions related to your health
            or treatment.
          </p>
        </div>
      </div>
    </footer>
  )
}
