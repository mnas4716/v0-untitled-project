"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState, useEffect, useMemo } from "react"
import { Search, Download, MoreHorizontal, Mail, Stethoscope, Calendar, Eye, EyeOff } from "lucide-react"

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock practitioner data
const initialPractitioners = [
  {
    id: "P1001",
    firstName: "Robert",
    lastName: "Johnson",
    title: "MD",
    specialty: "Family Medicine",
    email: "robert.johnson@freedoc.com",
    password: "password123", // In a real app, this would be hashed
    phone: "(555) 123-4567",
    status: "active",
    patients: 124,
    consultations: 45,
    joinedDate: "2022-03-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "P1002",
    firstName: "Sarah",
    lastName: "Miller",
    title: "MD",
    specialty: "Internal Medicine",
    email: "sarah.miller@freedoc.com",
    password: "password123", // In a real app, this would be hashed
    phone: "(555) 234-5678",
    status: "active",
    patients: 98,
    consultations: 32,
    joinedDate: "2022-05-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "doc1",
    firstName: "Robert",
    lastName: "Smith",
    title: "MD",
    specialty: "General Practice",
    email: "doc1@freedoc.com.au",
    password: "test123", // In a real app, this would be hashed
    phone: "0498765432",
    status: "active",
    patients: 156,
    consultations: 67,
    joinedDate: "2021-11-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function PractitionersPage() {
  const [practitioners, setPractitioners] = useState(initialPractitioners)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPractitioners, setSelectedPractitioners] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPractitioner, setSelectedPractitioner] = useState<(typeof practitioners)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    specialty: "",
    email: "",
    phone: "",
    password: "",
    status: "active",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")
  const { toast } = useToast()

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Filter practitioners based on search term and status - memoized to prevent unnecessary recalculations
  const filteredPractitioners = useMemo(() => {
    return practitioners.filter((practitioner) => {
      const matchesSearch =
        practitioner.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practitioner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practitioner.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practitioner.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || practitioner.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [practitioners, searchTerm, statusFilter])

  const togglePractitionerSelection = (practitionerId: string) => {
    setSelectedPractitioners((prev) => {
      if (prev.includes(practitionerId)) {
        return prev.filter((id) => id !== practitionerId)
      } else {
        return [...prev, practitionerId]
      }
    })
  }

  const toggleSelectAll = () => {
    if (selectedPractitioners.length === filteredPractitioners.length) {
      setSelectedPractitioners([])
    } else {
      setSelectedPractitioners(filteredPractitioners.map((p) => p.id))
    }
  }

  const handleViewPractitioner = (practitioner: (typeof practitioners)[0]) => {
    setSelectedPractitioner(practitioner)
    setIsViewDialogOpen(true)
  }

  const handleEditPractitioner = (practitioner: (typeof practitioners)[0]) => {
    setSelectedPractitioner(practitioner)
    setFormData({
      firstName: practitioner.firstName,
      lastName: practitioner.lastName,
      title: practitioner.title,
      specialty: practitioner.specialty,
      email: practitioner.email,
      phone: practitioner.phone,
      password: practitioner.password,
      status: practitioner.status,
    })
    setIsEditDialogOpen(true)
  }

  const handleAddPractitioner = () => {
    setFormError("")
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setFormError("Please fill in all required fields")
      return
    }

    // Check if email already exists
    if (practitioners.some((p) => p.email === formData.email)) {
      setFormError("A practitioner with this email already exists")
      return
    }

    // Create new practitioner
    const newPractitioner = {
      id: `P${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      title: formData.title || "MD",
      specialty: formData.specialty || "General Practice",
      email: formData.email,
      password: formData.password, // In a real app, this would be hashed
      phone: formData.phone || "",
      status: formData.status || "active",
      patients: 0,
      consultations: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setPractitioners([...practitioners, newPractitioner])
    setIsAddDialogOpen(false)
    setFormData({
      firstName: "",
      lastName: "",
      title: "",
      specialty: "",
      email: "",
      phone: "",
      password: "",
      status: "active",
    })

    toast({
      title: "Success",
      description: "Practitioner added successfully",
    })
  }

  const handleUpdatePractitioner = () => {
    setFormError("")
    if (!selectedPractitioner) return

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setFormError("Please fill in all required fields")
      return
    }

    // Check if email already exists (excluding the current practitioner)
    if (practitioners.some((p) => p.email === formData.email && p.id !== selectedPractitioner.id)) {
      setFormError("A practitioner with this email already exists")
      return
    }

    // Update practitioner
    const updatedPractitioners = practitioners.map((p) => {
      if (p.id === selectedPractitioner.id) {
        return {
          ...p,
          firstName: formData.firstName,
          lastName: formData.lastName,
          title: formData.title || p.title,
          specialty: formData.specialty || p.specialty,
          email: formData.email,
          password: formData.password || p.password, // Only update if provided
          phone: formData.phone || p.phone,
          status: formData.status || p.status,
        }
      }
      return p
    })

    setPractitioners(updatedPractitioners)
    setIsEditDialogOpen(false)
    setSelectedPractitioner(null)

    toast({
      title: "Success",
      description: "Practitioner updated successfully",
    })
  }

  const handleToggleStatus = (practitioner: (typeof practitioners)[0]) => {
    const newStatus = practitioner.status === "active" ? "inactive" : "active"
    const updatedPractitioners = practitioners.map((p) => {
      if (p.id === practitioner.id) {
        return {
          ...p,
          status: newStatus,
        }
      }
      return p
    })

    setPractitioners(updatedPractitioners)

    toast({
      title: "Status Updated",
      description: `Practitioner status changed to ${newStatus}`,
    })
  }

  const handleDeletePractitioner = (id: string) => {
    setPractitioners(practitioners.filter((p) => p.id !== id))

    toast({
      title: "Practitioner Deleted",
      description: "Practitioner has been removed from the system",
      variant: "destructive",
    })
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#00473e]">Practitioners</h1>
          <p className="text-[#007d73]">Manage healthcare practitioners and specialists</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00473e] hover:bg-[#00695f]">
              <Stethoscope className="mr-2 h-4 w-4" /> Add Practitioner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Practitioner</DialogTitle>
              <DialogDescription>Enter the practitioner's information to create a new profile.</DialogDescription>
            </DialogHeader>
            {formError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Select value={formData.title} onValueChange={(value) => setFormData({ ...formData, title: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MD">MD</SelectItem>
                      <SelectItem value="DO">DO</SelectItem>
                      <SelectItem value="NP">NP</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select
                  value={formData.specialty}
                  onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Family Medicine">Family Medicine</SelectItem>
                    <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="General Practice">General Practice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on leave">On Leave</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#00473e] hover:bg-[#00695f]" onClick={handleAddPractitioner}>
                Add Practitioner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={selectedPractitioners.length === 0}>
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
                  placeholder="Search practitioners..."
                  className="pl-9 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on leave">On Leave</SelectItem>
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
                      checked={
                        selectedPractitioners.length === filteredPractitioners.length &&
                        filteredPractitioners.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all practitioners"
                    />
                  </TableHead>
                  <TableHead>Practitioner</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Loading practitioners...
                    </TableCell>
                  </TableRow>
                ) : filteredPractitioners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No practitioners found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPractitioners.map((practitioner) => (
                    <TableRow key={practitioner.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedPractitioners.includes(practitioner.id)}
                          onCheckedChange={() => togglePractitionerSelection(practitioner.id)}
                          aria-label={`Select ${practitioner.firstName} ${practitioner.lastName}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={practitioner.avatar || "/placeholder.svg"}
                              alt={`${practitioner.firstName} ${practitioner.lastName}`}
                            />
                            <AvatarFallback>
                              {practitioner.firstName[0]}
                              {practitioner.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {practitioner.firstName} {practitioner.lastName}, {practitioner.title}
                            </div>
                            <div className="text-xs text-gray-500">{practitioner.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{practitioner.specialty}</TableCell>
                      <TableCell>
                        <div className="text-sm">{practitioner.email}</div>
                        <div className="text-xs text-gray-500">{practitioner.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{practitioner.patients} patients</div>
                        <div className="text-xs text-gray-500">{practitioner.consultations} consultations</div>
                      </TableCell>
                      <TableCell>
                        {practitioner.status === "active" ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                        ) : practitioner.status === "on leave" ? (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">On Leave</Badge>
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
                            <DropdownMenuItem onClick={() => handleViewPractitioner(practitioner)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditPractitioner(practitioner)}>
                              Edit Practitioner
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleToggleStatus(practitioner)}>
                              {practitioner.status === "active" ? "Deactivate" : "Activate"} Practitioner
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" /> View Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Stethoscope className="mr-2 h-4 w-4" /> View Consultations
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeletePractitioner(practitioner.id)}
                            >
                              Delete Practitioner
                            </DropdownMenuItem>
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
              Showing {filteredPractitioners.length} of {practitioners.length} practitioners
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practitioner Details Dialog */}
      {selectedPractitioner && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Practitioner Details</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={selectedPractitioner.avatar || "/placeholder.svg"}
                    alt={`${selectedPractitioner.firstName} ${selectedPractitioner.lastName}`}
                  />
                  <AvatarFallback className="text-2xl">
                    {selectedPractitioner.firstName[0]}
                    {selectedPractitioner.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-center">
                  {selectedPractitioner.firstName} {selectedPractitioner.lastName}, {selectedPractitioner.title}
                </h3>
                <p className="text-[#00473e] font-medium">{selectedPractitioner.specialty}</p>

                {selectedPractitioner.status === "active" ? (
                  <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">Active</Badge>
                ) : selectedPractitioner.status === "on leave" ? (
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
                  <Button
                    className="w-full justify-center bg-[#00473e] hover:bg-[#00695f]"
                    onClick={() => {
                      setIsViewDialogOpen(false)
                      handleEditPractitioner(selectedPractitioner)
                    }}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Information</TabsTrigger>
                    <TabsTrigger value="patients">Patients</TabsTrigger>
                    <TabsTrigger value="consultations">Consultations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{selectedPractitioner.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{selectedPractitioner.phone}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Joined Date</p>
                      <p>{formatDate(selectedPractitioner.joinedDate)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Patients</p>
                        <p>{selectedPractitioner.patients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Consultations</p>
                        <p>{selectedPractitioner.consultations}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="patients" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-[#00473e]">Patient List</h4>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {selectedPractitioner.patients} Patients
                      </Badge>
                    </div>

                    <div className="border rounded-md p-4">
                      <p className="text-center text-gray-500">Patient list is available in the full system</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="consultations" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-[#00473e]">Recent Consultations</h4>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {selectedPractitioner.consultations} Consultations
                      </Badge>
                    </div>

                    <div className="border rounded-md p-4">
                      <p className="text-center text-gray-500">Consultation history is available in the full system</p>
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

      {/* Edit Practitioner Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Practitioner</DialogTitle>
            <DialogDescription>Update the practitioner's information.</DialogDescription>
          </DialogHeader>
          {formError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-firstName">First Name *</Label>
                <Input
                  id="edit-firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lastName">Last Name *</Label>
                <Input
                  id="edit-lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Select value={formData.title} onValueChange={(value) => setFormData({ ...formData, title: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MD">MD</SelectItem>
                    <SelectItem value="DO">DO</SelectItem>
                    <SelectItem value="NP">NP</SelectItem>
                    <SelectItem value="PA">PA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-specialty">Specialty</Label>
              <Select
                value={formData.specialty}
                onValueChange={(value) => setFormData({ ...formData, specialty: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Family Medicine">Family Medicine</SelectItem>
                  <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="General Practice">General Practice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-password">Password (leave blank to keep current)</Label>
              <div className="relative">
                <Input
                  id="edit-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on leave">On Leave</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#00473e] hover:bg-[#00695f]" onClick={handleUpdatePractitioner}>
              Update Practitioner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
