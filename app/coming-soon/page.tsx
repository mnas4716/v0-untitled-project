import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="text-center">
        <Link href="/admin/signin">
          <Button variant="outline" size="sm">
            Admin Access
          </Button>
        </Link>
      </div>
    </div>
  )
}
