import { Wrench } from "lucide-react"

export function ComingSoonBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 w-full text-center shadow-lg">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Wrench className="h-5 w-5 text-blue-100 animate-pulse" />
        <div>
          <p className="font-semibold text-white">Currently under re-development</p>
          <p className="text-sm text-blue-100">
            Our new and improved website, app and services will be re-launching again soon
          </p>
        </div>
      </div>
    </div>
  )
}
