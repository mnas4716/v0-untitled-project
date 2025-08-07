"use client"

import { useState } from "react"
import { Search, Plus, Filter, MoreHorizontal, Calendar, Mail, Phone, Star, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock doctor data
const doctors = [
  {
    id: "D1001",
    firstName: "Robert",
    lastName: "Johnson",
    title: "MD",
    specialty: "Family Medicine",
    email: "robert.johnson@freedoc.com",
    phone: "(555) 123-4567",
    location: "Main Clinic",
    address: "123 Medical Center Blvd, Anytown, CA 12345",
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
    availabilityHours: "9:00 AM - 5:00 PM",
    patients: 124,
    rating: 4.8,
    status: "active",
    bio: "Dr. Johnson is a board-certified family physician with over 15 years of experience. He specializes in preventive care and chronic disease management.",
    education: [
      "Medical School: University of California, San Francisco",
      "Residency: Stanford University Medical Center",
      "Board Certification: American Board of Family Medicine",
    ],
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    id: "D1002",
    firstName: "Sarah",
    lastName: "Miller",
    title: "MD",
    specialty: "Internal Medicine",
    email: "sarah.miller@freedoc.com",
    phone: "(555) 234-5678",
    location: "Downtown Clinic",
    address: "456 Health St, Anytown, CA 12345",
    availability: ["Monday", "Wednesday", "Thursday"],
    availabilityHours: "8:00 AM - 4:00 PM",
    patients: 98,
    rating: 4.9,
    status: "active",
    bio: "Dr. Miller is an internist who focuses on adult medicine. She has a special interest in women's health and preventive care.",
    education: [
      "Medical School: Johns Hopkins University",
      "Residency: Mayo Clinic",
      "Board Certification: American Board of Internal Medicine",
    ],
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    id: "D1003",
    firstName: "David",
    lastName: "Wilson",
    title: "MD",
    specialty: "Pediatrics",
    email: "david.wilson@freedoc.com",
    phone: "(555) 345-6789",
    location: "Children's Clinic",
    address: "789 Kidcare Way, Anytown, CA 12345",
    availability: ["Tuesday", "Thursday", "Friday"],
    availabilityHours: "9:00 AM - 6:00 PM",
    patients: 156,
    rating: 4.7,
    status: "active",
    bio: "Dr. Wilson is a pediatrician who loves working with children of all ages. He specializes in childhood development and adolescent medicine.",
    education: [
      "Medical School: Harvard Medical School",
      "Residency: Children's Hospital of Philadelphia",
      "Board Certification: American Board of Pediatrics",
    ],
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    id: "D1004",
    firstName: "Jennifer",
    lastName: "Lee",
    title: "MD",
    specialty: "Dermatology",
    email: "jennifer.lee@freedoc.com",
    phone: "(555) 456-7890",
    location: "Dermatology Center",
    address: "101 Skin Health Rd, Anytown, CA 12345",
    availability: ["Monday", "Wednesday", "Friday"],
    availabilityHours: "10:00 AM - 6:00 PM",
    patients: 87,
    rating: 4.6,
    status: "on leave",
    bio: "Dr. Lee is a dermatologist who specializes in both medical and cosmetic dermatology. She has expertise in treating acne, eczema, and skin cancer.",
    education: [
      "Medical School: Yale School of Medicine",
      "Residency: NYU Langone Medical Center",
      "Board Certification: American Board of Dermatology",
    ],
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    id: "D1005",
    firstName: "Michael",
    lastName: "Brown",
    title: "MD",
    specialty: "Cardiology",
    email: "michael.brown@freedoc.com",
    phone: "(555) 567-8901",
    location: "Heart Center",
    address: "202 Cardiac Ave, Anytown, CA 12345",
    availability: ["Tuesday", "Thursday"],
    availabilityHours: "8:00 AM - 3:00 PM",
    patients: 76,
    rating: 4.9,
    status: "active",
    bio: "Dr. Brown is a cardiologist who specializes in preventive cardiology and heart disease management. He has a particular interest in helping patients improve heart health through lifestyle changes.",
    education: [
      "Medical School: Duke University School of Medicine",
      "Residency: Massachusetts General Hospital",
      "Fellowship: Cleveland Clinic",
      "Board Certification: American Board of Internal Medicine, Cardiovascular Disease",
    ],
    avatar: "/placeholder.svg?height=128&width=128",
  },
]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Filter doctors based on search term and status
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || doctor.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewDoctor = (doctor: (typeof doctors)[0]) => {
    setSelectedDoctor(doctor)
    setIsViewDialogOpen(true)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#00473e]">Doctors</h1>
          <p className="text-[#007d73]">Manage doctor profiles and schedules</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00473e] hover:bg-[#00695f]">
              <Plus className="mr-2 h-4 w-4" /> Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
              <DialogDescription>Enter the doctor's information to create a new profile.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="First name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Last name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="md">MD</SelectItem>
                      <SelectItem value="do">DO</SelectItem>
                      <SelectItem value="np">NP</SelectItem>
                      <SelectItem value="pa">PA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family-medicine">Family Medicine</SelectItem>
                    <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Phone number" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Clinic location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Full address" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Input id="bio" placeholder="Short professional biography" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education & Certifications</Label>
                <Input id="education" placeholder="Separate with line breaks" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#00473e] hover:bg-[#00695f]" onClick={() => setIsAddDialogOpen(false)}>
                Add Doctor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold text-[#00473e]">Doctor Directory</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search doctors..."
                className="pl-9 w-full md:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="md:col-span-3 text-center py-8 text-gray-500">No doctors found</div>
          ) : (
            filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-[#e6f2f0] p-6 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage
                        src={doctor.avatar || "/placeholder.svg"}
                        alt={`${doctor.firstName} ${doctor.lastName}`}
                      />
                      <AvatarFallback className="text-2xl">
                        {doctor.firstName[0]}
                        {doctor.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-center">
                      {doctor.firstName} {doctor.lastName}, {doctor.title}
                    </h3>
                    <p className="text-[#00473e] font-medium">{doctor.specialty}</p>

                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm">{doctor.rating}/5</span>
                    </div>

                    {doctor.status === "active" ? (
                      <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">Active</Badge>
                    ) : doctor.status === "on-leave" ? (
                      <Badge className="mt-2 bg-amber-100 text-amber-800 border-amber-200">On Leave</Badge>
                    ) : (
                      <Badge className="mt-2 bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-[#00473e] mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-sm">{doctor.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-[#00473e] mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-sm">{doctor.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-[#00473e] mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="text-sm">{doctor.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-3 text-[#00473e] mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Availability</p>
                          <p className="text-sm">{doctor.availability.join(", ")}</p>
                          <p className="text-xs text-gray-500">{doctor.availabilityHours}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => handleViewDoctor(doctor)}>
                        View Profile
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDoctor(doctor)}>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Schedule</DropdownMenuItem>
                          <DropdownMenuItem>Manage Patients</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Doctor Details Dialog */}
      {selectedDoctor && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Doctor Profile</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage
                    src={selectedDoctor.avatar || "/placeholder.svg"}
                    alt={`${selectedDoctor.firstName} ${selectedDoctor.lastName}`}
                  />
                  <AvatarFallback className="text-3xl">
                    {selectedDoctor.firstName[0]}
                    {selectedDoctor.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-center">
                  {selectedDoctor.firstName} {selectedDoctor.lastName}, {selectedDoctor.title}
                </h3>
                <p className="text-[#00473e] font-medium">{selectedDoctor.specialty}</p>

                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm">{selectedDoctor.rating}/5</span>
                </div>

                {selectedDoctor.status === "active" ? (
                  <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">Active</Badge>
                ) : selectedDoctor.status === "on-leave" ? (
                  <Badge className="mt-2 bg-amber-100 text-amber-800 border-amber-200">On Leave</Badge>
                ) : (
                  <Badge className="mt-2 bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
                )}

                <div className="mt-6 w-full space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" /> View Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                  <Button className="w-full justify-center bg-[#00473e] hover:bg-[#00695f]">Edit Profile</Button>
                </div>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Information</TabsTrigger>
                    <TabsTrigger value="patients">Patients</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#00473e]">Biography</h4>
                      <p className="mt-1">{selectedDoctor.bio}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#00473e]">Contact Information</h4>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <p>{selectedDoctor.email}</p>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <p>{selectedDoctor.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#00473e]">Location</h4>
                      <p className="mt-1">{selectedDoctor.location}</p>
                      <p className="text-sm text-gray-500">{selectedDoctor.address}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#00473e]">Education & Certifications</h4>
                      <ul className="mt-1 space-y-1">
                        {selectedDoctor.education.map((item, index) => (
                          <li key={index} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="patients" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-[#00473e]">Patient Count</h4>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {selectedDoctor.patients} Patients
                      </Badge>
                    </div>

                    <div className="border rounded-md p-4">
                      <p className="text-center text-gray-500">Patient list is available in the full system</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#00473e]">Weekly Schedule</h4>
                      <div className="mt-2 grid grid-cols-7 gap-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                          <div key={day} className="text-center">
                            <div className="text-sm font-medium">{day}</div>
                            <div
                              className={`mt-1 p-2 rounded-md ${
                                selectedDoctor.availability.includes(
                                  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][index],
                                )
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {selectedDoctor.availability.includes(
                                ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][index],
                              )
                                ? "Available"
                                : "Off"}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Hours: {selectedDoctor.availabilityHours}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
