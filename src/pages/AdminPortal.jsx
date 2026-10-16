import { useState, useEffect } from "react";
import AddProductForm from "../components/AddProductForm";

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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        return res.json();
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

  // Save a new product to JSON Server
  async function handleAddProduct(newProduct) {
    try {
      const res = await fetch(productsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      const savedProduct = await res.json();

      // Add the saved product to the existing products array
      setProducts((previousProducts) => [...previousProducts, savedProduct]);
    } catch (error) {
      setError("Unable to add product.");
    }
  }

  // Delete a product from JSON Server using its ID
  async function handleDeleteProduct(e) {
    // Get the product ID stored on the clicked button
    const id = e.currentTarget.dataset.id;

    try {
      const res = await fetch(`${productsURL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove the deleted product from React state
      setProducts((previousProducts) =>
        previousProducts.filter((product) => String(product.id) !== id),
      );
    } catch (error) {
      setError("Unable to delete product.");
    }
  }

  return (
    <main>
      <h1>Admin Portal</h1>
      <p>Manage your coffee products here.</p>

      {/* Display loading and error messages */}
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <AddProductForm onAddProduct={handleAddProduct} />

      {/* Display existing products in a table */}
      {!loading && !error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Origin</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.origin}</td>
                <td>${Number(product.price).toFixed(2)}</td>

                <td>
                  {/*Delete selected producted */}
                  <button
                    type="button"
                    data-id={product.id}
                    onClick={handleDeleteProduct}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default AdminPortal;
