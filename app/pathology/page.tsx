import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TestTube, Microscope, FileText, Clock, Heart, ShieldCheck } from "lucide-react"

export default function PathologyPage() {
  return (
    <>
      <SiteHeader activePage="pathology" />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pathology Testing Made Simple</h1>
                <p className="text-lg text-slate-700 mb-6">
                  Get pathology referrals online and access a wide range of tests from the comfort of your home. Our
                  doctors can provide referrals for blood tests, men's and women's health screenings, STI testing, and
                  more.
                </p>
                <div>
                  <Link href="/consult">
                    <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">Book Consultation</Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/pathology-lab-technician.png"
                  alt="Medical laboratory technician analyzing blood samples"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">Our Pathology Services</h2>

            {/* Image without text overlay */}
            <div className="mb-12 relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mx-auto max-w-4xl">
              <Image
                src="/pathology-blood-collection.png"
                alt="Healthcare professional collecting blood sample for pathology testing"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Blood Tests */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <TestTube className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Blood Tests</h3>
                <ul className="space-y-2 text-slate-700 mb-4">
                  <li>• Comprehensive blood panels</li>
                  <li>• Liver and kidney function tests</li>
                  <li>• Cholesterol and lipid profiles</li>
                  <li>• Diabetes screening and monitoring</li>
                  <li>• Thyroid function tests</li>
                  <li>• Iron studies and vitamin levels</li>
                </ul>
                <Link href="/consult">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Request Referral
                  </Button>
                </Link>
              </div>

              {/* Men's & Women's Health */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Men's & Women's Health</h3>
                <ul className="space-y-2 text-slate-700 mb-4">
                  <li>• Hormone level testing</li>
                  <li>• Fertility assessments</li>
                  <li>• Prostate-specific antigen (PSA)</li>
                  <li>• Pregnancy and prenatal testing</li>
                  <li>• Menopause assessments</li>
                  <li>• Cancer screening markers</li>
                </ul>
                <Link href="/consult">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Request Referral
                  </Button>
                </Link>
              </div>

              {/* STI Testing */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Microscope className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">STI Testing</h3>
                <ul className="space-y-2 text-slate-700 mb-4">
                  <li>• Comprehensive STI panels</li>
                  <li>• HIV and hepatitis testing</li>
                  <li>• Chlamydia and gonorrhea screening</li>
                  <li>• Syphilis testing</li>
                  <li>• HPV testing</li>
                  <li>• Confidential results and counseling</li>
                </ul>
                <Link href="/consult">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Request Referral
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
              How Our Pathology Service Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Book a Consultation</h3>
                      <p className="text-slate-700">
                        Schedule a telehealth consultation with one of our qualified doctors. Discuss your health
                        concerns and the tests you may need.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Receive Your Referral</h3>
                      <p className="text-slate-700">
                        After your consultation, the doctor will provide a pathology referral if appropriate. This will
                        be sent to you electronically within minutes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <TestTube className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Visit a Collection Center</h3>
                      <p className="text-slate-700">
                        Take your referral to any approved pathology collection center. Some tests may also be available
                        with home collection services.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">Review Results with Doctor</h3>
                      <p className="text-slate-700">
                        Once your results are ready, schedule a follow-up consultation to review them with your doctor
                        and discuss any necessary treatment plans.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/telehealth-pathology-review.png"
                  alt="Doctor reviewing pathology results"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Do I need to fast before my blood test?</h3>
                <p className="text-slate-700">
                  Some blood tests require fasting, while others don't. Your doctor will advise you on any preparation
                  needed for your specific tests during your consultation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  How quickly will I receive my test results?
                </h3>
                <p className="text-slate-700">
                  Most routine test results are available within 1-3 business days. Some specialized tests may take
                  longer. Your doctor will discuss the expected timeframe during your consultation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Are my test results confidential?</h3>
                <p className="text-slate-700">
                  Yes, all your test results and medical information are completely confidential and protected by
                  doctor-patient confidentiality and privacy laws.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Can I get a pathology referral for any test I want?
                </h3>
                <p className="text-slate-700">
                  Pathology referrals are provided based on medical necessity. Your doctor will discuss your health
                  concerns and recommend appropriate tests based on your symptoms and medical history.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ready to get started with pathology testing?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Book a consultation with one of our qualified doctors today and get the pathology referrals you need.
            </p>
            <Link href="/consult">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 transition-colors">
                Book Consultation Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
