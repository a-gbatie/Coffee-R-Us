import { useState, useEffect } from "react";

function AdminPortal() {
  const productsURL = "http://localhost:6001/products";

  // Store products fetched from JSON Server
  const [products, setProducts] = useState([]);

  // Track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products when the Admin Portal loads
  useEffect(() => {
    fetch(productsURL)
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

  return (
    <main>
      <h1>Admin Portal</h1>
      <p>Manage your coffee products here.</p>

      {/* Display loading and error messages */}
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {/* Display existing products in a table */}
      {!loading && !error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Origin</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.origin}</td>
                <td>${Number(product.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default AdminPortal;