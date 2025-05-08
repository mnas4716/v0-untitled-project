import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">Privacy Policy</h1>
          <p className="text-slate-600 mb-6">Last Updated: May 1, 2023</p>

          <div className="prose prose-slate max-w-none">
            <p>
              At freedoc, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our telehealth platform and services.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, date of birth, email address, phone number, and address.
              </li>
              <li>
                <strong>Health Information:</strong> Medical history, symptoms, diagnoses, treatments, and
                prescriptions.
              </li>
              <li>
                <strong>Payment Information:</strong> While our services are free, we may collect payment information
                for prescription deliveries or other optional services.
              </li>
              <li>
                <strong>Account Information:</strong> Login credentials and preferences.
              </li>
            </ul>

            <p>We also collect information automatically when you use our platform:</p>
            <ul>
              <li>
                <strong>Usage Data:</strong> How you interact with our platform, including pages visited and features
                used.
              </li>
              <li>
                <strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We use cookies to enhance your experience and collect
                information about how you use our platform.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our telehealth services</li>
              <li>Connect you with healthcare providers</li>
              <li>Process and fulfill prescription requests and medical certificates</li>
              <li>Communicate with you about your care and our services</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect against, identify, and prevent fraud and other illegal activities</li>
              <li>Comply with legal obligations and healthcare regulations</li>
            </ul>

            <h2>Disclosure of Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>
                <strong>Healthcare Providers:</strong> Doctors and other healthcare professionals who provide services
                through our platform.
              </li>
              <li>
                <strong>Service Providers:</strong> Third parties that perform services on our behalf, such as hosting,
                data analysis, and customer service.
              </li>
              <li>
                <strong>Pharmacies:</strong> When you request prescriptions that need to be filled.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, such as in response to a subpoena or court
                order.
              </li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from
              unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the
              Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights and Choices</h2>
            <p>You have certain rights regarding your personal information:</p>
            <ul>
              <li>Access and update your information through your account settings</li>
              <li>Request a copy of the personal information we hold about you</li>
              <li>Ask us to correct or delete your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for children under 16 years of age. We do not knowingly collect personal
              information from children under 16. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
              "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@freedoc.com.au" className="text-blue-600 hover:underline">
                privacy@freedoc.com.au
              </a>
              <br />
              or
              <br />
              freedoc
              <br />
              Level 10, 123 Pitt Street
              <br />
              Sydney, NSW 2000
              <br />
              Australia
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  )
}
