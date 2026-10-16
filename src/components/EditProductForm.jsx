import { useState } from "react";

function EditProductForm({ product, onUpdateProduct, onCancel }) {
  // Start the form with the selected product's information
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    origin: product.origin,
    price: product.price,
    image: product.image,
  });

  // Update the matching field when the user types
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Send the updated product to AdminPortal
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateProduct({
      ...product,
      ...formData,
      price: Number(formData.price),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Product</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product name"
        required
      />

      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />

      <input
        type="text"
        name="origin"
        value={formData.origin}
        onChange={handleChange}
        placeholder="Origin"
        required
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        min="0"
        step="0.01"
        required
      />

      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL or path"
        required
      />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditProductForm;
