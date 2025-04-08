
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-muted shimmer"></div>
      <CardContent className="p-4">
        <div className="h-4 w-24 bg-muted rounded shimmer mb-4 mt-2"></div>
        <div className="h-6 bg-muted rounded shimmer mb-2"></div>
        <div className="h-6 bg-muted rounded shimmer mb-2 w-3/4"></div>
        <div className="h-4 bg-muted rounded shimmer mb-2"></div>
        <div className="h-4 bg-muted rounded shimmer mb-2 w-5/6"></div>
        <div className="h-4 bg-muted rounded shimmer w-4/6"></div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
        <div className="h-9 w-24 bg-muted rounded shimmer"></div>
        <div className="h-9 w-24 bg-muted rounded shimmer"></div>
        <div className="h-9 w-24 bg-muted rounded shimmer"></div>
      </CardFooter>
    </Card>
  );
}
