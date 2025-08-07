import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-slate-800">Cookie Policy</h1>
          <p className="text-slate-600 mb-6">Last Updated: May 1, 2023</p>

          <div className="prose prose-slate max-w-none">
            <p>
              This Cookie Policy explains how freedoc ("we", "us", or "our") uses cookies and similar technologies on
              our website and mobile application (collectively, the "Services"). This policy is designed to help you
              understand what cookies are, how we use them, and the choices you have regarding their use.
            </p>

            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a
              website. They are widely used to make websites work more efficiently and provide information to the
              website owners. Cookies enhance user experience by remembering your preferences and enabling certain site
              functions.
            </p>

            <h2>Types of Cookies We Use</h2>
            <p>We use the following types of cookies on our Services:</p>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the Services to function properly. They enable core functionality such as
              security, network management, and account access. You cannot opt out of these cookies.
            </p>

            <h3>Performance and Analytics Cookies</h3>
            <p>
              These cookies collect information about how visitors use our Services, such as which pages they visit most
              often and if they receive error messages. This information helps us improve our Services and user
              experience. All information collected by these cookies is aggregated and anonymous.
            </p>

            <h3>Functionality Cookies</h3>
            <p>
              These cookies allow our Services to remember choices you make (such as your username, language, or region)
              and provide enhanced, more personal features. They may also be used to provide services you have
              requested, such as watching a video or commenting on a blog.
            </p>

            <h3>Targeting and Advertising Cookies</h3>
            <p>
              These cookies are used to deliver advertisements that are more relevant to you and your interests. They
              are also used to limit the number of times you see an advertisement and help measure the effectiveness of
              advertising campaigns.
            </p>

            <h2>Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third parties on our behalf. These third parties may include analytics
              providers, advertising networks, and social media platforms. These third parties may use cookies, web
              beacons, and similar technologies to collect information about your use of our Services and other
              websites.
            </p>

            <h2>How Long Do Cookies Stay on My Device?</h2>
            <p>
              The length of time a cookie will remain on your device depends on whether it is a "persistent" or
              "session" cookie:
            </p>
            <ul>
              <li>
                <strong>Session cookies:</strong> These cookies are temporary and are deleted when you close your
                browser.
              </li>
              <li>
                <strong>Persistent cookies:</strong> These cookies remain on your device until they expire or are
                deleted manually.
              </li>
            </ul>

            <h2>Your Cookie Choices</h2>
            <p>You have several options to control or limit how we and our partners use cookies:</p>
            <ul>
              <li>
                <strong>Browser settings:</strong> Most web browsers allow you to manage your cookie preferences. You
                can set your browser to refuse cookies or delete certain cookies. Generally, you can also set your
                browser to notify you when you receive a cookie, giving you the chance to decide whether to accept it.
              </li>
              <li>
                <strong>Opt-out mechanisms:</strong> We provide opt-out mechanisms for certain types of cookies. You can
                adjust your preferences in our cookie banner or privacy settings.
              </li>
              <li>
                <strong>Mobile devices:</strong> On mobile devices, you can limit tracking by using the settings
                available on your device.
              </li>
            </ul>

            <p>
              Please note that if you choose to block or delete cookies, certain features of our Services may not
              operate correctly.
            </p>

            <h2>Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our
              business practices. Any changes will become effective when we post the revised policy. We encourage you to
              periodically review this page for the latest information on our cookie practices.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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
