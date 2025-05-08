"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, Shield, LogOut, Upload } from "lucide-react"

// Import the DashboardHeader component
import { DashboardHeader } from "@/components/dashboard-header"

// Replace the existing header with the DashboardHeader component
export default function AccountSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [accountData, setAccountData] = useState({
    email: "john.doe@example.com",
    language: "english",
    timezone: "australia-sydney",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setAccountData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activePage="settings" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="p-6 border-b border-gray-100 flex flex-col items-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">John Doe</h3>
                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                  </div>
                  <nav className="p-2">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 p-3 rounded-md bg-blue-50 text-blue-600"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Account Settings</span>
                    </Link>
                    <Link
                      href="/dashboard/security"
                      className="flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Shield className="h-5 w-5" />
                      <span>Security</span>
                    </Link>
                    <div className="border-t border-gray-100 my-2"></div>
                    <button className="w-full flex items-center gap-3 p-3 rounded-md text-red-600 hover:bg-red-50 transition-colors">
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
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Update your profile photo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" /> Upload New Photo
                      </Button>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                      >
                        Remove Photo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account settings</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={accountData.email}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={accountData.language}
                        onValueChange={(value) => handleSelectChange("language", value)}
                      >
                        <SelectTrigger
                          id="language"
                          className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="chinese">Chinese</SelectItem>
                          <SelectItem value="arabic">Arabic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={accountData.timezone}
                        onValueChange={(value) => handleSelectChange("timezone", value)}
                      >
                        <SelectTrigger
                          id="timezone"
                          className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="australia-sydney">Australia/Sydney (AEST/AEDT)</SelectItem>
                          <SelectItem value="australia-melbourne">Australia/Melbourne (AEST/AEDT)</SelectItem>
                          <SelectItem value="australia-brisbane">Australia/Brisbane (AEST)</SelectItem>
                          <SelectItem value="australia-perth">Australia/Perth (AWST)</SelectItem>
                          <SelectItem value="australia-adelaide">Australia/Adelaide (ACST/ACDT)</SelectItem>
                        </SelectContent>
                      </Select>
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

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Linked Accounts</CardTitle>
                  <CardDescription>Connect your account with other services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#4285F4] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">G</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Google</h3>
                          <p className="text-sm text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">f</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Facebook</h3>
                          <p className="text-sm text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">X</span>
                        </div>
                        <div>
                          <h3 className="font-medium">X (Twitter)</h3>
                          <p className="text-sm text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm border-red-100">
                <CardHeader className="text-red-600">
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription className="text-red-500">Irreversible account actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h3 className="font-medium text-red-600 mb-2">Delete Account</h3>
                      <p className="text-sm text-red-500 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="outline" className="text-red-600 hover:bg-red-100 border-red-200">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
