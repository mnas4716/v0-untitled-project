"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Logo } from "@/components/logo"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      router.push(callbackUrl)
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
      setIsLoading(false)
    }
  }

  const handleDemoSignIn = async (demoEmail: string) => {
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: demoEmail,
        password: "demo",
      })

      if (result?.error) {
        setError("Demo login failed")
        setIsLoading(false)
        return
      }

      // Redirect based on role
      if (demoEmail === "admin@example.com") {
        router.push("/admin/dashboard")
      } else if (demoEmail === "doctor@example.com") {
        router.push("/doctor/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader activePage="signin" />
      <main className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-4">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Logo className="h-12 w-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>Enter your email to sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <p className="text-xs text-gray-500">For demo purposes, you can leave the password blank</p>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>

            {/* Demo shortcuts */}
            <div className="border-t pt-4 mt-2">
              <p className="text-center text-sm text-gray-500 mb-2">Demo Shortcuts:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoSignIn("user@example.com")}
                  disabled={isLoading}
                >
                  User Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoSignIn("doctor@example.com")}
                  disabled={isLoading}
                >
                  Doctor Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoSignIn("admin@example.com")}
                  disabled={isLoading}
                >
                  Admin Dashboard
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
