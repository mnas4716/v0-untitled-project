"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllConsultations, markConsultationAsCompleted } from "@/lib/consultation-service"

interface Consultation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  reason: string
  completed: boolean
  createdAt: string
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchConsultations = () => {
      const allConsultations = getAllConsultations()
      setConsultations(allConsultations)
    }

    fetchConsultations()
    // Set up an interval to check for new consultations every 30 seconds
    const intervalId = setInterval(fetchConsultations, 30000)

    return () => clearInterval(intervalId)
  }, [])

  const handleMarkAsCompleted = (id: string) => {
    markConsultationAsCompleted(id)
    setConsultations(getAllConsultations())
  }

  const activeConsultations = consultations.filter((c) => !c.completed)
  const completedConsultations = consultations.filter((c) => c.completed)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Consultation Requests</h2>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Requests ({consultations.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeConsultations.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedConsultations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {consultations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No consultation requests found.</p>
              </CardContent>
            </Card>
          ) : (
            consultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onMarkAsCompleted={handleMarkAsCompleted}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeConsultations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No active consultation requests.</p>
              </CardContent>
            </Card>
          ) : (
            activeConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onMarkAsCompleted={handleMarkAsCompleted}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedConsultations.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No completed consultation requests.</p>
              </CardContent>
            </Card>
          ) : (
            completedConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation.id}
                consultation={consultation}
                onMarkAsCompleted={handleMarkAsCompleted}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ConsultationCard({
  consultation,
  onMarkAsCompleted,
}: {
  consultation: Consultation
  onMarkAsCompleted: (id: string) => void
}) {
  const formattedDate = new Date(consultation.createdAt).toLocaleString()

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{consultation.name}</CardTitle>
            <CardDescription>
              {consultation.email} • {consultation.phone}
            </CardDescription>
          </div>
          <Badge variant={consultation.completed ? "outline" : "default"}>
            {consultation.completed ? "Completed" : "Active"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Requested Date</p>
              <p className="text-sm text-muted-foreground">{consultation.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Requested Time</p>
              <p className="text-sm text-muted-foreground">{consultation.time}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Reason for Consultation</p>
            <p className="text-sm text-muted-foreground">{consultation.reason}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Submitted</p>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>

          {!consultation.completed && (
            <Button className="mt-2" onClick={() => onMarkAsCompleted(consultation.id)}>
              Mark as Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
