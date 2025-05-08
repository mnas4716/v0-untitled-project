// Optimize the consultation page for better performance

"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  FileText,
  ClipboardList,
  Phone,
  Video,
  ArrowLeft,
  Save,
  Printer,
  Download,
  Share2,
  MessageSquare,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the consultation type
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
  notes?: string
  patientHistory?: PatientHistory
}

interface PatientHistory {
  allergies: string[]
  medications: string[]
  conditions: string[]
  pastConsultations: PastConsultation[]
}

interface PastConsultation {
  id: string
  date: string
  reason: string
  diagnosis: string
  treatment: string
  doctor: string
}

export default function ConsultPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [consultation, setConsultation] = useState<Consultation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [isMedCertDialogOpen, setIsMedCertDialogOpen] = useState(false)
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = useState(false)
  const [isReferralDialogOpen, setIsReferralDialogOpen] = useState(false)

  // Mock patient history data
  const mockPatientHistory: PatientHistory = {
    allergies: ["Penicillin", "Peanuts"],
    medications: ["Lisinopril 10mg daily", "Metformin 500mg twice daily"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    pastConsultations: [
      {
        id: "pc1",
        date: "2023-03-15",
        reason: "Annual checkup",
        diagnosis: "Hypertension, well controlled",
        treatment: "Continue current medications",
        doctor: "Dr. Johnson",
      },
      {
        id: "pc2",
        date: "2023-01-10",
        reason: "Flu symptoms",
        diagnosis: "Seasonal influenza",
        treatment: "Rest, fluids, acetaminophen for fever",
        doctor: "Dr. Wilson",
      },
    ],
  }

  // Load consultation data
  useEffect(() => {
    let isMounted = true

    const loadConsultation = async () => {
      if (!isMounted) return

      setIsLoading(true)
      try {
        if (typeof window !== "undefined") {
          // Get consultations from localStorage
          const storedConsultations = localStorage.getItem("consultations")
          let consultations: Consultation[] = []

          if (storedConsultations) {
            try {
              consultations = JSON.parse(storedConsultations)
              const foundConsultation = consultations.find((c) => c.id === id)

              if (foundConsultation && isMounted) {
                // Add mock patient history to the consultation
                foundConsultation.patientHistory = mockPatientHistory
                setConsultation(foundConsultation)
                setNotes(foundConsultation.notes || "")
              } else if (isMounted) {
                router.push("/doctor/dashboard")
              }
            } catch (error) {
              console.error("Error parsing consultations data:", error)
              if (isMounted) {
                router.push("/doctor/dashboard")
              }
            }
          } else if (isMounted) {
            router.push("/doctor/dashboard")
          }
        }
      } catch (error) {
        console.error("Error loading consultation:", error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadConsultation()

    return () => {
      isMounted = false
    }
  }, [id, router])

  // Save consultation notes
  const saveNotes = useCallback(() => {
    if (!consultation) return

    try {
      if (typeof window !== "undefined") {
        const storedConsultations = localStorage.getItem("consultations")

        if (storedConsultations) {
          const consultations: Consultation[] = JSON.parse(storedConsultations)
          const updatedConsultations = consultations.map((c) => {
            if (c.id === consultation.id) {
              return { ...c, notes }
            }
            return c
          })

          localStorage.setItem("consultations", JSON.stringify(updatedConsultations))

          // Update local state
          setConsultation({ ...consultation, notes })

          // Show success message
          alert("Notes saved successfully")
        }
      }
    } catch (error) {
      console.error("Error saving notes:", error)
      alert("Failed to save notes")
    }
  }, [consultation, notes])

  // Complete consultation
  const completeConsultation = useCallback(() => {
    if (!consultation) return

    try {
      if (typeof window !== "undefined") {
        const storedConsultations = localStorage.getItem("consultations")

        if (storedConsultations) {
          const consultations: Consultation[] = JSON.parse(storedConsultations)
          const updatedConsultations = consultations.map((c) => {
            if (c.id === consultation.id) {
              return {
                ...c,
                status: "completed",
                completedAt: new Date().toISOString(),
                notes,
              }
            }
            return c
          })

          localStorage.setItem("consultations", JSON.stringify(updatedConsultations))

          // Redirect to dashboard
          router.push("/doctor/dashboard")
        }
      }
    } catch (error) {
      console.error("Error completing consultation:", error)
      alert("Failed to complete consultation")
    }
  }, [consultation, notes, router])

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
        <Button className="mt-4" onClick={() => router.push("/doctor/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/doctor/dashboard")} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button onClick={completeConsultation}>Complete Consultation</Button>
        </div>
      </div>

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
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="font-medium">Reason for Consultation</h4>
              <p className="text-slate-700 bg-slate-50 p-3 rounded-md">{consultation.reason}</p>
            </div>

            <div className="pt-2 space-y-2">
              <h4 className="font-medium">Patient History</h4>

              <div>
                <h5 className="text-sm font-medium text-slate-500">Allergies</h5>
                <div className="flex flex-wrap gap-1 mt-1">
                  {consultation.patientHistory?.allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-slate-500">Current Medications</h5>
                <ul className="list-disc list-inside text-sm mt-1">
                  {consultation.patientHistory?.medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-medium text-slate-500">Medical Conditions</h5>
                <div className="flex flex-wrap gap-1 mt-1">
                  {consultation.patientHistory?.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <h4 className="font-medium">Contact Patient</h4>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" className="flex-1">
                  <Video className="mr-2 h-4 w-4" />
                  Video
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultation Workspace */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Consultation Workspace</CardTitle>
            <CardDescription>Document your findings and create necessary medical documents</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notes">
              <TabsList className="mb-4">
                <TabsTrigger value="notes">Clinical Notes</TabsTrigger>
                <TabsTrigger value="history">Past Consultations</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input
                    id="diagnosis"
                    placeholder="Enter diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Clinical Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter your clinical notes here..."
                    className="min-h-[200px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={saveNotes}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Notes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="history">
                {consultation.patientHistory?.pastConsultations.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">No past consultations found</div>
                ) : (
                  <div className="space-y-4">
                    {consultation.patientHistory?.pastConsultations.map((pastConsult) => (
                      <div key={pastConsult.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{new Date(pastConsult.date).toLocaleDateString()}</h3>
                            <p className="text-sm text-slate-500">Doctor: {pastConsult.doctor}</p>
                          </div>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-sm font-medium">Reason: </span>
                            <span className="text-sm">{pastConsult.reason}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Diagnosis: </span>
                            <span className="text-sm">{pastConsult.diagnosis}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Treatment: </span>
                            <span className="text-sm">{pastConsult.treatment}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Medical Certificate</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-slate-500">Issue a medical certificate for the patient</p>
                    </CardContent>
                    <CardFooter>
                      <Dialog open={isMedCertDialogOpen} onOpenChange={setIsMedCertDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <ClipboardList className="mr-2 h-4 w-4" />
                            Create Certificate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Issue Medical Certificate</DialogTitle>
                            <DialogDescription>
                              Create a medical certificate for {consultation.patientName}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="condition">Medical Condition</Label>
                              <Input id="condition" placeholder="Enter medical condition" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input id="startDate" type="date" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input id="endDate" type="date" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="recommendations">Recommendations</Label>
                              <Textarea
                                id="recommendations"
                                placeholder="Enter your recommendations..."
                                className="min-h-[100px]"
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsMedCertDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => setIsMedCertDialogOpen(false)}>Generate Certificate</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Prescription</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-slate-500">Issue a prescription for the patient</p>
                    </CardContent>
                    <CardFooter>
                      <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <FileText className="mr-2 h-4 w-4" />
                            Create Prescription
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Issue Prescription</DialogTitle>
                            <DialogDescription>Create a prescription for {consultation.patientName}</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="medication">Medication</Label>
                              <Input id="medication" placeholder="Enter medication name" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="dosage">Dosage</Label>
                                <Input id="dosage" placeholder="e.g., 10mg" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="frequency">Frequency</Label>
                                <Input id="frequency" placeholder="e.g., Twice daily" />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="duration">Duration</Label>
                              <Input id="duration" placeholder="e.g., 7 days" />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="instructions">Special Instructions</Label>
                              <Textarea
                                id="instructions"
                                placeholder="Enter any special instructions..."
                                className="min-h-[100px]"
                              />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsPrescriptionDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => setIsPrescriptionDialogOpen(false)}>Generate Prescription</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Referral</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-slate-500">Create a referral to a specialist</p>
                    </CardContent>
                    <CardFooter>
                      <Dialog open={isReferralDialogOpen} onOpenChange={setIsReferralDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <Share2 className="mr-2 h-4 w-4" />
                            Create Referral
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Create Referral</DialogTitle>
                            <DialogDescription>Refer {consultation.patientName} to a specialist</DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="specialty">Specialty</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select specialty" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cardiology">Cardiology</SelectItem>
                                  <SelectItem value="dermatology">Dermatology</SelectItem>
                                  <SelectItem value="neurology">Neurology</SelectItem>
                                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                                  <SelectItem value="psychiatry">Psychiatry</SelectItem>
                                  <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="urgency">Urgency</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select urgency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="routine">Routine</SelectItem>
                                  <SelectItem value="urgent">Urgent</SelectItem>
                                  <SelectItem value="emergency">Emergency</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="reason">Reason for Referral</Label>
                              <Textarea
                                id="reason"
                                placeholder="Enter reason for referral..."
                                className="min-h-[100px]"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="notes">Clinical Notes for Specialist</Label>
                              <Textarea id="notes" placeholder="Enter clinical notes..." className="min-h-[100px]" />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsReferralDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => setIsReferralDialogOpen(false)}>Generate Referral</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Lab Request</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-slate-500">Request laboratory tests</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Create Lab Request
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
