"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Logo } from "@/components/logo"
import { UserNav } from "@/components/user-nav"
import { isAdmin } from "@/lib/client-auth"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: React.ReactNode
    variant: "default" | "ghost"
    href: string
  }[]
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if user is admin
    if (typeof window !== "undefined") {
      const adminStatus = isAdmin()
      if (!adminStatus) {
        window.location.href = "/admin/signin"
      }
    }
  }, [])

  // Don't render anything until we're mounted on the client
  if (!mounted) return null

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
                  <NavLinks links={dashboardNav} />
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
        <UserNav isAdmin={true} />
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <ScrollArea className="h-full">
            <div className="grid gap-2 p-4 text-sm">
              <NavLinks links={dashboardNav} />
            </div>
          </ScrollArea>
        </aside>
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}

function NavLinks({ links }: { links: NavProps["links"] }) {
  const pathname = usePathname()

  return (
    <div className="grid gap-1">
      {links.map((link, index) => (
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
          {link.label && (
            <span className="ml-auto bg-primary/10 text-primary rounded-sm px-1.5 py-0.5 text-xs">{link.label}</span>
          )}
        </Link>
      ))}
    </div>
  )
}

import { LayoutDashboard, CalendarDays, Users, UserRound, FileText, Settings, MessageSquare } from "lucide-react"

const dashboardNav = [
  {
    title: "Overview",
    icon: <LayoutDashboard className="h-4 w-4" />,
    variant: "default",
    href: "/admin/dashboard",
  },
  {
    title: "Appointments",
    icon: <CalendarDays className="h-4 w-4" />,
    variant: "ghost",
    href: "/admin/dashboard/appointments",
  },
  {
    title: "Consultations",
    icon: <MessageSquare className="h-4 w-4" />,
    variant: "ghost",
    href: "/admin/dashboard/consultations",
  },
  {
    title: "Patients",
    icon: <Users className="h-4 w-4" />,
    variant: "ghost",
    href: "/admin/dashboard/patients",
  },
  {
    title: "Doctors",
    icon: <UserRound className="h-4 w-4" />,
    variant: "ghost",
    href: "/admin/dashboard/doctors",
  },
  {
    title: "Medical Records",
    icon: <FileText className="h-4 w-4" />,
    variant: "ghost",
    href: "/admin/dashboard/records",
  },
  {
    title: "Settings",
    icon: <Settings className="h-4 w-4" />,
    variant: "ghost",
    href: "/admin/dashboard/settings",
  },
]
