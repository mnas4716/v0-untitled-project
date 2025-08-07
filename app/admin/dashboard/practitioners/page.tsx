"use client"

import type React from "react"

import { DialogTrigger } from "@/components/ui/dialog"
import { useState, useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Download, Mail, Eye, EyeOff, UserX, UserCheck, Plus, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getAllDoctors, createDoctor, toggleDoctorActive } from "@/lib/database-service"

export default function PractitionersPage() {
  const router = useRouter()
  const [practitioners, setPractitioners] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPractitioners, setSelectedPractitioners] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    providerNumber: "",
    registrationNumber: "",
    email: "",
    phone: "",
    password: "",
    status: "active",
  })
  const [signature, setSignature] = useState<File | null>(null)
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")
  const { toast } = useToast()

  // Load practitioners
  useEffect(() => {
    const loadPractitioners = async () => {
      setIsLoading(true)
      try {
        const doctors = getAllDoctors()
        setPractitioners(doctors)
      } catch (error) {
        console.error("Error loading practitioners:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPractitioners()
  }, [])

  // Filter practitioners based on search term and status
  const filteredPractitioners = useMemo(() => {
    return practitioners.filter((practitioner) => {
      const matchesSearch =
        practitioner.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        practitioner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (practitioner.specialty && practitioner.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
        practitioner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (practitioner.providerNumber && practitioner.providerNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (practitioner.registrationNumber &&
          practitioner.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && practitioner.isActive) ||
        (statusFilter === "inactive" && !practitioner.isActive)

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

  const handleViewPractitioner = (practitionerId: string) => {
    router.push(`/admin/dashboard/practitioners/${practitionerId}`)
  }

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        setFormError("Please upload an image file for the signature")
        return
      }

      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setFormError("Signature image must be less than 2MB")
        return
      }

      setSignature(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setSignaturePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveSignature = () => {
    setSignature(null)
    setSignaturePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddPractitioner = async () => {
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

    try {
      // Process signature if uploaded
      let signatureData = undefined

      if (signature) {
        const reader = new FileReader()
        const signaturePromise = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            try {
              const base64Content = reader.result as string
              resolve(base64Content)
            } catch (error) {
              reject(error)
            }
          }
          reader.onerror = () => {
            reject(new Error("Error reading signature file"))
          }
          reader.readAsDataURL(signature)
        })

        const base64Signature = await signaturePromise

        signatureData = {
          fileName: signature.name,
          fileType: signature.type,
          fileSize: signature.size,
          content: base64Signature.split(",")[1], // Remove data URL prefix
          uploadedAt: new Date().toISOString(),
        }
      }

      // Create new practitioner with the provided password and signature
      const newPractitioner = createDoctor({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        providerNumber: formData.providerNumber,
        registrationNumber: formData.registrationNumber,
        signature: signatureData,
        phone: formData.phone,
        status: formData.status as "active" | "inactive" | "on leave",
        password: formData.password, // Pass the password to the createDoctor function
      })

      setPractitioners([...practitioners, newPractitioner])
      setIsAddDialogOpen(false)
      setFormData({
        firstName: "",
        lastName: "",
        providerNumber: "",
        registrationNumber: "",
        email: "",
        phone: "",
        password: "",
        status: "active",
      })
      setSignature(null)
      setSignaturePreview(null)

      toast({
        title: "Success",
        description: "Practitioner added successfully",
      })
    } catch (error) {
      console.error("Error adding practitioner:", error)
      setFormError("Failed to add practitioner")
    }
  }

  const handleToggleStatus = (practitioner: any) => {
    try {
      const updatedPractitioner = toggleDoctorActive(practitioner.id)

      if (updatedPractitioner) {
        setPractitioners(practitioners.map((p) => (p.id === practitioner.id ? updatedPractitioner : p)))

        toast({
          title: updatedPractitioner.isActive ? "Practitioner Activated" : "Practitioner Deactivated",
          description: `${updatedPractitioner.firstName} ${updatedPractitioner.lastName} has been ${updatedPractitioner.isActive ? "activated" : "deactivated"}.`,
        })
      }
    } catch (error) {
      console.error("Error toggling practitioner status:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update practitioner status",
      })
    }
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
              <Plus className="mr-2 h-4 w-4" /> Add Practitioner
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
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="providerNumber">Provider Number</Label>
                  <Input
                    id="providerNumber"
                    placeholder="Provider number"
                    value={formData.providerNumber}
                    onChange={(e) => setFormData({ ...formData, providerNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    placeholder="Registration number"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signature">Signature</Label>
                <div className="border rounded-md p-4">
                  {signaturePreview ? (
                    <div className="relative">
                      <img
                        src={signaturePreview || "/placeholder.svg"}
                        alt="Signature preview"
                        className="max-h-32 max-w-full object-contain mx-auto"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={handleRemoveSignature}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove signature</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Upload practitioner's signature</p>
                      <p className="text-xs text-gray-400 mb-4">PNG, JPG or GIF up to 2MB</p>
                      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        Select File
                      </Button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="signature"
                    accept="image/*"
                    className="hidden"
                    onChange={handleSignatureChange}
                  />
                </div>
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
                  <TableHead>Provider Number</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Loading practitioners...
                    </TableCell>
                  </TableRow>
                ) : filteredPractitioners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
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
                              {practitioner.firstName} {practitioner.lastName}
                              {practitioner.title ? `, ${practitioner.title}` : ""}
                            </div>
                            <div className="text-xs text-gray-500">{practitioner.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{practitioner.providerNumber || "Not provided"}</TableCell>
                      <TableCell>
                        <div className="text-sm">{practitioner.email}</div>
                        <div className="text-xs text-gray-500">{practitioner.phone}</div>
                      </TableCell>
                      <TableCell>
                        {practitioner.isActive ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 border-red-200">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewPractitioner(practitioner.id)}>
                            View
                          </Button>
                          <Button
                            variant={practitioner.isActive ? "destructive" : "outline"}
                            size="sm"
                            onClick={() => handleToggleStatus(practitioner)}
                            className={!practitioner.isActive ? "text-green-600 border-green-200" : ""}
                          >
                            {practitioner.isActive ? (
                              <>
                                <UserX className="mr-2 h-4 w-4" /> Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" /> Activate
                              </>
                            )}
                          </Button>
                        </div>
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
    </div>
  )
}
