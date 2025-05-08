import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DoctorDashboardLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[180px] mt-2" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-[120px]" />
                </CardTitle>
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[60px]" />
                <Skeleton className="h-4 w-[140px] mt-2" />
              </CardContent>
            </Card>
          ))}
      </div>

      <Skeleton className="h-10 w-full" />

      <div className="space-y-4">
        <Skeleton className="h-10 w-[200px]" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[300px] mt-2" />
          </CardHeader>
          <CardContent>
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="border rounded-lg p-4 bg-white mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-5 w-[150px]" />
                      </div>
                      <Skeleton className="h-4 w-[180px] mt-2" />
                      <Skeleton className="h-4 w-[120px] mt-1" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-[80px] mt-2" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Skeleton className="h-9 w-[120px]" />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
