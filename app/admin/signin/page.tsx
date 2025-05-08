"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Logo } from "@/components/logo"

export default function AdminSignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("moe@freedoc.com.au")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Check if already logged in
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const adminUser = localStorage.getItem("adminUser")
      if (adminUser) {
        router.push("/admin/dashboard")
      }
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // For demo purposes, we're using a simple email/password check
      // In a real application, you would verify against a server
      if (email === "moe@freedoc.com.au" && password === "admin123") {
        // Store admin user in localStorage
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            id: "admin-1",
            email: "moe@freedoc.com.au",
            firstName: "Moe",
            lastName: "Nasr",
            isAdmin: true,
          }),
        )

        // Also set isAdmin flag for compatibility
        localStorage.setItem("isAdmin", "true")

        // Redirect to admin dashboard
        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (error) {
      console.error("Error signing in:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f9f8] flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-[#00473e] hover:text-[#00695f] mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <Logo className="h-10 w-10 text-[#00473e]" />
            </div>
            <h1 className="text-2xl font-bold mt-6 mb-2 text-[#00473e]">Admin Sign In</h1>
            <p className="text-slate-600">Sign in to access the admin dashboard</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">{error}</div>
              )}

              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="pl-10 border-slate-300 focus:border-[#00695f] focus:ring focus:ring-[#00695f] focus:ring-opacity-50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="pl-10 border-slate-300 focus:border-[#00695f] focus:ring focus:ring-[#00695f] focus:ring-opacity-50 transition-colors"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#00473e] hover:bg-[#00695f] transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Admin credentials: <span className="font-medium">moe@freedoc.com.au</span> /{" "}
                  <span className="font-medium">admin123</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
