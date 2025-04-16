"use client";
import { MapPin, Clock, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRestPoints } from "@/hooks/use-rest-points";
import { motion } from "framer-motion";

export function RestPointsList() {
  const { filteredPoints, loading, category } = useRestPoints();

  if (loading) {
    return <RestPointsListSkeleton />;
  }

  if (category === "movies") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <MovieCard key={i} />
        ))}
      </div>
    );
  }

  if (filteredPoints.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No rest points found</h3>
        <p className="text-muted-foreground">
          Try a different search term or location
        </p>
      </div>
    );
  }

  // Group rest points by postcode
  const groupedPoints = filteredPoints.reduce((acc, point) => {
    const postcode = point.postcode;
    if (!acc[postcode]) {
      acc[postcode] = [];
    }
    acc[postcode].push(point);
    return acc;
  }, {} as Record<string, typeof filteredPoints>);

  // Sort postcodes in ascending order
  const sortedPostcodes = Object.keys(groupedPoints).sort(
    (a, b) => Number.parseInt(a) - Number.parseInt(b)
  );

  return (
    <div className="space-y-8">
      {sortedPostcodes.map((postcode) => (
        <div key={postcode} className="space-y-4">
          <h2 className="text-xl font-bold flex items-center">
            <Badge variant="outline" className="mr-2">
              {postcode}
            </Badge>
            {groupedPoints[postcode].length} locations
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groupedPoints[postcode].map((point, index) => (
              <RestPointCard key={point.id} point={point} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RestPointCard({ point, index }: { point: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{point.name}</CardTitle>
          <CardDescription className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            {point.address}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-2" />
              <span>{point.hours}</span>
            </div>
            {point.phone && (
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-3.5 w-3.5 mr-2" />
                <span>{point.phone}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {point.amenities.map((amenity: string) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function MovieCard() {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-muted-foreground">Movie Poster</span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Movie Title</CardTitle>
        <CardDescription>2023 • Action, Adventure</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </CardContent>
      <CardFooter>
        <Badge variant="secondary" className="text-xs">
          Now Showing
        </Badge>
      </CardFooter>
    </Card>
  );
}

function RestPointsListSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2].map((section) => (
        <div key={section} className="space-y-4">
          <div className="flex items-center">
            <Skeleton className="h-6 w-16 mr-2" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
