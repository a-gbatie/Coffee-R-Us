import { useState } from "react";
import useProducts from "../hooks/useProducts";
import AddProductForm from "../components/AddProductForm";
import EditProductForm from "../components/EditProductForm";
import "../styles/AdminPortal.css";

function AdminPortal() {
  const productsURL = "http://localhost:6001/products";

  // Store the product currently selected for editing
  const [editingProduct, setEditingProduct] = useState(null);

  // Use our custom hook to fetch and manage products
  const { products, setProducts, loading, error, setError } = useProducts();

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
    } catch {
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
    } catch {
      setError("Unable to delete product.");
    }
  }

  // Select a product to edit using the button's data-id
  function handleEditClick(e) {
    const id = e.currentTarget.dataset.id;

    const selectedProduct = products.find(
      (product) => String(product.id) === id,
    );

    setEditingProduct(selectedProduct);
  }

  // Save the updated product to JSON Server
  async function handleUpdateProduct(updatedProduct) {
    try {
      const res = await fetch(`${productsURL}/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      const savedProduct = await res.json();

      // Replace the old product with the updated one
      setProducts((previousProducts) =>
        previousProducts.map((product) =>
          product.id === savedProduct.id ? savedProduct : product,
        ),
      );

      // Close the edit form after saving
      setEditingProduct(null);
    } catch {
      setError("Unable to update product.");
    }
  }

  // Close the edit form without saving
  function handleCancelEdit() {
    setEditingProduct(null);
  }

  return (
    <main className="admin-page">
      <h1>Admin Portal</h1>
      <p>Manage your coffee products here.</p>

      {/* Display loading and error messages */}
      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <AddProductForm onAddProduct={handleAddProduct} />

      {/* Only show the edit form when a product is selected */}
      {editingProduct && (
        <EditProductForm
          key={editingProduct.id}
          product={editingProduct}
          onUpdateProduct={handleUpdateProduct}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Display existing products in a table */}
      {!loading && !error && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Origin</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.origin}</td>
                  <td>${Number(product.price).toFixed(2)}</td>

                  <td className="admin-actions">
                    {/*Edit selected producted */}
                    <button
                      type="button"
                      className="edit-button"
                      data-id={product.id}
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>

                    {/*Delete selected producted */}
                    <button
                      type="button"
                      className="delete-button"
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
        </div>
      )}
    </main>
  );
}

export default AdminPortal;
