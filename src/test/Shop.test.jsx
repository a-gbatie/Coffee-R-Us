import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Shop from "../pages/Shop";
import useProducts from "../hooks/useProducts";

// Replace the real hook with a mock during testing
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
    image: "/images/iced_coffee.jpg",
  },
  {
    id: "2",
    name: "Matcha Latte",
    description: "Creamy green tea latte",
    origin: "Japan",
    price: 6,
    image: "/images/matchalatte.jpg",
  },
];

describe("Shop", () => {
  test("filters products based on search input", async () => {
    // Provide sample products instead of fetching from JSON Server
    useProducts.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<Shop />);

    // Both products should appear initially
    expect(screen.getByText("Iced Coffee")).toBeInTheDocument();
    expect(screen.getByText("Matcha Latte")).toBeInTheDocument();

    // Simulate typing into the search bar
    const user = userEvent.setup();
    const searchInput = screen.getByRole("searchbox");

    await user.type(searchInput, "matcha");

    // Only the matching product should remain
    expect(screen.getByText("Matcha Latte")).toBeInTheDocument();
    expect(screen.queryByText("Iced Coffee")).not.toBeInTheDocument();
  });
});