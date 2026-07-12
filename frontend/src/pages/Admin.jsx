import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  getAllVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  restockVehicle,
} from "@/services/vehicleService";
import { toast } from "@/lib/toast";

export default function Admin({ vehicles, onAdd, onEdit, onDelete, onRestock }) {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Dialog State
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
  const [restockVehicleId, setRestockVehicleId] = useState(null);
  const [restockQty, setRestockQty] = useState("");
  const [restockError, setRestockError] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteVehicleId, setDeleteVehicleId] = useState(null);

  const isPropDriven = vehicles !== undefined;

  const fetchAll = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getAllVehicles();
      setVehiclesList(data);
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to load vehicles";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPropDriven) {
      fetchAll();
    } else {
      setVehiclesList(vehicles || []);
    }
  }, [vehicles, isPropDriven]);

  // Handlers
  const handleAddClick = () => {
    if (isPropDriven) {
      onAdd?.();
    } else {
      setEditId(null);
      setFormData({
        make: "",
        model: "",
        category: "",
        price: "",
        quantity: "",
      });
      setFormErrors({});
      setIsAddEditDialogOpen(true);
    }
  };

  const handleEditClick = (vehicle) => {
    if (isPropDriven) {
      onEdit?.(vehicle.id);
    } else {
      setEditId(vehicle.id);
      setFormData({
        make: vehicle.make,
        model: vehicle.model,
        category: vehicle.category,
        price: vehicle.price.toString(),
        quantity: vehicle.quantity.toString(),
      });
      setFormErrors({});
      setIsAddEditDialogOpen(true);
    }
  };

  const handleDeleteClick = (vehicleId) => {
    if (isPropDriven) {
      onDelete?.(vehicleId);
    } else {
      setDeleteVehicleId(vehicleId);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleRestockClick = (vehicleId) => {
    if (isPropDriven) {
      onRestock?.(vehicleId);
    } else {
      setRestockVehicleId(vehicleId);
      setRestockQty("");
      setRestockError("");
      setIsRestockDialogOpen(true);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.make || !formData.make.trim()) {
      errors.make = "Make is required";
    }
    if (!formData.model || !formData.model.trim()) {
      errors.model = "Model is required";
    }
    if (!formData.category || !formData.category.trim()) {
      errors.category = "Category is required";
    }
    if (!formData.price || Number(formData.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }
    if (formData.quantity === "" || Number(formData.quantity) < 0) {
      errors.quantity = "Quantity must be 0 or greater";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    try {
      const payload = {
        make: formData.make.trim(),
        model: formData.model.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };

      if (editId) {
        await updateVehicle(editId, payload);
        toast.success("Vehicle updated successfully");
      } else {
        await addVehicle(payload);
        toast.success("Vehicle added successfully");
      }

      setIsAddEditDialogOpen(false);
      await fetchAll();
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestockSubmit = async (e) => {
    e.preventDefault();
    if (!restockQty || Number(restockQty) <= 0) {
      setRestockError("Restock quantity must be greater than 0");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await restockVehicle(restockVehicleId, Number(restockQty));
      toast.success("Vehicle restocked successfully");
      setIsRestockDialogOpen(false);
      await fetchAll();
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    setError("");
    try {
      await deleteVehicle(deleteVehicleId);
      toast.success("Vehicle deleted successfully");
      setIsDeleteDialogOpen(false);
      await fetchAll();
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F5F0] py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-4xl font-semibold tracking-tight text-[#285943]">
              Admin Dashboard
            </h1>
            <p className="text-[#5B6A60]">
              Manage dealership inventory and stock levels
            </p>
          </div>
          <Button
            onClick={handleAddClick}
            disabled={isLoading}
            className="h-11 bg-[#285943] hover:bg-[#285943]/90 text-white font-semibold rounded-xl px-6 tracking-wide transition-all duration-200 shadow-md shadow-[#285943]/10"
          >
            Add Vehicle
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Vehicle Table Container */}
        <Card className="bg-white border border-[#E9E4DA] rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-6">
          {isLoading && vehiclesList.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-[#285943] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : vehiclesList.length === 0 ? (
            <div className="w-full py-16 text-center">
              <p className="text-lg font-medium text-[#5B6A60]">
                No vehicles available
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table role="table" className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr role="row" className="border-b border-[#E9E4DA]">
                    <th role="columnheader" className="py-4 px-4 font-semibold text-[#5B6A60] uppercase tracking-wider text-xs">Make</th>
                    <th role="columnheader" className="py-4 px-4 font-semibold text-[#5B6A60] uppercase tracking-wider text-xs">Model</th>
                    <th role="columnheader" className="py-4 px-4 font-semibold text-[#5B6A60] uppercase tracking-wider text-xs">Category</th>
                    <th role="columnheader" className="py-4 px-4 font-semibold text-[#5B6A60] uppercase tracking-wider text-xs">Price</th>
                    <th role="columnheader" className="py-4 px-4 font-semibold text-[#5B6A60] uppercase tracking-wider text-xs">Quantity</th>
                    <th role="columnheader" className="py-4 px-4 font-semibold text-[#5B6A60] uppercase tracking-wider text-xs text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E4DA]">
                  {vehiclesList.map((vehicle) => (
                    <tr role="row" key={vehicle.id} className="hover:bg-[#F8F5F0]/50 transition-colors">
                      <td className="py-4 px-4 font-medium text-[#1D2D24]">{vehicle.make}</td>
                      <td className="py-4 px-4 text-[#5B6A60]">{vehicle.model}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#285943]/10 text-[#285943]">
                          {vehicle.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#1D2D24]">
                        ${vehicle.price.toLocaleString("en-US")}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-semibold ${vehicle.quantity > 0 ? "text-emerald-600" : "text-red-500"}`}>
                          {vehicle.quantity}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            onClick={() => handleRestockClick(vehicle.id)}
                            disabled={isLoading}
                            variant="outline"
                            className="h-8 text-xs font-medium border-[#E9E4DA] text-[#5B6A60] hover:bg-[#F8F5F0]"
                          >
                            Restock
                          </Button>
                          <Button
                            onClick={() => handleEditClick(vehicle)}
                            disabled={isLoading}
                            variant="outline"
                            className="h-8 text-xs font-medium border-[#E9E4DA] text-[#5B6A60] hover:bg-[#F8F5F0]"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteClick(vehicle.id)}
                            disabled={isLoading}
                            variant="destructive"
                            className="h-8 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isAddEditDialogOpen}>
        <DialogContent onClose={() => setIsAddEditDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Vehicle" : "Add Vehicle"}</DialogTitle>
            <DialogDescription>
              {editId ? "Update details for this performance vehicle." : "Add a new luxury vehicle to the inventory."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-make" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60]">Make</label>
              <Input
                id="form-make"
                name="make"
                placeholder="e.g. Tesla"
                value={formData.make}
                onChange={handleInputChange}
                className="h-11 rounded-xl border-[#E9E4DA]"
              />
              {formErrors.make && <span className="text-xs text-red-500">{formErrors.make}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-model" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60]">Model</label>
              <Input
                id="form-model"
                name="model"
                placeholder="e.g. Model S"
                value={formData.model}
                onChange={handleInputChange}
                className="h-11 rounded-xl border-[#E9E4DA]"
              />
              {formErrors.model && <span className="text-xs text-red-500">{formErrors.model}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-category" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60]">Category</label>
              <Input
                id="form-category"
                name="category"
                placeholder="e.g. Electric"
                value={formData.category}
                onChange={handleInputChange}
                className="h-11 rounded-xl border-[#E9E4DA]"
              />
              {formErrors.category && <span className="text-xs text-red-500">{formErrors.category}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-price" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60]">Price ($)</label>
              <Input
                id="form-price"
                name="price"
                type="number"
                placeholder="e.g. 89990"
                value={formData.price}
                onChange={handleInputChange}
                className="h-11 rounded-xl border-[#E9E4DA]"
              />
              {formErrors.price && <span className="text-xs text-red-500">{formErrors.price}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-quantity" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60]">Initial Quantity</label>
              <Input
                id="form-quantity"
                name="quantity"
                type="number"
                placeholder="e.g. 5"
                value={formData.quantity}
                onChange={handleInputChange}
                className="h-11 rounded-xl border-[#E9E4DA]"
              />
              {formErrors.quantity && <span className="text-xs text-red-500">{formErrors.quantity}</span>}
            </div>

            <div className="flex gap-3 justify-end mt-4">
              <Button
                type="button"
                onClick={() => setIsAddEditDialogOpen(false)}
                variant="outline"
                className="h-11 border-[#E9E4DA] text-[#5B6A60]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 bg-[#285943] hover:bg-[#285943]/90 text-white font-semibold"
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Restock Dialog */}
      <Dialog open={isRestockDialogOpen}>
        <DialogContent onClose={() => setIsRestockDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Restock Vehicle</DialogTitle>
            <DialogDescription>
              Enter the quantity of vehicles to add to the existing stock.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRestockSubmit} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="restock-qty" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60]">Quantity to Add</label>
              <Input
                id="restock-qty"
                type="number"
                placeholder="e.g. 10"
                value={restockQty}
                onChange={(e) => setRestockQty(e.target.value)}
                className="h-11 rounded-xl border-[#E9E4DA]"
              />
              {restockError && <span className="text-xs text-red-500">{restockError}</span>}
            </div>

            <div className="flex gap-3 justify-end mt-4">
              <Button
                type="button"
                onClick={() => setIsRestockDialogOpen(false)}
                variant="outline"
                className="h-11 border-[#E9E4DA] text-[#5B6A60]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 bg-[#285943] hover:bg-[#285943]/90 text-white font-semibold"
              >
                Restock
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen}>
        <DialogContent onClose={() => setIsDeleteDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Delete Vehicle</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 justify-end mt-4">
            <Button
              type="button"
              onClick={() => setIsDeleteDialogOpen(false)}
              variant="outline"
              className="h-11 border-[#E9E4DA] text-[#5B6A60]"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isLoading}
              variant="destructive"
              className="h-11 bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
