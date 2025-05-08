import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">Terms of Service</h1>
          <p className="text-slate-600 mb-6">Last Updated: May 1, 2023</p>

          <div className="prose prose-slate max-w-none">
            <p>
              Welcome to freedoc. These Terms of Service ("Terms") govern your use of the freedoc website, mobile
              application, and services (collectively, the "Services"). Please read these Terms carefully before using
              our Services.
            </p>

            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
              Terms, please do not use our Services.
            </p>

            <h2>1. Services Description</h2>
            <p>
              freedoc provides telehealth services that connect users with healthcare professionals for online
              consultations, prescriptions, and medical certificates. Our Services are intended for informational and
              educational purposes and to facilitate healthcare delivery.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 16 years of age to use our Services. If you are under 18, you must have the consent
              of a parent or guardian. By using our Services, you represent and warrant that you meet all eligibility
              requirements.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of our Services, you may need to create an account. You are responsible for
              maintaining the confidentiality of your account credentials and for all activities that occur under your
              account. You agree to provide accurate and complete information when creating your account and to update
              your information as necessary.
            </p>

            <h2>4. Medical Disclaimer</h2>
            <p>
              The Services are not intended to replace professional medical advice, diagnosis, or treatment. Always seek
              the advice of your physician or other qualified health provider with any questions you may have regarding
              a medical condition.
            </p>

            <p>
              In case of a medical emergency, call emergency services (000 in Australia) immediately or go to your
              nearest emergency department.
            </p>

            <h2>5. Telehealth Consultations</h2>
            <p>
              Our Services connect you with healthcare professionals who provide telehealth consultations. These
              healthcare professionals are independent providers and are solely responsible for the care they provide.
              freedoc does not provide medical services directly.
            </p>

            <p>
              Telehealth has limitations, and in some cases, an in-person consultation may be more appropriate. Our
              healthcare professionals will advise you if they believe you should seek in-person care.
            </p>

            <h2>6. Prescriptions and Medical Certificates</h2>
            <p>
              Prescriptions and medical certificates are issued at the discretion of the healthcare professional based
              on their professional judgment. There is no guarantee that a consultation will result in a prescription or
              medical certificate.
            </p>

            <p>
              All prescriptions are subject to relevant state and federal laws and regulations. Certain medications may
              not be available through our Services.
            </p>

            <h2>7. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Services for any illegal purpose or in violation of any laws</li>
              <li>Provide false or misleading information</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Attempt to gain unauthorized access to any part of the Services</li>
              <li>Use the Services to harm, threaten, or harass any person</li>
              <li>Use the Services to transmit any harmful code or material</li>
            </ul>

            <h2>8. Intellectual Property</h2>
            <p>
              The Services and all content and materials available through the Services are the property of freedoc or
              its licensors and are protected by intellectual property laws. You may not use, reproduce, distribute,
              modify, or create derivative works of our content without our express permission.
            </p>

            <h2>9. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>{" "}
              to understand how we collect, use, and disclose information about you.
            </p>

            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your access to the Services at any time, without prior notice or liability,
              for any reason, including if you breach these Terms.
            </p>

            <h2>11. Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR
              IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </p>

            <h2>12. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL FREEDOC, ITS DIRECTORS, EMPLOYEES, PARTNERS,
              AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE
              LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
            </p>

            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of New South Wales, Australia,
              without regard to its conflict of law provisions.
            </p>

            <h2>14. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. The updated version will be indicated by an updated "Last
              Updated" date. We encourage you to review these Terms periodically.
            </p>

            <h2>15. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:legal@freedoc.com.au" className="text-blue-600 hover:underline">
                legal@freedoc.com.au
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
