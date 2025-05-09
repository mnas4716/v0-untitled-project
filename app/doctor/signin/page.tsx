"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Logo } from "@/components/logo"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"
import { authenticateDoctor } from "@/lib/database-service"

export default function DoctorSignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Authenticate doctor with email and password
      const doctor = authenticateDoctor(email, password)

      if (doctor) {
        // Store doctor info in localStorage
        localStorage.setItem(
          "doctorUser",
          JSON.stringify({
            id: doctor.id,
            email: doctor.email,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            specialty: doctor.specialty,
            role: "doctor",
          }),
        )

        // Redirect to doctor dashboard
        router.push("/doctor/dashboard")
      } else {
        setError("Invalid email or password or your account has been deactivated")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activePage="doctor-signin" />
      <main className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Logo className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Doctor Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the doctor portal</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/doctor/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500">
              <p>
                For demo purposes, use:
                <br />
                Email: <span className="font-mono">doc1@freedoc.com.au</span>
                <br />
                Password: <span className="font-mono">test123</span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-500">
              Not a doctor?{" "}
              <Link href="/auth/signin" className="text-blue-600 hover:underline">
                Patient Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
