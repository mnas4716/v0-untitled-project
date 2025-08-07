"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ArrowLeft, LogOut, Menu } from "lucide-react"

interface DashboardHeaderProps {
  className?: string
  activePage?: string
}

export function DashboardHeader({ className, activePage }: DashboardHeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = () => {
    setIsSigningOut(true)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      router.push("/")
    }
  }

  return (
    <div className={cn("border-b bg-white", className)}>
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader className="pl-6 pb-6 pt-4">
              <SheetTitle>Dashboard</SheetTitle>
              <SheetDescription>Manage your healthcare needs</SheetDescription>
            </SheetHeader>
            {/* Mobile navigation items */}
            <div className="grid gap-2 pl-6">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard">Overview</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/appointments">Appointments</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/prescriptions">Prescriptions</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/certificates">Certificates</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <Link href="/" className="hidden md:flex">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="flex items-center justify-center flex-1">
          <h1 className="text-xl font-semibold text-center">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
