import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Video, Phone, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Import the DashboardHeader component
import { DashboardHeader } from "@/components/dashboard-header"

export default function AppointmentsPage() {
  // Sample appointments data - in a real app, this would come from a database
  const appointments = [
    {
      id: "apt-001",
      type: "Telehealth Consultation",
      date: "2023-05-15",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      status: "upcoming",
      method: "video",
    },
    {
      id: "apt-002",
      type: "Medical Certificate",
      date: "2023-05-10",
      time: "2:30 PM",
      doctor: "Dr. Michael Chen",
      status: "completed",
      method: "phone",
    },
    {
      id: "apt-003",
      type: "Prescription Renewal",
      date: "2023-05-05",
      time: "11:15 AM",
      doctor: "Dr. Emily Wilson",
      status: "completed",
      method: "chat",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activePage="appointments" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Appointments</h1>
          <Link href="/consult">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Calendar className="h-4 w-4 mr-2" /> Book New Appointment
            </Button>
          </Link>
        </div>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div
                    className={`w-full md:w-2 ${appointment.status === "upcoming" ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{appointment.type}</h3>
                          <Badge
                            variant={appointment.status === "upcoming" ? "default" : "secondary"}
                            className={appointment.status === "upcoming" ? "bg-green-500" : ""}
                          >
                            {appointment.status === "upcoming" ? "Upcoming" : "Completed"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center">
                            {appointment.method === "video" && <Video className="h-4 w-4 mr-1" />}
                            {appointment.method === "phone" && <Phone className="h-4 w-4 mr-1" />}
                            {appointment.method === "chat" && <MessageSquare className="h-4 w-4 mr-1" />}
                            <span>
                              {appointment.method === "video"
                                ? "Video Call"
                                : appointment.method === "phone"
                                  ? "Phone Call"
                                  : "Chat"}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700">Doctor: {appointment.doctor}</p>
                      </div>
                      <div className="mt-4 md:mt-0 flex gap-2">
                        {appointment.status === "upcoming" && (
                          <>
                            <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
                              Reschedule
                            </Button>
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                              Join Now
                            </Button>
                          </>
                        )}
                        {appointment.status === "completed" && (
                          <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
                            View Summary
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No appointments yet</h3>
              <p className="text-gray-500 mb-6">You don't have any appointments scheduled.</p>
              <Link href="/consult">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Book Your First Appointment</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
