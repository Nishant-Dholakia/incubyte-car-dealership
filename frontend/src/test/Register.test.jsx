import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
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
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it("renders Register button", () => {
    render(<Register {...defaultProps} />);
    const registerButton = screen.getByRole("button", { name: /register|sign up/i });
    expect(registerButton).toBeInTheDocument();
  });

  it("allows typing into each field", async () => {
    const user = userEvent.setup();
    render(<Register {...defaultProps} />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });

  it("shows validation error when name is empty", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    // Fill all fields except Name
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error when email is empty", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    // Fill all fields except Email
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error when password is empty", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    // Fill all fields except Password
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error when confirm password is empty", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    // Fill all fields except Confirm Password
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(screen.getByText(/confirm password is required|passwords must match/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid email format", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "invalid-email");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(screen.getByText(/invalid email|enter a valid email/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error when passwords do not match", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "different123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(screen.getByText(/passwords do not match|passwords must match/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with { name, email, password } when form is valid", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<Register onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.type(screen.getByLabelText(/confirm password/i), "password123");

    await user.click(screen.getByRole("button", { name: /register|sign up/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "John Doe",
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
