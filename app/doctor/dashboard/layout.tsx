"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Settings } from "lucide-react"
import { Logo } from "@/components/logo"

export default function DoctorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Check authentication once on mount
  useEffect(() => {
    const checkAuth = () => {
      setMounted(true)
      if (typeof window !== "undefined") {
        const doctorUser = localStorage.getItem("doctorUser")
        if (!doctorUser) {
          router.push("/doctor/signin")
        }
      }
    }

    checkAuth()
  }, [router])

  // Don't render anything until we're mounted on the client
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Logo className="mx-auto h-12 w-12" />
          <p className="mt-4 text-lg">Loading doctor dashboard...</p>
        </div>
      </div>
    )
  }

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("doctorUser")
      router.push("/doctor/signin")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="grid gap-2 py-6">
              <div className="flex items-center gap-2 px-2">
                <Logo />
                <span className="text-lg font-semibold">Doctor Dashboard</span>
              </div>
              <div className="grid gap-2 px-2 py-2">
                <Button variant="ghost" className="justify-start" onClick={() => router.push("/doctor/dashboard")}>
                  Dashboard
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold hidden md:block">Doctor Dashboard</span>
        </div>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" onClick={() => router.push("/doctor/dashboard/settings")} className="mr-2">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </header>
      <main className="flex flex-1 flex-col overflow-auto p-4 md:p-6">{children}</main>
    </div>
  )
}
