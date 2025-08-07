"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Filter, Search, Plus, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock appointment data
const appointments = [
  {
    id: "1",
    patientName: "James Smith",
    patientId: "P1001",
    type: "Telehealth",
    date: "2023-05-15T09:30:00",
    status: "scheduled",
    doctor: "Dr. Johnson",
    reason: "Follow-up consultation",
    duration: 30,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    patientName: "Sarah Williams",
    patientId: "P1002",
    type: "In-person",
    date: "2023-05-15T11:00:00",
    status: "completed",
    doctor: "Dr. Miller",
    reason: "Annual checkup",
    duration: 45,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    patientName: "Michael Brown",
    patientId: "P1003",
    type: "Telehealth",
    date: "2023-05-15T14:15:00",
    status: "scheduled",
    doctor: "Dr. Johnson",
    reason: "Prescription renewal",
    duration: 15,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    patientName: "Emily Davis",
    patientId: "P1004",
    type: "In-person",
    date: "2023-05-16T10:00:00",
    status: "scheduled",
    doctor: "Dr. Wilson",
    reason: "New patient consultation",
    duration: 60,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    patientName: "Robert Jones",
    patientId: "P1005",
    type: "Telehealth",
    date: "2023-05-16T13:30:00",
    status: "cancelled",
    doctor: "Dr. Miller",
    reason: "Skin condition",
    duration: 30,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "6",
    patientName: "Jennifer Garcia",
    patientId: "P1006",
    type: "In-person",
    date: "2023-05-17T09:00:00",
    status: "scheduled",
    doctor: "Dr. Wilson",
    reason: "Blood test results",
    duration: 30,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "7",
    patientName: "David Martinez",
    patientId: "P1007",
    type: "Telehealth",
    date: "2023-05-17T11:30:00",
    status: "scheduled",
    doctor: "Dr. Johnson",
    reason: "Mental health check-in",
    duration: 45,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter appointments based on search term and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    // Filter by selected date
    const appointmentDate = new Date(appointment.date)
    const matchesDate = date
      ? appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      : true

    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#00473e]">Appointments</h1>
          <p className="text-[#007d73]">Manage and schedule patient appointments</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00473e] hover:bg-[#00695f]">
              <Plus className="mr-2 h-4 w-4" /> Add Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Appointment</DialogTitle>
              <DialogDescription>Enter the details for the new appointment.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="patient" className="text-right">
                  Patient
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="james">James Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                    <SelectItem value="emily">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor" className="text-right">
                  Doctor
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="miller">Dr. Miller</SelectItem>
                    <SelectItem value="wilson">Dr. Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="col-span-3 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="9:30">9:30 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="10:30">10:30 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="11:30">11:30 AM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="13:30">1:30 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="14:30">2:30 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="15:30">3:30 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telehealth">Telehealth</SelectItem>
                    <SelectItem value="in-person">In-person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#00473e] hover:bg-[#00695f]" onClick={() => setIsAddDialogOpen(false)}>
                Save Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold text-[#00473e]">Appointment List</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search appointments..."
                      className="pl-9 w-full md:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No appointments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage
                                  src={appointment.avatar || "/placeholder.svg"}
                                  alt={appointment.patientName}
                                />
                                <AvatarFallback>{appointment.patientName[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{appointment.patientName}</div>
                                <div className="text-xs text-gray-500">{appointment.patientId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{format(new Date(appointment.date), "MMM d, yyyy")}</div>
                            <div className="text-xs text-gray-500">{format(new Date(appointment.date), "h:mm a")}</div>
                          </TableCell>
                          <TableCell>{appointment.type}</TableCell>
                          <TableCell>{appointment.doctor}</TableCell>
                          <TableCell>
                            {appointment.status === "scheduled" && (
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>
                            )}
                            {appointment.status === "completed" && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                            )}
                            {appointment.status === "cancelled" && (
                              <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {appointment.status === "scheduled" && (
                                  <>
                                    <DropdownMenuItem>
                                      <CheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      <XCircle className="mr-2 h-4 w-4" /> Cancel Appointment
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {appointment.status === "completed" && (
                                  <DropdownMenuItem>Send Follow-up</DropdownMenuItem>
                                )}
                                {appointment.status === "cancelled" && <DropdownMenuItem>Reschedule</DropdownMenuItem>}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-[#00473e] mb-4">Calendar</h2>
              <div className="mb-4">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>

              <h3 className="font-medium text-[#00473e] mb-2">Today's Schedule</h3>
              <div className="space-y-3">
                {appointments
                  .filter((a) => {
                    const today = new Date()
                    const appointmentDate = new Date(a.date)
                    return (
                      appointmentDate.getDate() === today.getDate() &&
                      appointmentDate.getMonth() === today.getMonth() &&
                      appointmentDate.getFullYear() === today.getFullYear()
                    )
                  })
                  .map((appointment) => (
                    <div key={appointment.id} className="flex items-start p-3 rounded-md bg-gray-50">
                      <div className="mr-3 p-2 rounded-full bg-[#e6f2f0]">
                        <Clock className="h-4 w-4 text-[#00473e]" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(appointment.date), "h:mm a")} · {appointment.duration} min
                        </p>
                        <p className="text-xs text-gray-500">{appointment.type}</p>
                      </div>
                    </div>
                  ))}
                {appointments.filter((a) => {
                  const today = new Date()
                  const appointmentDate = new Date(a.date)
                  return (
                    appointmentDate.getDate() === today.getDate() &&
                    appointmentDate.getMonth() === today.getMonth() &&
                    appointmentDate.getFullYear() === today.getFullYear()
                  )
                }).length === 0 && <p className="text-sm text-gray-500 py-2">No appointments scheduled for today</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
