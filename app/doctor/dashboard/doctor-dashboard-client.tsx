"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Activity } from "lucide-react"
import Link from "next/link"

export default function DoctorDashboardClient({ user, requests }) {
  // Group requests by type
  const consultations = requests.filter((req) => req.type === "consultation")
  const prescriptions = requests.filter((req) => req.type === "prescription")
  const certificates = requests.filter((req) => req.type === "medical-certificate")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
        <p className="text-slate-500">Welcome back, {user?.name || user?.email}! Manage your consultations here.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultations</CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultations.length}</div>
            <p className="text-xs text-slate-500">
              {consultations.length === 0
                ? "No consultations"
                : `${consultations.filter((c) => c.status === "pending").length} pending`}
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/doctor/consult">View Consultations</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prescriptions.length}</div>
            <p className="text-xs text-slate-500">
              {prescriptions.length === 0
                ? "No prescriptions"
                : `${prescriptions.filter((p) => p.status === "pending").length} pending`}
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/prescription">View Prescriptions</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Certificates</CardTitle>
            <Activity className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
            <p className="text-xs text-slate-500">
              {certificates.length === 0
                ? "No certificates"
                : `${certificates.filter((c) => c.status === "pending").length} pending`}
            </p>
            <Button asChild className="mt-4 w-full">
              <Link href="/medical-certificate">View Certificates</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
