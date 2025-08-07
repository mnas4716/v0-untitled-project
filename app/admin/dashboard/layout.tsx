"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LayoutDashboard, Users, MessageSquare, Stethoscope } from "lucide-react"
import { Logo } from "@/components/logo"

// Define the navigation links outside the component to prevent re-creation on each render
const dashboardNav = [
  {
    title: "Overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/admin/dashboard",
  },
  {
    title: "Consultations",
    icon: <MessageSquare className="h-4 w-4" />,
    href: "/admin/dashboard/consultations",
  },
  {
    title: "Patients",
    icon: <Users className="h-4 w-4" />,
    href: "/admin/dashboard/patients",
  },
  {
    title: "Practitioners",
    icon: <Stethoscope className="h-4 w-4" />,
    href: "/admin/dashboard/practitioners",
  },
]

function NavLinks() {
  const pathname = usePathname()

  return (
    <div className="grid gap-1">
      {dashboardNav.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === link.href ? "bg-accent" : "transparent",
          )}
        >
          {link.icon}
          {link.title}
        </Link>
      ))}
    </div>
  )
}

export default function DashboardLayout({
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
        const adminUser = localStorage.getItem("adminUser")
        if (!adminUser) {
          router.push("/admin/signin")
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
          <p className="mt-4 text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminUser")
      router.push("/admin/signin")
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
                <span className="text-lg font-semibold">Admin Dashboard</span>
              </div>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="grid gap-2 px-2 py-2">
                  <NavLinks />
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold hidden md:block">Admin Dashboard</span>
        </div>
        <div className="flex-1" />
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <ScrollArea className="h-full">
            <div className="grid gap-2 p-4 text-sm">
              <NavLinks />
            </div>
          </ScrollArea>
        </aside>
        <main className="flex flex-1 flex-col overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
