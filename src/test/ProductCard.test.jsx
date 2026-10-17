import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ProductCard from "../components/ProductCard";

// Sample product data used only for testing
const mockProduct = {
  id: "1",
  name: "Vanilla Bean",
  description: "Medium roast with a nutty flavor",
  origin: "Colombia",
  price: 10,
  image: "/images/vanilla_bean.jpg",
};

describe("ProductCard", () => {
  test("displays the product information correctly", () => {
    // Render ProductCard with our sample product
    render(<ProductCard product={mockProduct} />);

    // Check the product name
    expect(
      screen.getByRole("heading", { name: "Vanilla Bean" })
    ).toBeInTheDocument();

    // Check the description
    expect(
      screen.getByText("Medium roast with a nutty flavor")
    ).toBeInTheDocument();

    // Check the origin
    expect(screen.getByText(/Colombia/)).toBeInTheDocument();

    // Check the formatted price
    expect(screen.getByText(/\$10\.00/)).toBeInTheDocument();

    // Check the product image
    expect(
      screen.getByRole("img", { name: "Vanilla Bean" })
    ).toHaveAttribute("src", "/images/vanilla_bean.jpg");
  });
});