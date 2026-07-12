import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function PurchaseDialog({ isOpen, vehicle, onConfirm, onCancel }) {
  return (
    <Dialog open={isOpen}>
      <DialogContent onClose={onCancel}>
        <DialogHeader>
          <DialogTitle>Purchase Vehicle</DialogTitle>
          <DialogDescription>
            Are you sure you want to purchase the {vehicle?.make} {vehicle?.model}?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 text-left">
          <div className="flex justify-between text-sm border-b border-[#E9E4DA] pb-2">
            <span className="text-[#5B6A60]">Category</span>
            <span className="font-medium text-[#1D2D24]">{vehicle?.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#5B6A60]">Price</span>
            <span className="font-semibold text-[#1D2D24]">
              ${vehicle?.price?.toLocaleString("en-US")}
            </span>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-2">
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full sm:w-auto px-5 h-10 border-[#E9E4DA] text-[#5B6A60] hover:bg-[#F8F5F0]"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm?.(vehicle?.id)}
            className="w-full sm:w-auto px-5 h-10 bg-[#285943] hover:bg-[#285943]/90 text-white font-semibold"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
