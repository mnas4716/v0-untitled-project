"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, File, FileImage, FileIcon as FilePdf, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  getConsultRequestById,
  cancelConsultRequest,
  getDoctorById,
  getAllDoctors,
  assignDoctorToConsult,
} from "@/lib/database-service"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DoctorNote {
  text: string
  timestamp: string
  doctorId: string
  doctorName: string
}

interface FileAttachment {
  id: string
  fileName: string
  fileType: string
  fileSize: number
  content: string // base64 encoded content
  uploadedAt: string
}

interface Consultation {
  id: string
  patientName: string
  email: string
  phone: string
  date: string
  time: string
  reason: string
  status: string
  type: string
  createdAt: string
  completedAt?: string
  cancelledAt?: string
  cancelReason?: string
  doctorNotes?: string
  details?: any
  assignedDoctorId?: string
  attachments?: FileAttachment[]
  address?: string
  suburb?: string
  state?: string
  postcode?: string
}

interface Doctor {
  id: string
  firstName: string
  lastName: string
  email: string
  specialty: string
  status: string
  isActive: boolean
}

export default function AdminConsultPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params

  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [assignedDoctor, setAssignedDoctor] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [doctorNotes, setDoctorNotes] = useState<DoctorNote[]>([])
  const [attachments, setAttachments] = useState<FileAttachment[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("")
  const [isReassignDialogOpen, setIsReassignDialogOpen] = useState(false)

  // Load consultation data
  useEffect(() => {
    const loadConsultation = async () => {
      setIsLoading(true)
      try {
        const consultRequest = getConsultRequestById(id as string)
        const allDoctors = getAllDoctors().filter((doctor) => doctor.isActive)

        setDoctors(allDoctors)

        if (consultRequest) {
          setConsultation(consultRequest)

          // Set attachments if they exist
          if (consultRequest.attachments && consultRequest.attachments.length > 0) {
            setAttachments(consultRequest.attachments)
          }

          // Parse doctor notes if they exist
          if (consultRequest.doctorNotes) {
            try {
              const parsedNotes = JSON.parse(consultRequest.doctorNotes)
              if (Array.isArray(parsedNotes)) {
                setDoctorNotes(parsedNotes)
              } else {
                // Handle legacy format - convert to new format
                setDoctorNotes([
                  {
                    text: consultRequest.doctorNotes,
                    timestamp: consultRequest.updatedAt || consultRequest.createdAt,
                    doctorId: consultRequest.assignedDoctorId || "unknown",
                    doctorName: "Doctor",
                  },
                ])
              }
            } catch (e) {
              // If not valid JSON, treat as legacy string format
              setDoctorNotes([
                {
                  text: consultRequest.doctorNotes,
                  timestamp: consultRequest.updatedAt || consultRequest.createdAt,
                  doctorId: consultRequest.assignedDoctorId || "unknown",
                  doctorName: "Doctor",
                },
              ])
            }
          }

          // Load assigned doctor if any
          if (consultRequest.assignedDoctorId) {
            const doctor = getDoctorById(consultRequest.assignedDoctorId)
            if (doctor) {
              setAssignedDoctor(doctor)
              setSelectedDoctorId(doctor.id)
            }
          }
        } else {
          router.push("/admin/dashboard")
        }
      } catch (error) {
        console.error("Error loading consultation:", error)
        router.push("/admin/dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    loadConsultation()
  }, [id, router])

  // Handle reassigning doctor
  const handleReassignDoctor = useCallback(() => {
    if (!consultation || !selectedDoctorId) return

    try {
      // Assign the consultation to the selected doctor
      const updatedConsult = assignDoctorToConsult(consultation.id, selectedDoctorId)

      if (updatedConsult) {
        // Get the new doctor details
        const newDoctor = getDoctorById(selectedDoctorId)

        // Update local state
        setConsultation(updatedConsult)
        setAssignedDoctor(newDoctor)

        // Close dialog and show success message
        setIsReassignDialogOpen(false)

        toast({
          title: "Doctor Reassigned",
          description: `This consultation has been reassigned to Dr. ${newDoctor?.firstName} ${newDoctor?.lastName}.`,
        })
      }
    } catch (error) {
      console.error("Error reassigning doctor:", error)
      toast({
        variant: "destructive",
        title: "Reassignment Failed",
        description: "There was an error reassigning the doctor. Please try again.",
      })
    }
  }, [consultation, selectedDoctorId, toast])

  // Handle cancelling a consultation
  const handleCancelConsultation = useCallback(() => {
    if (!consultation) return

    // Confirm before cancelling
    if (!window.confirm("Are you sure you want to cancel this consultation?")) {
      return
    }

    try {
      // Cancel the consultation in the database
      const result = cancelConsultRequest(consultation.id, "Cancelled by admin")

      if (result) {
        // Update local state
        setConsultation({
          ...consultation,
          status: "cancelled",
          cancelledAt: new Date().toISOString(),
          cancelReason: "Cancelled by admin",
        })
      }
    } catch (error) {
      console.error("Error cancelling consultation:", error)
      alert("Failed to cancel consultation")
    }
  }, [consultation])

  // Get consultation type badge
  const getConsultationTypeBadge = useCallback((type: string) => {
    switch (type) {
      case "consultation":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Consultation</Badge>
      case "medical-certificate":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Medical Certificate</Badge>
      case "prescription":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Prescription</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{type}</Badge>
    }
  }, [])

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  // Format file size for display
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  // Get file icon based on file type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <FileImage className="h-5 w-5" />
    else if (fileType === "application/pdf") return <FilePdf className="h-5 w-5" />
    else return <File className="h-5 w-5" />
  }

  // Handle file download
  const handleDownloadFile = (attachment: FileAttachment) => {
    try {
      // Create a blob from the base64 content
      const byteCharacters = atob(attachment.content)
      const byteArrays = []

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }

      const blob = new Blob(byteArrays, { type: attachment.fileType })

      // Create a download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = attachment.fileName
      document.body.appendChild(a)
      a.click()

      // Clean up
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 0)

      toast({
        title: "File Downloaded",
        description: `${attachment.fileName} has been downloaded.`,
      })
    } catch (error) {
      console.error("Error downloading file:", error)
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was an error downloading the file.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading consultation...</p>
      </div>
    )
  }

  if (!consultation) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500">Consultation not found</p>
        <Button className="mt-4" onClick={() => router.push("/admin/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-AU")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/admin/dashboard")} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex space-x-2">
          {consultation.status === "pending" && (
            <>
              <Dialog open={isReassignDialogOpen} onOpenChange={setIsReassignDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    {assignedDoctor ? "Reassign Doctor" : "Assign Doctor"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{assignedDoctor ? "Reassign Doctor" : "Assign Doctor"}</DialogTitle>
                    <DialogDescription>
                      {assignedDoctor
                        ? `This consultation is currently assigned to Dr. ${assignedDoctor.firstName} ${assignedDoctor.lastName}. Select a different doctor to reassign.`
                        : "Select a doctor to assign to this consultation."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            Dr. {doctor.firstName} {doctor.lastName} ({doctor.specialty})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsReassignDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleReassignDoctor} disabled={!selectedDoctorId}>
                      {assignedDoctor ? "Reassign" : "Assign"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="destructive" onClick={handleCancelConsultation}>
                Cancel Consultation
              </Button>
            </>
          )}
        </div>
      </div>

      {consultation.status === "cancelled" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p className="font-medium">This consultation has been cancelled</p>
          {consultation.cancelReason && <p className="text-sm mt-1">Reason: {consultation.cancelReason}</p>}
          {consultation.cancelledAt && (
            <p className="text-sm mt-1">Cancelled on: {new Date(consultation.cancelledAt).toLocaleString()}</p>
          )}
        </div>
      )}

      {consultation.status === "completed" && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
          <p className="font-medium">This consultation has been completed</p>
          {consultation.completedAt && (
            <p className="text-sm mt-1">Completed on: {new Date(consultation.completedAt).toLocaleString()}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Information */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{consultation.patientName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{consultation.patientName}</h3>
                {getConsultationTypeBadge(consultation.type)}
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p>{consultation.patientName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{consultation.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p>{consultation.phone}</p>
              </div>
              {consultation.details?.medicareNumber && (
                <div>
                  <p className="text-sm font-medium">Medicare Number</p>
                  <p>{consultation.details.medicareNumber}</p>
                </div>
              )}
              {consultation.details?.address && (
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p>{consultation.details.address}</p>
                </div>
              )}
              {consultation.details?.dob && (
                <div>
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p>{consultation.details.dob}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium">Request Date</p>
                <p>{formatDate(consultation.createdAt)}</p>
              </div>
              {/* Patient Details */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Existing fields */}

                {/* Address Details */}
                <div className="space-y-1">
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {consultation.address}
                    <br />
                    {consultation.suburb}, {consultation.state} {consultation.postcode}
                  </p>
                </div>

                {/* Other existing fields */}
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Email:</span>
                <span>{consultation.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Phone:</span>
                <span>{consultation.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Date Requested:</span>
                <span>{new Date(consultation.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Appointment:</span>
                <span>
                  {consultation.date} at {consultation.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Status:</span>
                <span
                  className={`font-medium ${
                    consultation.status === "pending"
                      ? "text-amber-600"
                      : consultation.status === "completed"
                        ? "text-green-600"
                        : "text-red-600"
                  }`}
                >
                  {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Assigned Doctor:</span>
                {assignedDoctor ? (
                  <span>
                    Dr. {assignedDoctor.firstName} {assignedDoctor.lastName}
                  </span>
                ) : (
                  <span className="text-amber-600">Not assigned</span>
                )}
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="font-medium">Reason for Consultation</h4>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-md">{consultation.reason}</p>
            </div>

            {consultation.type === "medical-certificate" && consultation.details?.startDate && (
              <div className="pt-2 space-y-2">
                <h4 className="font-medium">Certificate Details</h4>
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-slate-500">Start Date:</p>
                      <p>{consultation.details.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">End Date:</p>
                      <p>{consultation.details.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {consultation.type === "prescription" && consultation.details?.medication && (
              <div className="pt-2 space-y-2">
                <h4 className="font-medium">Prescription Details</h4>
                <div className="bg-slate-50 p-3 rounded-md">
                  <p className="text-sm text-slate-500">Medication:</p>
                  <p>{consultation.details.medication}</p>
                  <p className="text-sm text-slate-500 mt-2">Delivery Option:</p>
                  <p className="capitalize">{consultation.details.deliveryOption}</p>
                </div>
              </div>
            )}

            {/* Attachments Section */}
            {attachments.length > 0 && (
              <div className="pt-4">
                <h4 className="font-medium mb-2">Attachments</h4>
                <div className="space-y-2">
                  {attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-2 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center">
                        {getFileIcon(attachment.fileType)}
                        <span className="ml-2 text-sm truncate max-w-[150px]">{attachment.fileName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-slate-500 mr-2">{formatFileSize(attachment.fileSize)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadFile(attachment)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Consultation Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Consultation Details</CardTitle>
            <CardDescription>View consultation information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details & Notes</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                {/* Doctor Notes Section - View Only */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Doctor Notes</h3>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-sm text-yellow-700">
                      <strong>Note:</strong> These notes are for internal use only and will never be visible to
                      patients.
                    </p>
                  </div>

                  {doctorNotes.length > 0 ? (
                    <div className="space-y-4">
                      {doctorNotes.map((note, index) => (
                        <div key={index} className="bg-white border border-slate-200 p-4 rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-sm">{note.doctorName}</span>
                            <span className="text-xs text-slate-500">{formatTimestamp(note.timestamp)}</span>
                          </div>
                          <pre className="whitespace-pre-wrap text-sm">{note.text}</pre>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-md text-slate-500 text-center">
                      No doctor notes have been added yet.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="timeline">
                <div className="space-y-4">
                  <div className="border-l-2 border-slate-200 pl-4 ml-4 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="font-medium">Consultation Created</p>
                        <p className="text-sm text-slate-500">{new Date(consultation.createdAt).toLocaleString()}</p>
                      </div>
                    </div>

                    {assignedDoctor && (
                      <div className="relative">
                        <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-purple-500"></div>
                        <div>
                          <p className="font-medium">Doctor Assigned</p>
                          <p className="text-sm text-slate-500">
                            Assigned to Dr. {assignedDoctor.firstName} {assignedDoctor.lastName}
                          </p>
                        </div>
                      </div>
                    )}

                    {consultation.status === "completed" && consultation.completedAt && (
                      <div className="relative">
                        <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-green-500"></div>
                        <div>
                          <p className="font-medium">Consultation Completed</p>
                          <p className="text-sm text-slate-500">
                            {new Date(consultation.completedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {consultation.status === "cancelled" && consultation.cancelledAt && (
                      <div className="relative">
                        <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-red-500"></div>
                        <div>
                          <p className="font-medium">Consultation Cancelled</p>
                          <p className="text-sm text-slate-500">
                            {new Date(consultation.cancelledAt).toLocaleString()}
                          </p>
                          {consultation.cancelReason && (
                            <p className="text-sm text-slate-600 mt-1">Reason: {consultation.cancelReason}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {attachments.length > 0 && (
                      <div className="relative">
                        <div className="absolute -left-6 mt-1.5 h-3 w-3 rounded-full bg-purple-500"></div>
                        <div>
                          <p className="font-medium">Documents Uploaded</p>
                          <p className="text-sm text-slate-500">
                            {attachments.length} file(s) uploaded with this consultation
                          </p>
                          <ul className="mt-2 space-y-1">
                            {attachments.map((attachment) => (
                              <li key={attachment.id} className="text-sm flex items-center">
                                {getFileIcon(attachment.fileType)}
                                <span className="ml-2">{attachment.fileName}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
