import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getAllVehicles, searchVehicles, purchaseVehicle } from "@/services/vehicleService";
import PurchaseDialog from "@/components/ui/PurchaseDialog";
import { toast } from "@/lib/toast";

export default function Inventory({ vehicles, onSearch, onPurchase }) {
  const [vehiclesList, setVehiclesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  const [filters, setFilters] = useState({
    make: "",
    model: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

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

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (isPropDriven) {
      onSearch?.(filters);
    } else {
      setIsLoading(true);
      setError("");
      try {
        const data = await searchVehicles(filters);
        setVehiclesList(data);
      } catch (err) {
        const message = err.response?.data?.message || err.message || "Search failed";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePurchaseClick = (vehicle) => {
    if (isPropDriven) {
      onPurchase?.(vehicle.id);
    } else {
      setSelectedVehicle(vehicle);
      setIsPurchaseDialogOpen(true);
    }
  };

  const handleConfirmPurchase = async (vehicleId) => {
    setIsPurchaseDialogOpen(false);
    setIsLoading(true);
    setError("");
    try {
      await purchaseVehicle(vehicleId);
      toast.success("Purchase successful");
      await fetchAll();
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Purchase failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F5F0] py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight text-[#285943]">
            Inventory
          </h1>
          <p className="text-[#5B6A60] text-left">
            Browse and filter our collection of luxury performance vehicles
          </p>
        </div>

        {/* Search Filters */}
        <Card className="bg-white border border-[#E9E4DA] rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="make" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60] select-none">
                Make
              </label>
              <Input
                id="make"
                name="make"
                placeholder="e.g. Tesla"
                value={filters.make}
                onChange={handleChange}
                className="h-11 px-4 rounded-xl border-[#E9E4DA] bg-white text-[#1D2D24] focus-visible:border-[#285943] focus-visible:ring-[#285943]/20"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="model" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60] select-none">
                Model
              </label>
              <Input
                id="model"
                name="model"
                placeholder="e.g. Model S"
                value={filters.model}
                onChange={handleChange}
                className="h-11 px-4 rounded-xl border-[#E9E4DA] bg-white text-[#1D2D24] focus-visible:border-[#285943] focus-visible:ring-[#285943]/20"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60] select-none">
                Category
              </label>
              <Input
                id="category"
                name="category"
                placeholder="e.g. Electric"
                value={filters.category}
                onChange={handleChange}
                className="h-11 px-4 rounded-xl border-[#E9E4DA] bg-white text-[#1D2D24] focus-visible:border-[#285943] focus-visible:ring-[#285943]/20"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="minPrice" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60] select-none">
                Min Price
              </label>
              <Input
                id="minPrice"
                name="minPrice"
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={handleChange}
                className="h-11 px-4 rounded-xl border-[#E9E4DA] bg-white text-[#1D2D24] focus-visible:border-[#285943] focus-visible:ring-[#285943]/20"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="maxPrice" className="text-xs font-semibold uppercase tracking-wider text-[#5B6A60] select-none">
                Max Price
              </label>
              <Input
                id="maxPrice"
                name="maxPrice"
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={handleChange}
                className="h-11 px-4 rounded-xl border-[#E9E4DA] bg-white text-[#1D2D24] focus-visible:border-[#285943] focus-visible:ring-[#285943]/20"
              />
            </div>

            <div className="md:col-span-5 flex justify-end mt-2">
              <Button
                type="submit"
                className="w-full md:w-auto h-11 bg-[#285943] hover:bg-[#285943]/90 text-white font-semibold rounded-xl px-8 tracking-wide transition-all duration-200 shadow-md shadow-[#285943]/10"
              >
                Search
              </Button>
            </div>
          </form>
        </Card>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#285943] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : vehiclesList.length === 0 ? (
          <div className="w-full py-16 text-center bg-white border border-[#E9E4DA] rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <p className="text-lg font-medium text-[#5B6A60]">
              No vehicles found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiclesList.map((vehicle) => (
              <Card 
                key={vehicle.id} 
                className="bg-white border border-[#E9E4DA] rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col justify-between"
              >
                <CardHeader className="p-6 pb-4 text-left">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#1D2D24]">
                        {vehicle.make}
                      </h3>
                      <p className="text-sm font-medium text-[#5B6A60]">
                        {vehicle.model}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#285943]/10 text-[#285943]">
                      {vehicle.category}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 text-left flex flex-col gap-2">
                  <div className="flex justify-between text-sm border-b border-[#E9E4DA] pb-2">
                    <span className="text-[#5B6A60]">Price</span>
                    <span className="font-semibold text-[#1D2D24]">
                      {vehicle.activeDiscountRate > 0 ? (
                        <>
                          <span className="line-through text-red-500 mr-2">${vehicle.price.toLocaleString("en-US")}</span>
                          <span className="text-[#285943]">${vehicle.discountedPrice.toLocaleString("en-US")}</span>
                          <span className="ml-1.5 px-1.5 py-0.5 rounded bg-red-100 text-red-600 text-[10px] font-bold">{vehicle.activeDiscountRate}% OFF</span>
                        </>
                      ) : (
                        `$${vehicle.price.toLocaleString("en-US")}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5B6A60]">Quantity Available</span>
                    <span className={`font-semibold ${vehicle.quantity > 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {vehicle.quantity}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => handlePurchaseClick(vehicle)}
                    disabled={vehicle.quantity === 0}
                    className="w-full h-11 bg-[#285943] hover:bg-[#285943]/90 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50"
                  >
                    Purchase
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

      </div>

      <PurchaseDialog
        isOpen={isPurchaseDialogOpen}
        vehicle={selectedVehicle}
        onConfirm={handleConfirmPurchase}
        onCancel={() => setIsPurchaseDialogOpen(false)}
      />
    </main>
  );
}
