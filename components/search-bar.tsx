"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRestPoints } from "@/hooks/use-rest-points";

export function SearchBar() {
  const { setSearchQuery } = useRestPoints();

  return (
    <div className="relative my-6 max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-10 pr-4"
        placeholder="Enter suburb or address"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
