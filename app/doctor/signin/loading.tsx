import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

export default function DoctorSignInLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-16 border-b bg-white">
        <div className="container flex h-full items-center">
          <Skeleton className="h-8 w-8" />
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center bg-slate-50 py-12">
        <div className="container max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-2">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-7 w-[180px] mx-auto" />
              <Skeleton className="h-4 w-[250px] mx-auto" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Skeleton className="h-4 w-[200px] mx-auto" />
            </CardFooter>
          </Card>
        </div>
      </main>

      <div className="border-t bg-white py-6">
        <div className="container">
          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>
      </div>
    </div>
  )
}
