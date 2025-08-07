"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getConsultRequestById, updateConsultRequest, markConsultRequestAsCompleted } from "@/lib/database-service"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Phone,
  FileText,
  Stethoscope,
  ClipboardList,
  Save,
  CheckCircle,
  Download,
  File,
  FileImage,
  FileIcon as FilePdf,
  MapPin,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

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

export default function ConsultDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [doctor, setDoctor] = useState<any>(null)
  const [consultation, setConsultation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentNote, setCurrentNote] = useState("")
  const [doctorNotes, setDoctorNotes] = useState<DoctorNote[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attachments, setAttachments] = useState<FileAttachment[]>([])

  // States for dialogs
  const [referralDetails, setReferralDetails] = useState({
    specialist: "",
    reason: "",
    urgency: "Normal",
  })
  const [prescriptionDetails, setPrescrptionDetails] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  })
  const [certificateDetails, setCertificateDetails] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    restrictions: "",
  })

  useEffect(() => {
    // Get doctor from localStorage
    if (typeof window !== "undefined") {
      const storedDoctor = localStorage.getItem("doctorUser")
      if (!storedDoctor) {
        router.push("/doctor/signin")
        return
      }

      try {
        const parsedDoctor = JSON.parse(storedDoctor)
        setDoctor(parsedDoctor)

        // Get consultation details
        const consultationDetails = getConsultRequestById(params.id)
        if (!consultationDetails) {
          setError("Consultation not found")
        } else {
          // Check if this consultation is assigned to this doctor
          if (consultationDetails.assignedDoctorId && consultationDetails.assignedDoctorId !== parsedDoctor.id) {
            setError("This consultation is not assigned to you")
          } else {
            setConsultation(consultationDetails)

            // Set attachments if they exist
            if (consultationDetails.attachments && consultationDetails.attachments.length > 0) {
              setAttachments(consultationDetails.attachments)
            }

            // Parse doctor notes if they exist
            if (consultationDetails.doctorNotes) {
              try {
                const parsedNotes = JSON.parse(consultationDetails.doctorNotes)
                if (Array.isArray(parsedNotes)) {
                  setDoctorNotes(parsedNotes)
                } else {
                  // Handle legacy format - convert to new format
                  setDoctorNotes([
                    {
                      text: consultationDetails.doctorNotes,
                      timestamp: consultationDetails.updatedAt || consultationDetails.createdAt,
                      doctorId: parsedDoctor.id,
                      doctorName: `Dr. ${parsedDoctor.firstName} ${parsedDoctor.lastName}`,
                    },
                  ])
                }
              } catch (e) {
                // If not valid JSON, treat as legacy string format
                setDoctorNotes([
                  {
                    text: consultationDetails.doctorNotes,
                    timestamp: consultationDetails.updatedAt || consultationDetails.createdAt,
                    doctorId: parsedDoctor.id,
                    doctorName: `Dr. ${parsedDoctor.firstName} ${parsedDoctor.lastName}`,
                  },
                ])
              }
            }
          }
        }
      } catch (error) {
        console.error("Error loading consultation:", error)
        setError("Failed to load consultation details")
      } finally {
        setIsLoading(false)
      }
    }
  }, [params.id, router])

  const handleSaveNotes = async () => {
    if (!consultation || !currentNote.trim()) return

    setIsSaving(true)
    try {
      // Create a new note
      const newNote: DoctorNote = {
        text: currentNote,
        timestamp: new Date().toISOString(),
        doctorId: doctor.id,
        doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
      }

      // Add to existing notes
      const updatedNotes = [...doctorNotes, newNote]

      // Save to database as JSON string
      const updatedConsultation = updateConsultRequest(consultation.id, {
        doctorNotes: JSON.stringify(updatedNotes),
      })

      if (updatedConsultation) {
        setDoctorNotes(updatedNotes)
        setCurrentNote("") // Clear the input field
        setConsultation(updatedConsultation)
        toast({
          title: "Note Added",
          description: "Your note has been saved successfully.",
        })
      } else {
        throw new Error("Failed to save note")
      }
    } catch (error) {
      console.error("Error saving notes:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save note. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCompleteConsultation = async () => {
    if (!consultation) return

    if (consultation.status === "completed") {
      toast({
        title: "Already Completed",
        description: "This consultation has already been marked as completed.",
      })
      return
    }

    setIsCompleting(true)
    try {
      // First save any unsaved notes
      if (currentNote.trim()) {
        await handleSaveNotes()
      }

      // Mark as completed
      const completedConsultation = markConsultRequestAsCompleted(consultation.id)

      if (completedConsultation) {
        setConsultation(completedConsultation)
        toast({
          title: "Consultation Completed",
          description: "The consultation has been marked as completed.",
        })
      } else {
        throw new Error("Failed to complete consultation")
      }
    } catch (error) {
      console.error("Error completing consultation:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to complete consultation. Please try again.",
      })
    } finally {
      setIsCompleting(false)
    }
  }

  const handleCallPatient = () => {
    // In a real app, this would initiate a call
    // For demo purposes, we'll just show a toast
    toast({
      title: "Calling Patient",
      description: `Initiating call to ${consultation.patientName} at ${consultation.phone}`,
    })
  }

  const handleSendReferral = () => {
    // In a real app, this would send a referral
    // For demo purposes, we'll just show a toast and update the notes
    const referralNote = `
Referral sent to: ${referralDetails.specialist}
Reason: ${referralDetails.reason}
Urgency: ${referralDetails.urgency}
Date: ${new Date().toLocaleDateString()}
    `.trim()

    // Add as a new note
    setCurrentNote(referralNote)
    handleSaveNotes()
  }

  const handleIssuePrescription = () => {
    // In a real app, this would issue a prescription
    // For demo purposes, we'll just show a toast and update the notes
    const prescriptionNote = `
PRESCRIPTION
Medication: ${prescriptionDetails.medication}
Dosage: ${prescriptionDetails.dosage}
Frequency: ${prescriptionDetails.frequency}
Duration: ${prescriptionDetails.duration}
Instructions: ${prescriptionDetails.instructions}
Date: ${new Date().toLocaleDateString()}
    `.trim()

    // Add as a new note
    setCurrentNote(prescriptionNote)
    handleSaveNotes()
  }

  const handleIssueMedicalCertificate = () => {
    // In a real app, this would issue a medical certificate
    // For demo purposes, we'll just show a toast and update the notes
    const certificateNote = `
MEDICAL CERTIFICATE
Start Date: ${certificateDetails.startDate}
End Date: ${certificateDetails.endDate}
Reason: ${certificateDetails.reason}
Restrictions: ${certificateDetails.restrictions}
Date Issued: ${new Date().toLocaleDateString()}
    `.trim()

    // Add as a new note
    setCurrentNote(certificateNote)
    handleSaveNotes()
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !consultation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error || "Consultation not found"}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button asChild>
            <Link href="/doctor/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/doctor/dashboard" className="text-blue-600 hover:underline">
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Consultation Details</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              className={
                consultation.type === "consultation"
                  ? "bg-blue-100 text-blue-800"
                  : consultation.type === "medical-certificate"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
              }
            >
              {consultation.type.replace("-", " ")}
            </Badge>
            {consultation.status === "pending" ? (
              <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
            ) : consultation.status === "completed" ? (
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {consultation.status === "pending" && (
            <Button onClick={handleCompleteConsultation} disabled={isCompleting}>
              <CheckCircle className="mr-2 h-4 w-4" />
              {isCompleting ? "Completing..." : "Mark as Completed"}
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Details of the patient</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              {consultation.details?.dob && (
                <div>
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p>{consultation.details.dob}</p>
                </div>
              )}

              {/* Address Information */}
              <div className="pt-2">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                  <p className="text-sm font-medium">Address</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-md">
                  <p>{consultation.details?.address || "Not provided"}</p>
                  {consultation.details?.suburb && consultation.details?.state && consultation.details?.postcode && (
                    <p>
                      {consultation.details.suburb}, {consultation.details.state} {consultation.details.postcode}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Request Date</p>
                <p>{formatDate(consultation.createdAt)}</p>
              </div>
              {consultation.status === "completed" && consultation.completedAt && (
                <div>
                  <p className="text-sm font-medium">Completed Date</p>
                  <p>{formatDate(consultation.completedAt)}</p>
                </div>
              )}

              {/* Attachments Section */}
              {attachments.length > 0 && (
                <div className="pt-4">
                  <p className="text-sm font-medium mb-2">Attachments</p>
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
            <CardFooter className="flex flex-col items-stretch gap-2">
              <Button variant="outline" className="w-full justify-start" onClick={handleCallPatient}>
                <Phone className="mr-2 h-4 w-4" />
                Call Patient
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Send Referral
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Referral</DialogTitle>
                    <DialogDescription>Create a referral for this patient to see a specialist.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="specialist">Specialist/Facility</Label>
                      <Input
                        id="specialist"
                        value={referralDetails.specialist}
                        onChange={(e) => setReferralDetails({ ...referralDetails, specialist: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reason">Reason for Referral</Label>
                      <Textarea
                        id="reason"
                        value={referralDetails.reason}
                        onChange={(e) => setReferralDetails({ ...referralDetails, reason: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="urgency">Urgency</Label>
                      <select
                        id="urgency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={referralDetails.urgency}
                        onChange={(e) => setReferralDetails({ ...referralDetails, urgency: e.target.value })}
                      >
                        <option>Urgent</option>
                        <option>High</option>
                        <option>Normal</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSendReferral}>Send Referral</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Stethoscope className="mr-2 h-4 w-4" />
                    Issue Prescription
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Issue Prescription</DialogTitle>
                    <DialogDescription>Create a prescription for this patient.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="medication">Medication</Label>
                      <Input
                        id="medication"
                        value={prescriptionDetails.medication}
                        onChange={(e) => setPrescrptionDetails({ ...prescriptionDetails, medication: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="dosage">Dosage</Label>
                        <Input
                          id="dosage"
                          value={prescriptionDetails.dosage}
                          onChange={(e) => setPrescrptionDetails({ ...prescriptionDetails, dosage: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input
                          id="frequency"
                          value={prescriptionDetails.frequency}
                          onChange={(e) => setPrescrptionDetails({ ...prescriptionDetails, frequency: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={prescriptionDetails.duration}
                        onChange={(e) => setPrescrptionDetails({ ...prescriptionDetails, duration: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="instructions">Special Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={prescriptionDetails.instructions}
                        onChange={(e) =>
                          setPrescrptionDetails({ ...prescriptionDetails, instructions: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleIssuePrescription}>Issue Prescription</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Issue Medical Certificate
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Issue Medical Certificate</DialogTitle>
                    <DialogDescription>Create a medical certificate for this patient.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={certificateDetails.startDate}
                          onChange={(e) => setCertificateDetails({ ...certificateDetails, startDate: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={certificateDetails.endDate}
                          onChange={(e) => setCertificateDetails({ ...certificateDetails, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="certReason">Reason</Label>
                      <Input
                        id="certReason"
                        value={certificateDetails.reason}
                        onChange={(e) => setCertificateDetails({ ...certificateDetails, reason: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="restrictions">Restrictions/Recommendations</Label>
                      <Textarea
                        id="restrictions"
                        value={certificateDetails.restrictions}
                        onChange={(e) => setCertificateDetails({ ...certificateDetails, restrictions: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleIssueMedicalCertificate}>Issue Certificate</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
              <CardDescription>Information and notes about the consultation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Consultation Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Reason for Consultation</h3>
                <div className="bg-slate-50 p-4 rounded-md">
                  <p className="text-slate-700 whitespace-pre-line">{consultation.reason}</p>
                </div>

                {consultation.type === "medical-certificate" && consultation.details && (
                  <div>
                    <h3 className="text-lg font-medium">Medical Certificate Request</h3>
                    <div className="bg-slate-50 p-4 rounded-md grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Start Date</p>
                        <p>{consultation.details.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">End Date</p>
                        <p>{consultation.details.endDate}</p>
                      </div>
                    </div>
                  </div>
                )}

                {consultation.type === "prescription" && consultation.details && (
                  <div>
                    <h3 className="text-lg font-medium">Prescription Request</h3>
                    <div className="bg-slate-50 p-4 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Medication</p>
                        <p>{consultation.details.medication}</p>
                      </div>
                      {consultation.details.deliveryOption && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Delivery Option</p>
                          <p className="capitalize">{consultation.details.deliveryOption}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Doctor Notes Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Doctor Notes</h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> These notes are for healthcare staff only and will never be visible to
                    patients.
                  </p>
                </div>

                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter confidential notes about this patient or consultation..."
                    className="min-h-[150px]"
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotes} disabled={isSaving || !currentNote.trim()}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Add Note"}
                  </Button>
                </div>

                {doctorNotes.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <h4 className="font-medium">Previous Notes</h4>
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
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link href="/doctor/dashboard">Back to Dashboard</Link>
              </Button>
              {consultation.status === "pending" && (
                <Button onClick={handleCompleteConsultation} disabled={isCompleting}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {isCompleting ? "Completing..." : "Mark as Completed"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
