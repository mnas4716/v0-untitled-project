"use client"

import { useState } from "react"
import { Search, Plus, Filter, Download, MoreHorizontal, FileText, Calendar, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Mock patient data
const patients = [
  {
    id: "P1001",
    firstName: "James",
    lastName: "Smith",
    email: "james.smith@example.com",
    phone: "(555) 123-4567",
    dob: "1985-06-15",
    gender: "Male",
    address: "123 Main St, Anytown, CA 12345",
    insuranceProvider: "Blue Cross",
    insuranceNumber: "BC123456789",
    medicalConditions: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Penicillin"],
    lastVisit: "2023-04-10",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P1002",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    phone: "(555) 234-5678",
    dob: "1990-08-22",
    gender: "Female",
    address: "456 Oak Ave, Somewhere, NY 67890",
    insuranceProvider: "Aetna",
    insuranceNumber: "AE987654321",
    medicalConditions: ["Asthma"],
    allergies: ["Latex", "Peanuts"],
    lastVisit: "2023-05-05",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P1003",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    phone: "(555) 345-6789",
    dob: "1978-11-30",
    gender: "Male",
    address: "789 Pine Rd, Elsewhere, TX 54321",
    insuranceProvider: "UnitedHealthcare",
    insuranceNumber: "UH567891234",
    medicalConditions: ["Arthritis"],
    allergies: [],
    lastVisit: "2023-03-15",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P1004",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "(555) 456-7890",
    dob: "1995-02-18",
    gender: "Female",
    address: "101 Cedar Ln, Nowhere, FL 13579",
    insuranceProvider: "Cigna",
    insuranceNumber: "CI246813579",
    medicalConditions: [],
    allergies: ["Sulfa drugs"],
    lastVisit: "2023-05-12",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P1005",
    firstName: "Robert",
    lastName: "Jones",
    email: "robert.jones@example.com",
    phone: "(555) 567-8901",
    dob: "1972-09-08",
    gender: "Male",
    address: "202 Maple Dr, Anywhere, WA 97531",
    insuranceProvider: "Medicare",
    insuranceNumber: "MC135792468",
    medicalConditions: ["Coronary Artery Disease", "COPD"],
    allergies: ["Aspirin"],
    lastVisit: "2023-02-28",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P1006",
    firstName: "Jennifer",
    lastName: "Garcia",
    email: "jennifer.garcia@example.com",
    phone: "(555) 678-9012",
    dob: "1988-04-25",
    gender: "Female",
    address: "303 Birch Blvd, Someplace, IL 86420",
    insuranceProvider: "Humana",
    insuranceNumber: "HU864209753",
    medicalConditions: ["Migraine"],
    allergies: ["Shellfish"],
    lastVisit: "2023-04-22",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P1007",
    firstName: "David",
    lastName: "Martinez",
    email: "david.martinez@example.com",
    phone: "(555) 789-0123",
    dob: "1982-12-10",
    gender: "Male",
    address: "404 Elm St, Elsewhere, GA 75319",
    insuranceProvider: "Kaiser Permanente",
    insuranceNumber: "KP753198642",
    medicalConditions: ["Depression", "Anxiety"],
    allergies: [],
    lastVisit: "2023-05-08",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatients, setSelectedPatients] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Filter patients based on search term and status
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const togglePatientSelection = (patientId: string) => {
    setSelectedPatients((prev) => {
      if (prev.includes(patientId)) {
        return prev.filter((id) => id !== patientId)
      } else {
        return [...prev, patientId]
      }
    })
  }

  const toggleSelectAll = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([])
    } else {
      setSelectedPatients(filteredPatients.map((p) => p.id))
    }
  }

  const handleViewPatient = (patient: (typeof patients)[0]) => {
    setSelectedPatient(patient)
    setIsViewDialogOpen(true)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#00473e]">Patients</h1>
          <p className="text-[#007d73]">Manage patient records and information</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00473e] hover:bg-[#00695f]">
              <Plus className="mr-2 h-4 w-4" /> Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the patient's information to create a new record.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="First name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Last name" />
                </div>
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

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Full address" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance Provider</Label>
                  <Input id="insurance" placeholder="Insurance provider" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceNumber">Insurance Number</Label>
                  <Input id="insuranceNumber" placeholder="Insurance number" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Input id="medicalConditions" placeholder="Separate with commas" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" placeholder="Separate with commas" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#00473e] hover:bg-[#00695f]" onClick={() => setIsAddDialogOpen(false)}>
                Add Patient
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={selectedPatients.length === 0}>
                <Mail className="mr-2 h-4 w-4" /> Email Selected
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients..."
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
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all patients"
                    />
                  </TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Insurance</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No patients found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedPatients.includes(patient.id)}
                          onCheckedChange={() => togglePatientSelection(patient.id)}
                          aria-label={`Select ${patient.firstName} ${patient.lastName}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={patient.avatar || "/placeholder.svg"}
                              alt={`${patient.firstName} ${patient.lastName}`}
                            />
                            <AvatarFallback>
                              {patient.firstName[0]}
                              {patient.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {patient.firstName} {patient.lastName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {patient.dob} ({new Date().getFullYear() - new Date(patient.dob).getFullYear()} yrs)
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">{patient.email}</div>
                        <div className="text-xs text-gray-500">{patient.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{patient.insuranceProvider}</div>
                        <div className="text-xs text-gray-500">{patient.insuranceNumber}</div>
                      </TableCell>
                      <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {patient.status === "active" ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewPatient(patient)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" /> Schedule Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" /> Medical Records
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete Patient</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {filteredPatients.length} of {patients.length} patients
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Details Dialog */}
      {selectedPatient && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Patient Details</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={selectedPatient.avatar || "/placeholder.svg"}
                    alt={`${selectedPatient.firstName} ${selectedPatient.lastName}`}
                  />
                  <AvatarFallback className="text-2xl">
                    {selectedPatient.firstName[0]}
                    {selectedPatient.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-center">
                  {selectedPatient.firstName} {selectedPatient.lastName}
                </h3>
                <p className="text-gray-500 text-center">{selectedPatient.id}</p>

                <div className="mt-4 w-full space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" /> Schedule Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" /> Medical Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Personal Info</TabsTrigger>
                    <TabsTrigger value="medical">Medical Info</TabsTrigger>
                    <TabsTrigger value="visits">Visit History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p>
                          {selectedPatient.dob} (
                          {new Date().getFullYear() - new Date(selectedPatient.dob).getFullYear()} yrs)
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p>{selectedPatient.gender}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Contact Information</p>
                      <div className="flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{selectedPatient.email}</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{selectedPatient.phone}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p>{selectedPatient.address}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Insurance</p>
                      <p>
                        {selectedPatient.insuranceProvider} - {selectedPatient.insuranceNumber}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="medical" className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Medical Conditions</p>
                      {selectedPatient.medicalConditions.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedPatient.medicalConditions.map((condition) => (
                            <Badge key={condition} variant="outline">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p>No known medical conditions</p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Allergies</p>
                      {selectedPatient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedPatient.allergies.map((allergy) => (
                            <Badge key={allergy} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p>No known allergies</p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Current Medications</p>
                      <p>Information not available</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="visits" className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <p className="font-medium">General Checkup</p>
                          <p className="text-sm text-gray-500">
                            {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">Dr. Johnson</p>
                        <p className="text-sm mt-2">Routine checkup, all vitals normal. Follow up in 6 months.</p>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <p className="font-medium">Prescription Renewal</p>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              new Date(selectedPatient.lastVisit).setMonth(
                                new Date(selectedPatient.lastVisit).getMonth() - 3,
                              ),
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">Dr. Miller</p>
                        <p className="text-sm mt-2">Renewed prescriptions for 3 months.</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button className="bg-[#00473e] hover:bg-[#00695f]">Edit Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
