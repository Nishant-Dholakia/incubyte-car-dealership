import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../pages/Register";
import "@testing-library/jest-dom";

describe("Register Component", () => {
  const defaultProps = {
    onSubmit: vi.fn(),
  };

  it("renders page heading", () => {
    render(<Register {...defaultProps} />);
    const heading = screen.getByRole("heading", { name: /register|create account/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders all input fields", () => {
    render(<Register {...defaultProps} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  });

  it("renders Register button", () => {
    render(<Register {...defaultProps} />);
    const registerButton = screen.getByRole("button", { name: /register|sign up/i });
    expect(registerButton).toBeInTheDocument();
  });

  it("allows typing into each field", async () => {
    const user = userEvent.setup();
    render(<Register {...defaultProps} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);

    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("shows validation error when email is empty", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    // Fill only Password
    await user.type(screen.getByLabelText(/^password$/i), "password123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error when password is empty", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    // Fill only Email
    await user.type(screen.getByLabelText(/email/i), "john@example.com");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid email format", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "invalid-email");
    await user.type(screen.getByLabelText(/^password$/i), "password123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(screen.getByText(/invalid email|enter a valid email/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with { email, password } when form is valid", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: "john@example.com",
      password: "password123",
    });
  });

  it("does not call onSubmit when validation fails", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    // Try to submit empty form
    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
