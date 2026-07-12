import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Inventory({ vehicles = [], onSearch, onPurchase }) {
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch?.(filters);
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

        {/* Empty State vs Vehicle Grid */}
        {vehicles.length === 0 ? (
          <div className="w-full py-16 text-center bg-white border border-[#E9E4DA] rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <p className="text-lg font-medium text-[#5B6A60]">
              No vehicles found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
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
                      ${vehicle.price.toLocaleString("en-US")}
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
                    onClick={() => onPurchase?.(vehicle.id)}
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
    </main>
  );
}
