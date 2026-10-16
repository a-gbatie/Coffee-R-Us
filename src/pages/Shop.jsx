import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Shop() {
  // Store the products fetched from JSON Server
  const [products, setProducts] = useState([]);

  // Store the user's search input
  const [search, setSearch] = useState("");

  // Track loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products when the Shop component mounts
  useEffect(() => {
    fetch("http://localhost:6001/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setError("Unable to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter products based on the search input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main>
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
    </main>
  );
}

export default Shop;
