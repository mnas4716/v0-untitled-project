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
import { Phone, FileText, Stethoscope, ClipboardList, Save, CheckCircle } from "lucide-react"
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

export default function ConsultDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [doctor, setDoctor] = useState<any>(null)
  const [consultation, setConsultation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [doctorNotes, setDoctorNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
            setDoctorNotes(consultationDetails.doctorNotes || "")
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
    if (!consultation) return

    setIsSaving(true)
    try {
      const updatedConsultation = updateConsultRequest(consultation.id, {
        doctorNotes,
      })

      if (updatedConsultation) {
        setConsultation(updatedConsultation)
        toast({
          title: "Notes Saved",
          description: "Your notes have been saved successfully.",
        })
      } else {
        throw new Error("Failed to save notes")
      }
    } catch (error) {
      console.error("Error saving notes:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save notes. Please try again.",
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
      if (doctorNotes !== consultation.doctorNotes) {
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

    const updatedNotes = doctorNotes
      ? `${doctorNotes}\n\n--- REFERRAL ---\n${referralNote}`
      : `--- REFERRAL ---\n${referralNote}`

    setDoctorNotes(updatedNotes)

    // Save the updated notes
    updateConsultRequest(consultation.id, {
      doctorNotes: updatedNotes,
    }).then((updatedConsult) => {
      if (updatedConsult) {
        setConsultation(updatedConsult)
        toast({
          title: "Referral Sent",
          description: `Referral to ${referralDetails.specialist} has been recorded`,
        })
      }
    })
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

    const updatedNotes = doctorNotes
      ? `${doctorNotes}\n\n--- PRESCRIPTION ---\n${prescriptionNote}`
      : `--- PRESCRIPTION ---\n${prescriptionNote}`

    setDoctorNotes(updatedNotes)

    // Save the updated notes
    updateConsultRequest(consultation.id, {
      doctorNotes: updatedNotes,
    }).then((updatedConsult) => {
      if (updatedConsult) {
        setConsultation(updatedConsult)
        toast({
          title: "Prescription Issued",
          description: `Prescription for ${prescriptionDetails.medication} has been recorded`,
        })
      }
    })
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

    const updatedNotes = doctorNotes
      ? `${doctorNotes}\n\n--- MEDICAL CERTIFICATE ---\n${certificateNote}`
      : `--- MEDICAL CERTIFICATE ---\n${certificateNote}`

    setDoctorNotes(updatedNotes)

    // Save the updated notes
    updateConsultRequest(consultation.id, {
      doctorNotes: updatedNotes,
    }).then((updatedConsult) => {
      if (updatedConsult) {
        setConsultation(updatedConsult)
        toast({
          title: "Medical Certificate Issued",
          description: `Medical certificate from ${certificateDetails.startDate} to ${certificateDetails.endDate} has been recorded`,
        })
      }
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
              {consultation.status === "completed" && consultation.completedAt && (
                <div>
                  <p className="text-sm font-medium">Completed Date</p>
                  <p>{formatDate(consultation.completedAt)}</p>
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
                    className="min-h-[200px]"
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotes} disabled={isSaving}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Notes"}
                  </Button>
                </div>

                {doctorNotes && (
                  <div className="bg-white border border-slate-200 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Saved Notes</h4>
                    <pre className="whitespace-pre-wrap text-sm">{doctorNotes}</pre>
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
