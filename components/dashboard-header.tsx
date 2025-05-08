"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "@/components/user-nav"
import { Logo } from "@/components/logo"

interface DashboardHeaderProps {
  user: any
  onSignOut: () => void
}

export function DashboardHeader({ user, onSignOut }: DashboardHeaderProps) {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/dashboard/appointments" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Certificates", path: "/dashboard/certificates" },
    { name: "Prescriptions", path: "/dashboard/prescriptions" },
    { name: "Settings", path: "/dashboard/settings" },
  ]

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6 border-b border-slate-200">
              <Link href="/" className="flex items-center space-x-2">
                <Logo className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold">FreeDoc</span>
              </Link>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="flex items-center space-x-3 px-4 py-2 rounded-md transition text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={onSignOut}
                className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 px-4 py-2 rounded-md hover:bg-slate-100 w-full transition"
              >
                <span>Sign Out</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center ml-auto space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
