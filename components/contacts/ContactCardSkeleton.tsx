import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContactCardSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
      </CardFooter>
    </Card>
  )
}

