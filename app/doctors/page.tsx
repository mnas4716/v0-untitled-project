import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, Star } from "lucide-react"

export default function DoctorsPage() {
  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Practice",
      experience: "12 years",
      education: "MBBS, University of Sydney",
      bio: "Dr. Sarah Johnson is a dedicated general practitioner with over 12 years of experience. She specializes in preventive care and chronic disease management.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Mental Health",
      experience: "10 years",
      education: "MBBS, University of Melbourne",
      bio: "Dr. Michael Chen is a mental health specialist with a focus on anxiety, depression, and stress management. He takes a holistic approach to mental wellbeing.",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Dr. Emily Wilson",
      specialty: "Women's Health",
      experience: "8 years",
      education: "MBBS, University of Queensland",
      bio: "Dr. Emily Wilson specializes in women's health issues, including reproductive health, hormonal disorders, and preventive care for women of all ages.",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Dr. James Rodriguez",
      specialty: "Pediatrics",
      experience: "15 years",
      education: "MBBS, University of Adelaide",
      bio: "Dr. James Rodriguez is a pediatrician with extensive experience in child health. He is known for his gentle approach and ability to connect with young patients.",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "Dr. Aisha Patel",
      specialty: "Chronic Disease Management",
      experience: "11 years",
      education: "MBBS, University of Western Australia",
      bio: "Dr. Aisha Patel specializes in managing chronic conditions such as diabetes, hypertension, and respiratory disorders. She focuses on patient education and lifestyle modifications.",
      image:
        "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Dr. David Kim",
      specialty: "Dermatology",
      experience: "9 years",
      education: "MBBS, University of New South Wales",
      bio: "Dr. David Kim is a dermatology specialist who treats a wide range of skin conditions, from acne to eczema. He is passionate about helping patients achieve healthy skin.",
      image:
        "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Our Doctors</h1>
            <p className="text-xl text-blue-100 mb-8">
              Meet our team of experienced healthcare professionals dedicated to providing you with the best care.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="h-64 relative">
                  <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-800">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{doctor.specialty}</p>
                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                    <span className="text-sm text-slate-600 ml-2">5.0 (120+ consultations)</span>
                  </div>
                  <p className="text-slate-600 mb-4">{doctor.bio}</p>
                  <div className="flex items-center text-sm text-slate-500 mb-4">
                    <span className="mr-4">Experience: {doctor.experience}</span>
                    <span>Education: {doctor.education}</span>
                  </div>
                  <Link href="/consult">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all">
                      <Calendar className="mr-2 h-4 w-4" /> Book Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Join Our Team</h2>
            <p className="text-slate-600 mb-8">
              We're always looking for qualified healthcare professionals to join our network. If you're passionate
              about making healthcare accessible to all Australians, we'd love to hear from you.
            </p>
            <Link href="/careers">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transition-all">
                View Career Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
