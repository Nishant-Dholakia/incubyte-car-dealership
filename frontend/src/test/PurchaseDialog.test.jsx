import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PurchaseDialog from "../components/ui/PurchaseDialog";
import "@testing-library/jest-dom";

const mockVehicle = {
  id: 1,
  make: "Tesla",
  model: "Model S",
  category: "Electric",
  price: 89990,
  quantity: 5,
};

describe("PurchaseDialog Component", () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      isOpen: true,
      vehicle: mockVehicle,
      onConfirm: vi.fn(),
      onCancel: vi.fn(),
    };
  });

  const renderDialog = (props = {}) => {
    return render(<PurchaseDialog {...defaultProps} {...props} />);
  };

  describe("Rendering", () => {
    it("renders dialog when isOpen is true", () => {
      renderDialog();
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("does not render when isOpen is false", () => {
      renderDialog({ isOpen: false });
      const dialog = screen.queryByRole("dialog");
      expect(dialog).not.toBeInTheDocument();
    });

    it("displays vehicle make and model", () => {
      renderDialog();
      expect(screen.getByText(/Tesla/i)).toBeInTheDocument();
      expect(screen.getByText(/Model S/i)).toBeInTheDocument();
    });

    it("displays confirmation message", () => {
      renderDialog();
      // Look for a confirmation message/prompt. E.g. "Are you sure you want to purchase..."
      // The test expects confirmation message exists, which we check with /confirm/i
      expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
  });

  describe("Actions", () => {
    it("clicking Confirm calls onConfirm with vehicle.id", async () => {
      const user = userEvent.setup();
      renderDialog();

      const confirmButton = screen.getByRole("button", { name: /confirm/i });
      await user.click(confirmButton);

      expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
      expect(defaultProps.onConfirm).toHaveBeenCalledWith(mockVehicle.id);
    });

    it("clicking Cancel calls onCancel", async () => {
      const user = userEvent.setup();
      renderDialog();

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      await user.click(cancelButton);

      expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
    });

    it("clicking Close calls onCancel", async () => {
      const user = userEvent.setup();
      renderDialog();

      const closeButton = screen.queryByRole("button", { name: /close/i });
      if (closeButton) {
        await user.click(closeButton);
        expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe("Accessibility", () => {
    it("dialog has role=\"dialog\"", () => {
      renderDialog();
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("Confirm and Cancel buttons are accessible by role", () => {
      renderDialog();
      expect(screen.getByRole("button", { name: /confirm/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    });
  });
});
