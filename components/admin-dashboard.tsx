"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Trash2, Plus } from "lucide-react";
import { useRestPoints } from "@/hooks/use-rest-points";
import { motion } from "framer-motion";

export function AdminDashboard() {
  const { allPoints, addRestPoint, updateRestPoint, deleteRestPoint } =
    useRestPoints();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPoint, setCurrentPoint] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postcode: "",
    hours: "",
    phone: "",
    amenities: "",
  });

  const handleAddClick = () => {
    setFormData({
      name: "",
      address: "",
      postcode: "",
      hours: "",
      phone: "",
      amenities: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleEditClick = (point: any) => {
    setCurrentPoint(point);
    setFormData({
      name: point.name,
      address: point.address,
      postcode: point.postcode,
      hours: point.hours,
      phone: point.phone || "",
      amenities: point.amenities.join(", "),
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (point: any) => {
    setCurrentPoint(point);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amenitiesArray = formData.amenities
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    addRestPoint({
      name: formData.name,
      address: formData.address,
      postcode: formData.postcode,
      hours: formData.hours,
      phone: formData.phone || null,
      amenities: amenitiesArray,
      coordinates: { lat: 0, lng: 0 }, // Default coordinates
    });
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPoint) return;

    const amenitiesArray = formData.amenities
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    updateRestPoint(currentPoint.id, {
      name: formData.name,
      address: formData.address,
      postcode: formData.postcode,
      hours: formData.hours,
      phone: formData.phone || null,
      amenities: amenitiesArray,
    });
    setIsEditDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!currentPoint) return;
    deleteRestPoint(currentPoint.id);
    setIsDeleteDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" /> Add Rest Point
        </Button>
      </div>

      <Tabs defaultValue="rest-points" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="rest-points">Rest Points</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
        </TabsList>
        <TabsContent value="rest-points" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Rest Points</CardTitle>
              <CardDescription>
                View, add, edit, or delete rest points from the database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Postcode</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allPoints.map((point) => (
                    <TableRow key={point.id}>
                      <TableCell className="font-medium">
                        {point.name}
                      </TableCell>
                      <TableCell>{point.address}</TableCell>
                      <TableCell>{point.postcode}</TableCell>
                      <TableCell>{point.hours}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditClick(point)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteClick(point)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="movies" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Movies</CardTitle>
              <CardDescription>
                View, add, edit, or delete movies from the database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <p className="text-muted-foreground text-center">
                  Movie management functionality will be implemented in a future
                  update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Rest Point Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Rest Point</DialogTitle>
            <DialogDescription>
              Enter the details for the new rest point.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="postcode" className="text-right">
                  Postcode
                </Label>
                <Input
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hours" className="text-right">
                  Hours
                </Label>
                <Input
                  id="hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amenities" className="text-right">
                  Amenities
                </Label>
                <Input
                  id="amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Restrooms, Food, Fuel (comma separated)"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Rest Point</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Rest Point Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Rest Point</DialogTitle>
            <DialogDescription>
              Update the details for this rest point.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  Address
                </Label>
                <Input
                  id="edit-address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-postcode" className="text-right">
                  Postcode
                </Label>
                <Input
                  id="edit-postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-hours" className="text-right">
                  Hours
                </Label>
                <Input
                  id="edit-hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-amenities" className="text-right">
                  Amenities
                </Label>
                <Input
                  id="edit-amenities"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Restrooms, Food, Fuel (comma separated)"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentPoint?.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
