"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRestPoints } from "@/hooks/use-rest-points";

export function CategorySelector() {
  const { setCategory } = useRestPoints();
  const [value, setValue] = useState("rest-points");

  const handleValueChange = (value: string) => {
    setValue(value);
    setCategory(value);
  };

  return (
    <div className="flex justify-center my-6">
      <Tabs
        defaultValue="rest-points"
        value={value}
        onValueChange={handleValueChange}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="rest-points"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-950 dark:data-[state=active]:text-blue-300"
          >
            Rest Points
          </TabsTrigger>
          <TabsTrigger
            value="movies"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-950 dark:data-[state=active]:text-blue-300"
          >
            Movies
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
