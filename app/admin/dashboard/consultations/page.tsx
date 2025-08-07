"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllConsultRequests, getDoctorById } from "@/lib/database-service"
import { Eye, Search, FileText } from 'lucide-react'

export default function ConsultationsPage() {
  const router = useRouter()
  const [consultations, setConsultations] = useState<any[]>([])
  const [filteredConsultations, setFilteredConsultations] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadConsultations = async () => {
      setIsLoading(true)
      try {
        const allConsultations = getAllConsultRequests()
        const processedConsultations = allConsultations.map((consult) => {
          let doctorName = "Not Assigned"
          if (consult.assignedDoctorId) {
            const doctor = getDoctorById(consult.assignedDoctorId)
            if (doctor) {
              doctorName = `Dr. ${doctor.firstName} ${doctor.lastName}`
            }
          }
          return { ...consult, doctorName }
        })
        setConsultations(processedConsultations)
        setFilteredConsultations(processedConsultations)
      } catch (error) {
        console.error("Error loading consultations:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadConsultations()
  }, [])

  useEffect(() => {
    let filtered = consultations
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (consult) =>
          consult.patientName.toLowerCase().includes(term) ||
          consult.email.toLowerCase().includes(term) ||
          consult.reason.toLowerCase().includes(term) ||
          consult.doctorName.toLowerCase().includes(term),
      )
    }
    if (activeTab !== "all") {
      filtered = filtered.filter((consult) => consult.status === activeTab)
    }
    setFilteredConsultations(filtered)
  }, [searchTerm, activeTab, consultations])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "completed": return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
      case "cancelled": return <Badge variant="destructive">Cancelled</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (isLoading) return <p>Loading consultations...</p>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Consultations</h2>
        <p className="text-muted-foreground">Manage patient consultations and requests</p>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, reason, or doctor..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-4">
            {filteredConsultations.length === 0 ? (
              <Card>
                <CardContent className="text-center py-10 text-muted-foreground">No consultations found.</CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredConsultations.map((consult) => (
                  <Card key={consult.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{consult.patientName}</CardTitle>
                          <CardDescription>{consult.email}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{consult.type.replace("-", " ")}</Badge>
                          {getStatusBadge(consult.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2"><strong>Reason:</strong> {consult.reason}</p>
                      <div className="text-sm text-muted-foreground mt-2">
                        <strong>Assigned to:</strong> {consult.doctorName}
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/dashboard/consult/${consult.id}`)}>
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
