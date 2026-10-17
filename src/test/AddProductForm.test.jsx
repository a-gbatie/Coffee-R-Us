import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import AddProductForm from "../components/AddProductForm";

describe("AddProductForm", () => {
  test("submits the entered product information", async () => {
    const user = userEvent.setup();

    // Mock function to track form submission
    const mockAddProduct = vi.fn();

    render(<AddProductForm onAddProduct={mockAddProduct} />);

    // Enter the new product details
    await user.type(screen.getByPlaceholderText("Product"), "Caramel Latte");

    await user.type(
      screen.getByPlaceholderText("Description"),
      "Sweet espresso with caramel",
    );
    await user.type(screen.getByPlaceholderText("Origin"), "Colombia");
    await user.type(screen.getByPlaceholderText("Price"), "7");
    await user.type(
      screen.getByPlaceholderText("Image URL or path"),
      "/images/coffeelatte.jpg",
    );

    // Submit the form
    await user.click(screen.getByRole("button", { name: /add product/i }));

    expect(mockAddProduct).toHaveBeenCalledOnce();
  });
});
