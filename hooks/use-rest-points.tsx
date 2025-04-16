"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Mock data for rest points
const mockRestPoints = [
  {
    id: 1,
    name: "Sunset Rest Area",
    address: "123 Highway Drive, Westfield",
    postcode: "2000",
    hours: "24/7",
    phone: "555-123-4567",
    amenities: ["Restrooms", "Picnic Tables", "Parking"],
    coordinates: { lat: -33.865143, lng: 151.2099 },
  },
  {
    id: 2,
    name: "Mountain View Stop",
    address: "456 Scenic Route, Eastwood",
    postcode: "2000",
    hours: "6am - 10pm",
    phone: "555-987-6543",
    amenities: ["Restrooms", "Food", "Fuel", "Showers"],
    coordinates: { lat: -33.870943, lng: 151.208976 },
  },
  {
    id: 3,
    name: "Riverside Rest Point",
    address: "789 River Road, Northside",
    postcode: "2010",
    hours: "24/7",
    phone: null,
    amenities: ["Restrooms", "Parking", "Pet Area"],
    coordinates: { lat: -33.85876, lng: 151.214824 },
  },
  {
    id: 4,
    name: "Valley Stop",
    address: "101 Valley Way, Southbank",
    postcode: "2010",
    hours: "5am - 11pm",
    phone: "555-456-7890",
    amenities: ["Restrooms", "Food", "Wifi", "Charging Stations"],
    coordinates: { lat: -33.861034, lng: 151.210381 },
  },
  {
    id: 5,
    name: "Lakeside Rest Area",
    address: "202 Lake Drive, Westlake",
    postcode: "2020",
    hours: "24/7",
    phone: "555-789-0123",
    amenities: ["Restrooms", "Picnic Tables", "Scenic View"],
    coordinates: { lat: -33.872761, lng: 151.205338 },
  },
  {
    id: 6,
    name: "Forest Edge Stop",
    address: "303 Forest Path, Greenwood",
    postcode: "2030",
    hours: "7am - 9pm",
    phone: null,
    amenities: ["Restrooms", "Hiking Trails", "Parking"],
    coordinates: { lat: -33.877946, lng: 151.219217 },
  },
  {
    id: 7,
    name: "Coastal Rest Point",
    address: "404 Coastal Highway, Seaside",
    postcode: "2040",
    hours: "24/7",
    phone: "555-234-5678",
    amenities: ["Restrooms", "Beach Access", "Showers"],
    coordinates: { lat: -33.852579, lng: 151.210894 },
  },
  {
    id: 8,
    name: "Desert Oasis",
    address: "505 Desert Road, Sandtown",
    postcode: "2050",
    hours: "6am - 10pm",
    phone: "555-345-6789",
    amenities: ["Restrooms", "Food", "Fuel", "Air Conditioning"],
    coordinates: { lat: -33.863001, lng: 151.200456 },
  },
];

type RestPoint = (typeof mockRestPoints)[0];

interface RestPointsContextType {
  allPoints: RestPoint[];
  filteredPoints: RestPoint[];
  loading: boolean;
  searchQuery: string;
  category: string;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  addRestPoint: (point: Omit<RestPoint, "id">) => void;
  updateRestPoint: (id: number, point: Partial<RestPoint>) => void;
  deleteRestPoint: (id: number) => void;
}

const RestPointsContext = createContext<RestPointsContextType | undefined>(
  undefined
);

export function RestPointsProvider({ children }: { children: ReactNode }) {
  const [allPoints, setAllPoints] = useState<RestPoint[]>(mockRestPoints);
  const [filteredPoints, setFilteredPoints] =
    useState<RestPoint[]>(mockRestPoints);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("rest-points");
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter rest points based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPoints(allPoints);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allPoints.filter(
      (point) =>
        point.name.toLowerCase().includes(query) ||
        point.address.toLowerCase().includes(query) ||
        point.postcode.includes(query)
    );
    setFilteredPoints(filtered);
  }, [searchQuery, allPoints]);

  // Add a new rest point
  const addRestPoint = (point: Omit<RestPoint, "id">) => {
    const newPoint = {
      ...point,
      id: Math.max(...allPoints.map((p) => p.id)) + 1,
    };
    setAllPoints((prev) => [...prev, newPoint]);
  };

  // Update an existing rest point
  const updateRestPoint = (id: number, point: Partial<RestPoint>) => {
    setAllPoints((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...point } : p))
    );
  };

  // Delete a rest point
  const deleteRestPoint = (id: number) => {
    setAllPoints((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <RestPointsContext.Provider
      value={{
        allPoints,
        filteredPoints,
        loading,
        searchQuery,
        category,
        setSearchQuery,
        setCategory,
        addRestPoint,
        updateRestPoint,
        deleteRestPoint,
      }}
    >
      {children}
    </RestPointsContext.Provider>
  );
}

export function useRestPoints() {
  const context = useContext(RestPointsContext);
  if (context === undefined) {
    throw new Error("useRestPoints must be used within a RestPointsProvider");
  }
  return context;
}