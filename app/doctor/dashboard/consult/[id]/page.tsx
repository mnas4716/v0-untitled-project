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
import { Phone, FileText, Stethoscope, ClipboardList, Save, CheckCircle, Download, File, FileImage, FileIcon as FilePdf, MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
  const [referralDetails, setReferralDetails] = useState({ specialist: "", reason: "", urgency: "Normal" })
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  })
  const [certificateDetails, setCertificateDetails] = useState({ startDate: "", endDate: "", reason: "", restrictions: "" })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDoctor = localStorage.getItem("doctorUser")
      if (!storedDoctor) {
        router.push("/doctor/signin")
        return
      }

      try {
        const parsedDoctor = JSON.parse(storedDoctor)
        setDoctor(parsedDoctor)

        const consultationDetails = getConsultRequestById(params.id)
        if (!consultationDetails) {
          setError("Consultation not found")
        } else if (consultationDetails.assignedDoctorId && consultationDetails.assignedDoctorId !== parsedDoctor.id) {
          setError("This consultation is not assigned to you")
        } else {
          setConsultation(consultationDetails)
          setAttachments(consultationDetails.attachments || [])

          if (consultationDetails.doctorNotes) {
            try {
              const parsedNotes = JSON.parse(consultationDetails.doctorNotes)
              setDoctorNotes(Array.isArray(parsedNotes) ? parsedNotes : [])
            } catch (e) {
              setDoctorNotes([{
                text: consultationDetails.doctorNotes,
                timestamp: consultationDetails.updatedAt || consultationDetails.createdAt,
                doctorId: parsedDoctor.id,
                doctorName: `Dr. ${parsedDoctor.firstName} ${parsedDoctor.lastName}`,
              }])
            }
          }
        }
      } catch (error) {
        setError("Failed to load consultation details")
      } finally {
        setIsLoading(false)
      }
    }
  }, [params.id, router])

  const handleSaveNote = async (noteText: string) => {
    if (!consultation || !noteText.trim()) return false

    setIsSaving(true)
    try {
      const newNote: DoctorNote = {
        text: noteText,
        timestamp: new Date().toISOString(),
        doctorId: doctor.id,
        doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
      }
      const updatedNotes = [...doctorNotes, newNote]
      const updatedConsultation = updateConsultRequest(consultation.id, { doctorNotes: JSON.stringify(updatedNotes) })

      if (updatedConsultation) {
        setDoctorNotes(updatedNotes)
        setConsultation(updatedConsultation)
        toast({ title: "Note Added", description: "Your note has been saved successfully." })
        return true
      } else {
        throw new Error("Failed to save note")
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to save note. Please try again." })
      return false
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddNote = async () => {
    if (await handleSaveNote(currentNote)) {
      setCurrentNote("")
    }
  }

  const handleCompleteConsultation = async () => {
    if (!consultation || consultation.status === "completed") return

    setIsCompleting(true)
    try {
      if (currentNote.trim()) {
        await handleSaveNote(currentNote)
        setCurrentNote("")
      }
      const completedConsultation = markConsultRequestAsCompleted(consultation.id)
      if (completedConsultation) {
        setConsultation(completedConsultation)
        toast({ title: "Consultation Completed", description: "The consultation has been marked as completed." })
      } else {
        throw new Error("Failed to complete consultation")
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to complete consultation. Please try again." })
    } finally {
      setIsCompleting(false)
    }
  }

  const handleAction = async (type: string, details: any) => {
    let noteText = `[${type.toUpperCase()}]\n`
    Object.entries(details).forEach(([key, value]) => {
      noteText += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`
    })
    noteText += `Issued on: ${new Date().toLocaleDateString()}`
    if (await handleSaveNote(noteText)) {
      toast({ title: `${type} Issued`, description: `The ${type.toLowerCase()} has been added to the patient's notes.` })
    }
  }

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-AU")
  const formatTimestamp = (timestamp: string) => new Date(timestamp).toLocaleString("en-AU")
  const formatFileSize = (bytes: number) => (bytes / 1024 / 1024).toFixed(2) + " MB"
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <FileImage className="h-5 w-5" />
    if (fileType === "application/pdf") return <FilePdf className="h-5 w-5" />
    return <File className="h-5 w-5" />
  }

  const handleDownloadFile = (attachment: FileAttachment) => {
    try {
      const byteCharacters = atob(attachment.content)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: attachment.fileType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = attachment.fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      toast({ variant: "destructive", title: "Download Failed", description: "There was an error downloading the file." })
    }
  }

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="container mx-auto px-4 py-8"><Alert variant="destructive">{error}</Alert></div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <Link href="/doctor/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
          <h1 className="text-3xl font-bold tracking-tight">Consultation Details</h1>
        </div>
        {consultation.status === "pending" && (
          <Button onClick={handleCompleteConsultation} disabled={isCompleting}>
            <CheckCircle className="mr-2 h-4 w-4" />
            {isCompleting ? "Completing..." : "Mark as Completed"}
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>Patient Information</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Name:</strong> {consultation.patientName}</p>
              <p><strong>Email:</strong> {consultation.email}</p>
              <p><strong>Phone:</strong> {consultation.phone}</p>
              <p><strong>DOB:</strong> {consultation.details?.dob}</p>
              <p><strong>Medicare:</strong> {consultation.details?.medicareNumber || "N/A"}</p>
              <div className="pt-2">
                <p className="font-medium flex items-center"><MapPin className="h-4 w-4 mr-1" /> Address</p>
                <p>{consultation.details?.address}</p>
                <p>{consultation.details?.suburb}, {consultation.details?.state} {consultation.details?.postcode}</p>
              </div>
            </CardContent>
          </Card>
          {attachments.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Attachments</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {attachments.map((att) => (
                  <div key={att.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                    <div className="flex items-center gap-2">{getFileIcon(att.fileType)} {att.fileName}</div>
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadFile(att)}><Download className="h-4 w-4" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Dialog>
                <DialogTrigger asChild><Button variant="outline" className="justify-start"><FileText className="mr-2 h-4 w-4" /> Send Referral</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Send Referral</DialogTitle></DialogHeader>
                  <div className="space-y-2">
                    <Label>Specialist</Label><Input onChange={(e) => setReferralDetails({...referralDetails, specialist: e.target.value})} />
                    <Label>Reason</Label><Textarea onChange={(e) => setReferralDetails({...referralDetails, reason: e.target.value})} />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild><Button onClick={() => handleAction('Referral', referralDetails)}>Send</Button></DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild><Button variant="outline" className="justify-start"><Stethoscope className="mr-2 h-4 w-4" /> Issue Prescription</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Issue Prescription</DialogTitle></DialogHeader>
                  <div className="space-y-2">
                    <Label>Medication</Label><Input onChange={(e) => setPrescriptionDetails({...prescriptionDetails, medication: e.target.value})} />
                    <Label>Dosage</Label><Input onChange={(e) => setPrescriptionDetails({...prescriptionDetails, dosage: e.target.value})} />
                    <Label>Instructions</Label><Textarea onChange={(e) => setPrescriptionDetails({...prescriptionDetails, instructions: e.target.value})} />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild><Button onClick={() => handleAction('Prescription', prescriptionDetails)}>Issue</Button></DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild><Button variant="outline" className="justify-start"><ClipboardList className="mr-2 h-4 w-4" /> Issue Medical Certificate</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Issue Medical Certificate</DialogTitle></DialogHeader>
                  <div className="space-y-2">
                    <Label>Start Date</Label><Input type="date" onChange={(e) => setCertificateDetails({...certificateDetails, startDate: e.target.value})} />
                    <Label>End Date</Label><Input type="date" onChange={(e) => setCertificateDetails({...certificateDetails, endDate: e.target.value})} />
                    <Label>Reason</Label><Textarea onChange={(e) => setCertificateDetails({...certificateDetails, reason: e.target.value})} />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild><Button onClick={() => handleAction('Medical Certificate', certificateDetails)}>Issue</Button></DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Consultation Details</CardTitle></CardHeader>
            <CardContent>
              <h3 className="font-semibold">Reason for Consultation</h3>
              <p className="whitespace-pre-line bg-slate-50 p-3 rounded-md">{consultation.reason}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Doctor Notes</CardTitle><CardDescription>These notes are not visible to the patient.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Enter confidential notes..." value={currentNote} onChange={(e) => setCurrentNote(e.target.value)} />
              <div className="flex justify-end">
                <Button onClick={handleAddNote} disabled={isSaving || !currentNote.trim()}>
                  <Save className="mr-2 h-4 w-4" />{isSaving ? "Saving..." : "Add Note"}
                </Button>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Previous Notes</h4>
                {doctorNotes.length > 0 ? (
                  doctorNotes.map((note, index) => (
                    <div key={index} className="bg-white border p-3 rounded-md">
                      <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                        <span>{note.doctorName}</span>
                        <span>{formatTimestamp(note.timestamp)}</span>
                      </div>
                      <pre className="whitespace-pre-wrap text-sm font-sans">{note.text}</pre>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No notes yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
