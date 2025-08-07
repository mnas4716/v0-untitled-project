import { Logo } from "@/components/logo"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Coming Soon</h1>
        <div className="mb-8">
          <Logo className="h-16 w-auto mx-auto" />
        </div>
        <Link href="/admin/signin">
          <Button variant="outline" size="sm" className="mt-8">
            Admin Access
          </Button>
        </Link>
      </div>
    </div>
  )
}
