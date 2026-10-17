import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import AdminPortal from "../pages/AdminPortal";
import useProducts from "../hooks/useProducts";

vi.mock("../hooks/useProducts", () => ({
  default: vi.fn(),
}));

const mockProducts = [
  {
    id: "1",
    name: "Iced Coffee",
    description: "Refreshing cold coffee",
    origin: "Colombia",
    price: 5,
    image: "/images/icedcoffee.jpg",
  },
];

describe("AdminPortal", () => {
  beforeEach(() => {
    // Give the Admin Portal a sample product
    useProducts.mockReturnValue({
      products: mockProducts,
      setProducts: vi.fn(),
      loading: false,
      error: null,
      setError: vi.fn(),
    });

    // Replace real network requests with a mock
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      }),
    );
  });

  test("sends a DELETE request for the selected product", async () => {
    const user = userEvent.setup();

    render(<AdminPortal />);

    // Click the Delete button in the product row
    await user.click(screen.getByRole("button", { name: "X" }));

    // Verify that the correct product was targeted
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:6001/products/1",
      expect.objectContaining({
        method: "DELETE",
      }),
    );
  });

  test("opens the edit form with the selected product information", async () => {
    const user = userEvent.setup();

    render(<AdminPortal />);

    // Click Edit for the sample product
    await user.click(screen.getByRole("button", { name: /^edit$/i }));

    // Verify that the edit form appears
    expect(
      screen.getByRole("heading", { name: /edit product/i }),
    ).toBeInTheDocument();

    // Verify the existing product information is prefilled
    expect(screen.getByDisplayValue("Iced Coffee")).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Refreshing cold coffee"),
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue("Colombia")).toBeInTheDocument();
  });
  test("sends a PUT request when saving an edited product", async () => {
    const user = userEvent.setup();

    render(<AdminPortal />);

    // Open the edit form
    await user.click(screen.getByRole("button", { name: /^edit$/i }));

    // Find the input containing the current product name
    const nameInput = screen.getByDisplayValue("Iced Coffee");

    // Replace the existing name
    await user.clear(nameInput);
    await user.type(nameInput, "Caramel Iced Coffee");

    // Submit the edited product
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    // Verify that a PUT request was sent for product 1
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:6001/products/1",
      expect.objectContaining({
        method: "PUT",
      }),
    );

    // Verify that the updated name was included in the request
    const putCall = fetch.mock.calls.find(
      ([, options]) => options?.method === "PUT",
    );

    expect(JSON.parse(putCall[1].body)).toEqual(
      expect.objectContaining({
        name: "Caramel Iced Coffee",
      }),
    );
  });

  test("sends a POST request when adding a product", async () => {
    const user = userEvent.setup();

    render(<AdminPortal />);

    // Fill in the Add Product form
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

    // Submit the new product
    await user.click(screen.getByRole("button", { name: /add product/i }));

    // Find the POST request
    const postCall = fetch.mock.calls.find(
      ([, options]) => options?.method === "POST",
    );

    // Confirm the request was made
    expect(postCall).toBeDefined();

    // Confirm the correct API endpoint
    expect(postCall[0]).toBe("http://localhost:6001/products");

    // Check the submitted product data
    expect(JSON.parse(postCall[1].body)).toEqual(
      expect.objectContaining({
        name: "Caramel Latte",
        description: "Sweet espresso with caramel",
        origin: "Colombia",
        image: "/images/coffeelatte.jpg",
      }),
    );
  });
});
