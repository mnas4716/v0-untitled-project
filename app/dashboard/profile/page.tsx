"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Shield, LogOut } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { updateUserProfile } from "@/app/actions"
import { getConsultRequestsByEmail, getUserByEmail, updateUser } from "@/lib/database-service"

export default function ProfilePage() {
  // Update the profileData state to include Medicare Number
  const [profileData, setProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    medicareNumber: "", // Added Medicare Number
    address: "",
    suburb: "",
    state: "",
    postcode: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Update the useEffect to load Medicare Number
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const userJson = localStorage.getItem("user")
      if (userJson) {
        try {
          const user = JSON.parse(userJson)

          // Set initial profile data from user object
          setProfileData((prev) => ({
            ...prev,
            id: user.id || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            dob: user.dob || "",
            medicareNumber: user.medicareNumber || "", // Added Medicare Number
            address: user.address || "",
            suburb: user.suburb || "",
            state: user.state || "",
            postcode: user.postcode || "",
          }))

          // If we have an email but missing other data, try to get it from consultation requests
          if (user.email && (!user.firstName || !user.phone || !user.dob || !user.medicareNumber || !user.address)) {
            const consultRequests = getConsultRequestsByEmail(user.email)
            if (consultRequests && consultRequests.length > 0) {
              // Get the most recent request
              const latestRequest = consultRequests.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
              )[0]

              // Update profile data with information from the consultation request
              const updatedProfileData = {
                ...profileData,
                firstName:
                  user.firstName || latestRequest.details?.firstName || latestRequest.patientName?.split(" ")[0] || "",
                lastName:
                  user.lastName || latestRequest.details?.lastName || latestRequest.patientName?.split(" ")[1] || "",
                phone: user.phone || latestRequest.details?.phone || latestRequest.phone || "",
                dob: user.dob || latestRequest.details?.dob || "",
                medicareNumber: user.medicareNumber || latestRequest.details?.medicareNumber || "", // Added Medicare Number
                address: user.address || latestRequest.details?.address || "", // Added Address
              }

              setProfileData(updatedProfileData)

              // Update localStorage and database with complete user data
              const updatedUser = {
                ...user,
                firstName: updatedProfileData.firstName,
                lastName: updatedProfileData.lastName,
                phone: updatedProfileData.phone,
                dob: updatedProfileData.dob,
                medicareNumber: updatedProfileData.medicareNumber, // Added Medicare Number
                address: updatedProfileData.address, // Added Address
              }

              localStorage.setItem("user", JSON.stringify(updatedUser))

              // Update user in database if it exists
              if (user.id) {
                const dbUser = getUserByEmail(user.email)
                if (dbUser) {
                  updateUser(dbUser.id, {
                    firstName: updatedProfileData.firstName,
                    lastName: updatedProfileData.lastName,
                    phone: updatedProfileData.phone,
                    dob: updatedProfileData.dob,
                    medicareNumber: updatedProfileData.medicareNumber, // Added Medicare Number
                    address: updatedProfileData.address, // Added Address
                  })
                }
              }
            }
          }
        } catch (e) {
          console.error("Error parsing user from localStorage:", e)
        }
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage("")
    setErrorMessage("")

    try {
      const result = await updateUserProfile(profileData.id, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
        dob: profileData.dob,
        address: profileData.address,
        suburb: profileData.suburb,
        state: profileData.state,
        postcode: profileData.postcode,
      })

      if (result.success) {
        setSuccessMessage("Profile updated successfully")

        // Update local storage with the updated user data
        if (typeof window !== "undefined") {
          const userJson = localStorage.getItem("user")
          if (userJson) {
            const user = JSON.parse(userJson)
            const updatedUser = {
              ...user,
              ...profileData,
            }
            localStorage.setItem("user", JSON.stringify(updatedUser))
          }
        }
      } else {
        setErrorMessage(result.message || "Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ""

    // If it's already in YYYY-MM-DD format, return as is for the input field
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString
    }

    // Try to parse the date and format it
    try {
      const date = new Date(dateString)
      return date.toISOString().split("T")[0] // Returns YYYY-MM-DD
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activePage="profile" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="p-6 border-b border-gray-100 flex flex-col items-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt={profileData.firstName} />
                      <AvatarFallback>
                        {profileData.firstName ? profileData.firstName.charAt(0) : ""}
                        {profileData.lastName ? profileData.lastName.charAt(0) : ""}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">
                      {profileData.firstName || profileData.lastName
                        ? `${profileData.firstName} ${profileData.lastName}`
                        : "Complete Your Profile"}
                    </h3>
                    <p className="text-sm text-gray-500">{profileData.email}</p>
                  </div>
                  <nav className="p-2">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 p-3 rounded-md bg-blue-50 text-blue-600"
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/security"
                      className="flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Shield className="h-5 w-5" />
                      <span>Security</span>
                    </Link>
                    <div className="border-t border-gray-100 my-2"></div>
                    <button
                      className="w-full flex items-center gap-3 p-3 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          localStorage.removeItem("user")
                          window.location.href = "/"
                        }
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </nav>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Profile Information</h1>

            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                {errorMessage}
              </div>
            )}

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="medical">Medical History</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          readOnly
                          disabled
                          className="border-gray-300 bg-gray-50"
                        />
                        <p className="text-xs text-gray-500">Email address cannot be changed</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          value={formatDate(profileData.dob)}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={profileData.address}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="suburb">Suburb</Label>
                          <Input
                            id="suburb"
                            name="suburb"
                            value={profileData.suburb}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            value={profileData.state}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postcode">Postcode</Label>
                          <Input
                            id="postcode"
                            name="postcode"
                            value={profileData.postcode}
                            onChange={handleChange}
                            className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medicareNumber">Medicare Number</Label>
                        <Input
                          id="medicareNumber"
                          name="medicareNumber"
                          value={profileData.medicareNumber}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          placeholder="Enter your Medicare number"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 transition-colors"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="medical">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>Manage your medical information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Your medical information helps our doctors provide better care. This information is confidential
                      and only shared with healthcare providers involved in your care.
                    </p>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Allergies</h3>
                        <p className="text-sm text-gray-500 mb-2">Add any allergies you have</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Penicillin</span>
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Peanuts</span>
                          <Button variant="outline" size="sm" className="rounded-full">
                            + Add Allergy
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Current Medications</h3>
                        <p className="text-sm text-gray-500 mb-2">List medications you're currently taking</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            Lisinopril 10mg
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Vitamin D</span>
                          <Button variant="outline" size="sm" className="rounded-full">
                            + Add Medication
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Medical Conditions</h3>
                        <p className="text-sm text-gray-500 mb-2">Add any ongoing medical conditions</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                            Hypertension
                          </span>
                          <Button variant="outline" size="sm" className="rounded-full">
                            + Add Condition
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">Save Medical History</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">Communication Preferences</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Email Notifications</p>
                              <p className="text-sm text-gray-500">Receive updates about your appointments</p>
                            </div>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                              <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">SMS Notifications</p>
                              <p className="text-sm text-gray-500">Receive text reminders for appointments</p>
                            </div>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                              <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Marketing Communications</p>
                              <p className="text-sm text-gray-500">Receive updates about new services and features</p>
                            </div>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                              <span className="absolute h-4 w-4 rounded-full bg-white translate-x-1"></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">Preferred Contact Method</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="contact-email"
                              name="contact-method"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              defaultChecked
                            />
                            <label htmlFor="contact-email" className="ml-2 block text-sm text-gray-700">
                              Email
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="contact-sms"
                              name="contact-method"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="contact-sms" className="ml-2 block text-sm text-gray-700">
                              SMS
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="contact-phone"
                              name="contact-method"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="contact-phone" className="ml-2 block text-sm text-gray-700">
                              Phone Call
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
