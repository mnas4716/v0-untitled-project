import { AlertTriangle } from "lucide-react"

export function ComingSoonBanner() {
  return (
    <div className="bg-yellow-400 text-black p-3 w-full text-center shadow-md">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <AlertTriangle className="h-6 w-6 text-yellow-800" />
        <div>
          <p className="font-bold text-yellow-900">COMING SOON!</p>
          <p className="text-sm text-yellow-800">Our new website and services will be launching soon.</p>
        </div>
      </div>
    </div>
  )
}
