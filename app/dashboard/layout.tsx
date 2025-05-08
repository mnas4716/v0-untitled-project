// Update the dashboard layout to use our modified header
// This will prevent duplicate headers

import type React from "react"

import { SiteFooter } from "@/components/site-footer"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-slate-50">{children}</main>
      <SiteFooter />
    </div>
  )
}
