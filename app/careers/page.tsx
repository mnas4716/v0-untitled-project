import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Globe, Briefcase, MapPin, Clock } from "lucide-react"

export default function CareersPage() {
  // Sample job listings
  const jobs = [
    {
      id: 1,
      title: "General Practitioner",
      type: "Full-time / Part-time",
      location: "Remote",
      description:
        "We're looking for experienced General Practitioners to join our telehealth platform. Provide consultations, prescriptions, and medical certificates to patients across Australia.",
    },
    {
      id: 2,
      title: "Mental Health Specialist",
      type: "Full-time / Part-time",
      location: "Remote",
      description:
        "Join our mental health team to provide support for patients dealing with anxiety, depression, stress, and other mental health concerns.",
    },
    {
      id: 3,
      title: "Pediatrician",
      type: "Part-time",
      location: "Remote",
      description:
        "We're seeking pediatricians to provide telehealth consultations for children and adolescents. Help families access quality healthcare from the comfort of their homes.",
    },
    {
      id: 4,
      title: "Software Engineer",
      type: "Full-time",
      location: "Sydney / Remote",
      description:
        "Join our tech team to build and maintain our telehealth platform. You'll work on features that help connect patients with doctors and improve the healthcare experience.",
    },
    {
      id: 5,
      title: "Customer Support Specialist",
      type: "Full-time",
      location: "Sydney / Remote",
      description:
        "Help our users navigate the platform, answer questions, and ensure a smooth experience for both patients and healthcare providers.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Join Our Mission</h1>
            <p className="text-xl text-blue-100 mb-8">
              Help us make healthcare accessible to everyone in Australia, completely free of charge.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Why Work With Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Make a Difference</h3>
              <p className="text-slate-600">
                Join a team that's making healthcare accessible to all Australians, regardless of their financial
                situation or location.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Flexible Schedule</h3>
              <p className="text-slate-600">
                Enjoy the flexibility of remote work and set your own hours. Balance your professional and personal life
                on your terms.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Innovative Environment</h3>
              <p className="text-slate-600">
                Be part of a forward-thinking team that's using technology to transform healthcare delivery in
                Australia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Current Openings</h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <Card key={job.id} className="border-0 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">{job.title}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center text-slate-600">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{job.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="bg-blue-600 hover:bg-blue-700 transition-all">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Benefits & Perks</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">Competitive Compensation</h3>
                <p className="text-slate-600">
                  We offer competitive salaries and benefits packages to attract and retain top talent.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">Remote Work</h3>
                <p className="text-slate-600">
                  Work from anywhere in Australia with our fully remote setup for most positions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">Professional Development</h3>
                <p className="text-slate-600">
                  Continuous learning opportunities and support for professional certifications.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">Health & Wellness</h3>
                <p className="text-slate-600">
                  Comprehensive health insurance and wellness programs for all employees.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">Work-Life Balance</h3>
                <p className="text-slate-600">
                  Flexible schedules and generous leave policies to ensure you can recharge.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">Collaborative Culture</h3>
                <p className="text-slate-600">
                  Join a supportive team environment where your ideas and contributions are valued.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Team?</h2>
              <p className="text-blue-100 mb-8">
                Browse our current openings or send us your resume for future opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 transition-all w-full sm:w-auto">
                  View All Positions
                </Button>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-blue-700 transition-all w-full sm:w-auto"
                  >
                    Contact Recruiting
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
