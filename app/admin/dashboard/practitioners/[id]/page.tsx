"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Mail, UserCheck, UserX, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getDoctorById, getConsultRequestsByDoctorId, toggleDoctorActive } from "@/lib/database-service"

export default function PractitionerDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [practitioner, setPractitioner] = useState<any>(null)
  const [consultations, setConsultations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPractitioner = () => {
      setIsLoading(true)
      try {
        const doctor = getDoctorById(params.id)
        if (!doctor) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Practitioner not found",
          })
          router.push("/admin/dashboard/practitioners")
          return
        }

        setPractitioner(doctor)

        // Load practitioner's consultations
        const doctorConsultations = getConsultRequestsByDoctorId(params.id)
        setConsultations(doctorConsultations)
      } catch (error) {
        console.error("Error loading practitioner:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load practitioner details",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPractitioner()
  }, [params.id, router, toast])

  const handleToggleStatus = () => {
    try {
      const updatedPractitioner = toggleDoctorActive(params.id)

      if (updatedPractitioner) {
        setPractitioner(updatedPractitioner)

        toast({
          title: updatedPractitioner.isActive ? "Practitioner Activated" : "Practitioner Deactivated",
          description: `${updatedPractitioner.firstName} ${updatedPractitioner.lastName} has been ${
            updatedPractitioner.isActive ? "activated" : "deactivated"
          }.`,
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
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00473e]"></div>
      </div>
    )
  }

  if (!practitioner) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <h2 className="text-2xl font-bold mb-4">Practitioner Not Found</h2>
        <Button onClick={() => router.push("/admin/dashboard/practitioners")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Practitioners
        </Button>
      </div>
    )
  }

  // Group consultations by status
  const pendingConsultations = consultations.filter((c) => c.status === "pending")
  const completedConsultations = consultations.filter((c) => c.status === "completed")
  const cancelledConsultations = consultations.filter((c) => c.status === "cancelled")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/admin/dashboard/practitioners")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Practitioners
        </Button>
        <Button
          variant={practitioner.isActive ? "destructive" : "outline"}
          onClick={handleToggleStatus}
          className={!practitioner.isActive ? "text-green-600 border-green-200" : ""}
        >
          {practitioner.isActive ? (
            <>
              <UserX className="mr-2 h-4 w-4" /> Deactivate Practitioner
            </>
          ) : (
            <>
              <UserCheck className="mr-2 h-4 w-4" /> Activate Practitioner
            </>
          )}
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Practitioner Profile</CardTitle>
              <CardDescription>View and manage practitioner details</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src={practitioner.avatar || "/placeholder.svg"}
                  alt={`${practitioner.firstName} ${practitioner.lastName}`}
                />
                <AvatarFallback className="text-2xl">
                  {practitioner.firstName[0]}
                  {practitioner.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">
                {practitioner.firstName} {practitioner.lastName}, {practitioner.title || "MD"}
              </h3>
              <p className="text-[#00473e] font-medium">{practitioner.specialty}</p>

              {practitioner.isActive ? (
                <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">Active</Badge>
              ) : (
                <Badge className="mt-2 bg-red-100 text-red-800 border-red-200">Inactive</Badge>
              )}

              <div className="w-full mt-6 space-y-4">
                <div className="text-left">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{practitioner.email}</p>
                </div>

                <div className="text-left">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{practitioner.phone || "Not provided"}</p>
                </div>

                <div className="text-left">
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="font-medium">{formatDate(practitioner.createdAt)}</p>
                </div>

                <div className="text-left">
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="font-medium">
                    {practitioner.lastLogin ? formatDate(practitioner.lastLogin) : "Never logged in"}
                  </p>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" /> Schedule
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" /> Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Consultations</CardTitle>
              <CardDescription>View all consultations assigned to this practitioner</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All ({consultations.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({pendingConsultations.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedConsultations.length})</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled ({cancelledConsultations.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {consultations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No consultations assigned to this practitioner</div>
                  ) : (
                    consultations.map((consultation) => (
                      <ConsultationCard key={consultation.id} consultation={consultation} formatDate={formatDate} />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  {pendingConsultations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No pending consultations</div>
                  ) : (
                    pendingConsultations.map((consultation) => (
                      <ConsultationCard key={consultation.id} consultation={consultation} formatDate={formatDate} />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {completedConsultations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No completed consultations</div>
                  ) : (
                    completedConsultations.map((consultation) => (
                      <ConsultationCard key={consultation.id} consultation={consultation} formatDate={formatDate} />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="cancelled" className="space-y-4">
                  {cancelledConsultations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No cancelled consultations</div>
                  ) : (
                    cancelledConsultations.map((consultation) => (
                      <ConsultationCard key={consultation.id} consultation={consultation} formatDate={formatDate} />
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ConsultationCard({ consultation, formatDate }: { consultation: any; formatDate: (date: string) => string }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-2">
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
            <Badge
              className={
                consultation.status === "pending"
                  ? "bg-amber-100 text-amber-800"
                  : consultation.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
              }
            >
              {consultation.status}
            </Badge>
          </div>
          <p className="mt-2 font-medium">{consultation.patientName}</p>
          <p className="text-sm text-slate-600">{consultation.email}</p>
          <p className="text-sm text-slate-600">{consultation.phone}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {consultation.status === "completed"
              ? `Completed: ${formatDate(consultation.completedAt || consultation.createdAt)}`
              : consultation.status === "cancelled"
                ? `Cancelled: ${formatDate(consultation.cancelledAt || consultation.createdAt)}`
                : `Requested: ${formatDate(consultation.createdAt)}`}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Date: {consultation.date} at {consultation.time}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium">Reason:</p>
        <p className="text-sm text-slate-600">{consultation.reason}</p>
      </div>
      {consultation.doctorNotes && (
        <div className="mt-2 p-2 bg-blue-50 rounded-md">
          <p className="text-sm font-medium text-blue-800">Doctor Notes:</p>
          <p className="text-sm text-blue-700">{consultation.doctorNotes}</p>
        </div>
      )}
    </div>
  )
}
