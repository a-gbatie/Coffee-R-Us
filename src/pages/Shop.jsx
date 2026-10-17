import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.css";

function Shop() {
  // Fetch and manage products using our custom hook
  const { products, loading, error } = useProducts();

  // Keep search state separate because only Shop needs it
  const [search, setSearch] = useState("");

  // Filter products based on the search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="shop-page">
      <div className="shop-content">
        <h1>Shop Our Coffee</h1>
        <p>Browse our coffee selection and more!</p>

        {/* Search for products by name */}
        <input
          type="search"
          placeholder="Search for coffee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Show a message while fetching products */}
        {loading && <p>Loading products...</p>}

        {/* Show an error if the request fails */}
        {error && <p>{error}</p>}

        {/* Display the filtered products */}
        {!loading && !error && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {filteredProducts.length === 0 && <p>No coffee products found.</p>}
          </div>
        )}
      </div>
    </main>
  );
}

export default Shop;
