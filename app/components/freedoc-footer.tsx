import Link from "next/link"

export function FreedocFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-freedoc-blue/5 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h5 className="font-semibold text-white mb-4 text-lg">Services</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/prescription"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Online Prescriptions
                </Link>
              </li>
              <li>
                <Link
                  href="/medical-certificate"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Medical Certificates
                </Link>
              </li>
              <li>
                <Link
                  href="/mental-health"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Mental Health
                </Link>
              </li>
              <li>
                <Link
                  href="/telehealth"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Telehealth
                </Link>
              </li>
              <li>
                <Link
                  href="/pathology"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Pathology
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4 text-lg">About</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4 text-lg">Legal</h5>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="hover:text-freedoc-blue transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4 text-lg">Connect</h5>
            <p className="text-sm text-slate-400 leading-relaxed">Follow us for updates on our re-launch!</p>
          </div>
        </div>
        <div className="text-center text-slate-400 text-sm border-t border-slate-700 pt-8">
          <div className="bg-gradient-to-r from-freedoc-blue to-indigo-600 bg-clip-text text-transparent font-semibold text-lg mb-2">
            © {new Date().getFullYear()} Freedoc. All rights reserved.
          </div>
          <p className="text-xs mt-2 max-w-3xl mx-auto leading-relaxed">
            This website is for informational purposes and does not constitute medical advice. Always consult with a
            qualified healthcare provider for any health concerns or before making any decisions related to your health
            or treatment.
          </p>
        </div>
      </div>
    </footer>
  )
}
