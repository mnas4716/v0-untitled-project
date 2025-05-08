"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, FileText, Activity } from "lucide-react"
import Link from "next/link"

export default function DashboardClient({ user, requests }) {
  // Group requests by type
  const consultations = requests.filter((req) => req.type === "consultation")
  const prescriptions = requests.filter((req) => req.type === "prescription")
  const certificates = requests.filter((req) => req.type === "medical-certificate")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-500">
            Welcome back, {user?.name || user?.email}! Manage your healthcare needs here.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/consult">Book Consultation</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/profile">View Profile</Link>
          </Button>
        </div>
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
              <Link href="/consult">Book Consultation</Link>
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
              <Link href="/prescription">Request Prescription</Link>
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
              <Link href="/medical-certificate">Request Certificate</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/consult">
                <Clock className="mr-2 h-4 w-4" />
                Book a Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/prescription">
                <FileText className="mr-2 h-4 w-4" />
                Request Prescription
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/medical-certificate">
                <Activity className="mr-2 h-4 w-4" />
                Request Medical Certificate
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Requests</CardTitle>
            <CardDescription>Recent healthcare requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {requests.length === 0 ? (
              <p className="text-sm text-slate-500">No requests found.</p>
            ) : (
              <div className="space-y-4">
                {requests.slice(0, 3).map((request) => (
                  <div key={request.id} className="border rounded-md p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">
                        {request.type.charAt(0).toUpperCase() + request.type.slice(1).replace("-", " ")}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{request.reason}</p>
                    <div className="text-sm text-slate-500 mt-2">
                      {request.date} at {request.time}
                    </div>
                  </div>
                ))}
                {requests.length > 3 && (
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard/requests">View All Requests</Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
