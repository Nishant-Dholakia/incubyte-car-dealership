import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Admin from "../pages/Admin";
import "@testing-library/jest-dom";

const mockVehicles = [
  {
    id: 1,
    make: "Tesla",
    model: "Model S",
    category: "Electric",
    price: 89990,
    quantity: 5,
  },
  {
    id: 2,
    make: "Porsche",
    model: "911",
    category: "Sports",
    price: 120000,
    quantity: 0,
  },
];

describe("Admin Component", () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      vehicles: mockVehicles,
      onAdd: vi.fn(),
      onEdit: vi.fn(),
      onDelete: vi.fn(),
      onRestock: vi.fn(),
    };
  });

  const renderAdmin = (props = {}) => {
    return render(<Admin {...defaultProps} {...props} />);
  };

  describe("Rendering", () => {
    it("renders page heading", () => {
      renderAdmin();
      const heading = screen.getByRole("heading", { name: /admin/i });
      expect(heading).toBeInTheDocument();
    });

    it("renders Add Vehicle button", () => {
      renderAdmin();
      const addButton = screen.getByRole("button", { name: /add vehicle/i });
      expect(addButton).toBeInTheDocument();
    });

    it("renders vehicle table", () => {
      renderAdmin();
      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("displays make", () => {
      renderAdmin();
      expect(screen.getByText("Tesla")).toBeInTheDocument();
      expect(screen.getByText("Porsche")).toBeInTheDocument();
    });

    it("displays model", () => {
      renderAdmin();
      expect(screen.getByText("Model S")).toBeInTheDocument();
      expect(screen.getByText("911")).toBeInTheDocument();
    });

    it("displays category", () => {
      renderAdmin();
      expect(screen.getByText("Electric")).toBeInTheDocument();
      expect(screen.getByText("Sports")).toBeInTheDocument();
    });

    it("displays price", () => {
      renderAdmin();
      expect(screen.getByText("$89,990")).toBeInTheDocument();
      expect(screen.getByText("$120,000")).toBeInTheDocument();
    });

    it("displays quantity", () => {
      renderAdmin();
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  describe("Actions", () => {
    it("clicking Add Vehicle calls onAdd", async () => {
      const user = userEvent.setup();
      renderAdmin();

      const addButton = screen.getByRole("button", { name: /add vehicle/i });
      await user.click(addButton);

      expect(defaultProps.onAdd).toHaveBeenCalledTimes(1);
    });

    it("clicking Edit calls onEdit(vehicle.id)", async () => {
      const user = userEvent.setup();
      renderAdmin();

      const editButtons = screen.getAllByRole("button", { name: /edit/i });
      await user.click(editButtons[0]);

      expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
      expect(defaultProps.onEdit).toHaveBeenCalledWith(1);
    });

    it("clicking Delete calls onDelete(vehicle.id)", async () => {
      const user = userEvent.setup();
      renderAdmin();

      const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
      await user.click(deleteButtons[0]);

      expect(defaultProps.onDelete).toHaveBeenCalledTimes(1);
      expect(defaultProps.onDelete).toHaveBeenCalledWith(1);
    });

    it("clicking Restock calls onRestock(vehicle.id)", async () => {
      const user = userEvent.setup();
      renderAdmin();

      const restockButtons = screen.getAllByRole("button", { name: /restock/i });
      await user.click(restockButtons[0]);

      expect(defaultProps.onRestock).toHaveBeenCalledTimes(1);
      expect(defaultProps.onRestock).toHaveBeenCalledWith(1);
    });
  });

  describe("Empty State", () => {
    it("displays \"No vehicles available\" when list is empty", () => {
      renderAdmin({ vehicles: [] });
      expect(screen.getByText("No vehicles available")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("buttons accessible by role", () => {
      renderAdmin();
      expect(screen.getByRole("button", { name: /add vehicle/i })).toBeInTheDocument();
      
      const editButtons = screen.getAllByRole("button", { name: /edit/i });
      expect(editButtons[0]).toBeInTheDocument();

      const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
      expect(deleteButtons[0]).toBeInTheDocument();

      const restockButtons = screen.getAllByRole("button", { name: /restock/i });
      expect(restockButtons[0]).toBeInTheDocument();
    });

    it("table accessible", () => {
      renderAdmin();
      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("row")).toHaveLength(3); // Header + 2 data rows
      expect(screen.getAllByRole("columnheader")).not.toHaveLength(0);
    });
  });
});
