import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Login";
import "@testing-library/jest-dom";

describe("Login Component", () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      onSubmit: vi.fn(),
    };
  });

  const renderLogin = (props = {}) => {
    return render(<Login {...defaultProps} {...props} />);
  };

  describe("Rendering", () => {
    it("renders page heading", () => {
      renderLogin();
      const heading = screen.getByRole("heading", { name: /login/i });
      expect(heading).toBeInTheDocument();
    });

    it("renders email input", () => {
      renderLogin();
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toBeInTheDocument();
    });

    it("renders password input", () => {
      renderLogin();
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toBeInTheDocument();
    });

    it("renders login button", () => {
      renderLogin();
      const loginButton = screen.getByRole("button", { name: /login|sign in/i });
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe("User Interaction", () => {
    it("allows typing into email", async () => {
      const user = userEvent.setup();
      renderLogin();
      const emailInput = screen.getByLabelText(/email/i);

      await user.type(emailInput, "test@example.com");
      expect(emailInput).toHaveValue("test@example.com");
    });

    it("allows typing into password", async () => {
      const user = userEvent.setup();
      renderLogin();
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(passwordInput, "password123");
      expect(passwordInput).toHaveValue("password123");
    });
  });

  describe("Validation", () => {
    it("shows \"Email is required\" when email is empty", async () => {
      const user = userEvent.setup();
      renderLogin();

      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, "password123");

      const submitButton = screen.getByRole("button", { name: /login|sign in/i });
      await user.click(submitButton);

      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it("shows \"Password is required\" when password is empty", async () => {
      const user = userEvent.setup();
      renderLogin();

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, "test@example.com");

      const submitButton = screen.getByRole("button", { name: /login|sign in/i });
      await user.click(submitButton);

      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it("shows \"Invalid email\" for invalid email format", async () => {
      const user = userEvent.setup();
      renderLogin();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, "invalid-email");
      await user.type(passwordInput, "password123");

      const submitButton = screen.getByRole("button", { name: /login|sign in/i });
      await user.click(submitButton);

      expect(screen.getByText("Invalid email")).toBeInTheDocument();
      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("Submission", () => {
    it("calls onSubmit with { email, password } when form is valid", async () => {
      const user = userEvent.setup();
      renderLogin();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "password123");

      const submitButton = screen.getByRole("button", { name: /login|sign in/i });
      await user.click(submitButton);

      expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
      expect(defaultProps.onSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    it("does not call onSubmit when validation fails", async () => {
      const user = userEvent.setup();
      renderLogin();

      const submitButton = screen.getByRole("button", { name: /login|sign in/i });
      await user.click(submitButton);

      expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });
  });
});
