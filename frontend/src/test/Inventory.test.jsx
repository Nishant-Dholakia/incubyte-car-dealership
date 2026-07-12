import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Inventory from "../pages/Inventory";
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

describe("Inventory Component", () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      vehicles: mockVehicles,
      onSearch: vi.fn(),
      onPurchase: vi.fn(),
    };
  });

  const renderInventory = (props = {}) => {
    return render(<Inventory {...defaultProps} {...props} />);
  };

  describe("Rendering", () => {
    it("renders page heading", () => {
      renderInventory();
      const heading = screen.getByRole("heading", { name: /inventory/i });
      expect(heading).toBeInTheDocument();
    });

    it("renders search filters", () => {
      renderInventory();
      expect(screen.getByLabelText(/make/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/min price/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/max price/i)).toBeInTheDocument();
    });

    it("renders vehicle cards", () => {
      renderInventory();
      const purchaseButtons = screen.getAllByRole("button", { name: /purchase/i });
      expect(purchaseButtons).toHaveLength(2);
    });

    it("displays make", () => {
      renderInventory();
      expect(screen.getByText("Tesla")).toBeInTheDocument();
      expect(screen.getByText("Porsche")).toBeInTheDocument();
    });

    it("displays model", () => {
      renderInventory();
      expect(screen.getByText("Model S")).toBeInTheDocument();
      expect(screen.getByText("911")).toBeInTheDocument();
    });

    it("displays category", () => {
      renderInventory();
      expect(screen.getByText("Electric")).toBeInTheDocument();
      expect(screen.getByText("Sports")).toBeInTheDocument();
    });

    it("displays price", () => {
      renderInventory();
      expect(screen.getByText(/89,?990/)).toBeInTheDocument();
      expect(screen.getByText(/120,?000/)).toBeInTheDocument();
    });

    it("displays quantity", () => {
      renderInventory();
      expect(screen.getByText(/5/)).toBeInTheDocument();
      expect(screen.getByText(/0/)).toBeInTheDocument();
    });
  });

  describe("Search", () => {
    it("user can type make", async () => {
      const user = userEvent.setup();
      renderInventory();
      const makeInput = screen.getByLabelText(/make/i);
      await user.type(makeInput, "Ferrari");
      expect(makeInput).toHaveValue("Ferrari");
    });

    it("user can type model", async () => {
      const user = userEvent.setup();
      renderInventory();
      const modelInput = screen.getByLabelText(/model/i);
      await user.type(modelInput, "F8");
      expect(modelInput).toHaveValue("F8");
    });

    it("user can choose category", async () => {
      const user = userEvent.setup();
      renderInventory();
      const categoryInput = screen.getByLabelText(/category/i);
      await user.type(categoryInput, "Supercar");
      expect(categoryInput).toHaveValue("Supercar");
    });

    it("user can enter minimum price", async () => {
      const user = userEvent.setup();
      renderInventory();
      const minPriceInput = screen.getByLabelText(/min price/i);
      await user.type(minPriceInput, "50000");
      expect(minPriceInput).toHaveValue(50000);
    });

    it("user can enter maximum price", async () => {
      const user = userEvent.setup();
      renderInventory();
      const maxPriceInput = screen.getByLabelText(/max price/i);
      await user.type(maxPriceInput, "150000");
      expect(maxPriceInput).toHaveValue(150000);
    });

    it("clicking Search calls onSearch with entered filters", async () => {
      const user = userEvent.setup();
      renderInventory();

      await user.type(screen.getByLabelText(/make/i), "Tesla");
      await user.type(screen.getByLabelText(/model/i), "Model S");
      await user.type(screen.getByLabelText(/category/i), "Electric");
      await user.type(screen.getByLabelText(/min price/i), "50000");
      await user.type(screen.getByLabelText(/max price/i), "150000");

      const searchButton = screen.getByRole("button", { name: /search/i });
      await user.click(searchButton);

      expect(defaultProps.onSearch).toHaveBeenCalledTimes(1);
      expect(defaultProps.onSearch).toHaveBeenCalledWith({
        make: "Tesla",
        model: "Model S",
        category: "Electric",
        minPrice: "50000",
        maxPrice: "150000",
      });
    });
  });

  describe("Purchase", () => {
    it("clicking Purchase calls onPurchase with vehicle id", async () => {
      const user = userEvent.setup();
      renderInventory();

      const purchaseButtons = screen.getAllByRole("button", { name: /purchase/i });
      await user.click(purchaseButtons[0]);

      expect(defaultProps.onPurchase).toHaveBeenCalledTimes(1);
      expect(defaultProps.onPurchase).toHaveBeenCalledWith(1);
    });

    it("Purchase button is disabled when quantity is zero", () => {
      renderInventory();
      
      const purchaseButtons = screen.getAllByRole("button", { name: /purchase/i });
      expect(purchaseButtons[1]).toBeDisabled();
    });
  });

  describe("Empty State", () => {
    it("displays \"No vehicles found\" when vehicles array is empty", () => {
      renderInventory({ vehicles: [] });
      expect(screen.getByText("No vehicles found")).toBeInTheDocument();
    });
  });
});
