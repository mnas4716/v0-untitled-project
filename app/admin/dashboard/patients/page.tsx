"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Filter, Download, FileText, Calendar, Mail, Phone, Eye, UserX, UserCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { getAllUsers, toggleUserActive, getConsultRequestsByUserId, type User } from "@/lib/database-service"
import { useToast } from "@/components/ui/use-toast"

export default function PatientsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatients, setSelectedPatients] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<User | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [patients, setPatients] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [patientConsults, setPatientConsults] = useState<any[]>([])

  // Load patients from the user database
  useEffect(() => {
    const loadPatients = () => {
      setIsLoading(true)
      try {
        if (typeof window !== "undefined") {
          // Get users from the database service
          const users = getAllUsers()
          setPatients(users)
        }
      } catch (error) {
        console.error("Error loading patients:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPatients()
  }, [])

  // Filter patients based on search term and status
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && patient.isActive) ||
        (statusFilter === "inactive" && !patient.isActive)

      return matchesSearch && matchesStatus
    })
  }, [patients, searchTerm, statusFilter])

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

  const handleViewPatient = (patient: User) => {
    setSelectedPatient(patient)

    // Load patient's consults
    try {
      const consults = getConsultRequestsByUserId(patient.id)
      setPatientConsults(consults)
    } catch (error) {
      console.error("Error loading patient consults:", error)
      setPatientConsults([])
    }

    setIsViewDialogOpen(true)
  }

  const handleToggleUserActive = (userId: string, currentStatus: boolean) => {
    try {
      const updatedUser = toggleUserActive(userId)

      if (updatedUser) {
        // Update the patients list
        setPatients((prev) => prev.map((p) => (p.id === userId ? updatedUser : p)))

        toast({
          title: updatedUser.isActive ? "Patient Activated" : "Patient Deactivated",
          description: `Patient has been ${updatedUser.isActive ? "activated" : "deactivated"} successfully.`,
          variant: updatedUser.isActive ? "default" : "destructive",
        })
      }
    } catch (error) {
      console.error("Error toggling patient status:", error)
      toast({
        title: "Error",
        description: "Failed to update patient status.",
        variant: "destructive",
      })
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
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
                  <TableHead>Registered</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      Loading patients...
                    </TableCell>
                  </TableRow>
                ) : filteredPatients.length === 0 ? (
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
                            <AvatarFallback>
                              {patient.firstName?.[0] || "?"}
                              {patient.lastName?.[0] || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {patient.firstName} {patient.lastName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {patient.dob ? formatDate(patient.dob) : "No DOB"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">{patient.email}</div>
                        <div className="text-xs text-gray-500">{patient.phone || "No phone"}</div>
                      </TableCell>
                      <TableCell>{formatDate(patient.createdAt)}</TableCell>
                      <TableCell>{patient.lastLogin ? formatDate(patient.lastLogin) : "Never"}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            patient.isActive
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }
                        >
                          {patient.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" className="h-8" onClick={() => handleViewPatient(patient)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button
                          variant={patient.isActive ? "destructive" : "outline"}
                          size="sm"
                          className={
                            !patient.isActive ? "h-8 text-green-600 border-green-200 hover:bg-green-50" : "h-8"
                          }
                          onClick={() => handleToggleUserActive(patient.id, patient.isActive)}
                        >
                          {patient.isActive ? (
                            <>
                              <UserX className="h-4 w-4 mr-1" /> Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4 mr-1" /> Activate
                            </>
                          )}
                        </Button>
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
          </div>
        </CardContent>
      </Card>

      {/* Patient Details Dialog */}
      {selectedPatient && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Patient Details</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl">
                    {selectedPatient.firstName?.[0] || "?"}
                    {selectedPatient.lastName?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-center">
                  {selectedPatient.firstName} {selectedPatient.lastName}
                </h3>
                <p className="text-gray-500 text-center">{selectedPatient.id}</p>

                <Badge
                  className={`mt-2 ${
                    selectedPatient.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedPatient.isActive ? "Active" : "Inactive"}
                </Badge>

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
                  <Button
                    variant={selectedPatient.isActive ? "destructive" : "outline"}
                    className={`w-full justify-start ${!selectedPatient.isActive ? "text-green-600 border-green-200" : ""}`}
                    onClick={() => {
                      handleToggleUserActive(selectedPatient.id, selectedPatient.isActive)
                      setSelectedPatient((prev) => (prev ? { ...prev, isActive: !prev.isActive } : null))
                    }}
                  >
                    {selectedPatient.isActive ? (
                      <>
                        <UserX className="mr-2 h-4 w-4" /> Deactivate Patient
                      </>
                    ) : (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" /> Activate Patient
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Personal Info</TabsTrigger>
                    <TabsTrigger value="medical">Medical Info</TabsTrigger>
                    <TabsTrigger value="consults">Consultations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">First Name</p>
                        <p>{selectedPatient.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p>{selectedPatient.lastName}</p>
                      </div>
                    </div>

                    {selectedPatient.dob && (
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p>{formatDate(selectedPatient.dob)}</p>
                      </div>
                    )}

                    {selectedPatient.medicareNumber && (
                      <div>
                        <p className="text-sm text-gray-500">Medicare Number</p>
                        <p>{selectedPatient.medicareNumber}</p>
                      </div>
                    )}

                    {selectedPatient.address && (
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p>{selectedPatient.address}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-500">Contact Information</p>
                      <div className="flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{selectedPatient.email}</p>
                      </div>
                      {selectedPatient.phone && (
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <p>{selectedPatient.phone}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Registration Date</p>
                      <p>{formatDate(selectedPatient.createdAt)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Last Login</p>
                      <p>{selectedPatient.lastLogin ? formatDate(selectedPatient.lastLogin) : "Never"}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="medical" className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Medical Conditions</p>
                      <p>Information not available</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Allergies</p>
                      <p>Information not available</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Current Medications</p>
                      <p>Information not available</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="consults" className="space-y-4">
                    <Tabs defaultValue="all">
                      <TabsList>
                        <TabsTrigger value="all">All ({patientConsults.length})</TabsTrigger>
                        <TabsTrigger value="pending">
                          Pending ({patientConsults.filter((c) => c.status === "pending").length})
                        </TabsTrigger>
                        <TabsTrigger value="completed">
                          Completed ({patientConsults.filter((c) => c.status === "completed").length})
                        </TabsTrigger>
                        <TabsTrigger value="cancelled">
                          Cancelled ({patientConsults.filter((c) => c.status === "cancelled").length})
                        </TabsTrigger>
                      </TabsList>

                      {["all", "pending", "completed", "cancelled"].map((status) => (
                        <TabsContent key={status} value={status} className="space-y-3 mt-4">
                          {patientConsults.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 border rounded-md">
                              No consultations found
                            </div>
                          ) : (
                            <>
                              {patientConsults
                                .filter((consult) => status === "all" || consult.status === status)
                                .map((consult) => (
                                  <div key={consult.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between">
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <Badge
                                            className={
                                              consult.type === "consultation"
                                                ? "bg-blue-100 text-blue-800"
                                                : consult.type === "medical-certificate"
                                                  ? "bg-green-100 text-green-800"
                                                  : "bg-purple-100 text-purple-800"
                                            }
                                          >
                                            {consult.type.replace("-", " ")}
                                          </Badge>
                                          <Badge
                                            className={
                                              consult.status === "pending"
                                                ? "bg-amber-100 text-amber-800"
                                                : consult.status === "completed"
                                                  ? "bg-green-100 text-green-800"
                                                  : "bg-red-100 text-red-800"
                                            }
                                          >
                                            {consult.status}
                                          </Badge>
                                        </div>
                                        <p className="mt-2 font-medium">ID: {consult.id}</p>
                                        <p className="text-sm text-slate-600">
                                          {consult.date} at {consult.time}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => router.push(`/admin/dashboard/consult/${consult.id}`)}
                                        >
                                          <Eye className="h-4 w-4 mr-1" /> View Details
                                        </Button>
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <p className="text-sm font-medium">Reason:</p>
                                      <p className="text-sm text-slate-600">{consult.reason}</p>
                                    </div>
                                    {consult.doctorNotes && (
                                      <div className="mt-2 p-2 bg-blue-50 rounded-md">
                                        <p className="text-sm font-medium text-blue-800">Doctor Notes:</p>
                                        <p className="text-sm text-blue-700">{consult.doctorNotes}</p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </>
                          )}
                        </TabsContent>
                      ))}
                    </Tabs>
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
