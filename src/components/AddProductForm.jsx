import { useState } from "react";
import "../styles/ProductForm.css";

function AddProductForm({ onAddProduct }) {
  // Store the values entered into the form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    origin: "",
    price: "",
    image: "",
  });

  // Update the matching property whenever an input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Send the completed form data to the parent component
  function handleSubmit(e) {
    e.preventDefault();

    onAddProduct({
      ...formData,
      price: Number(formData.price),
    });

    // Clear the form after submission
    setFormData({
      name: "",
      description: "",
      origin: "",
      price: "",
      image: "",
    });
  }

  return (
    <form  className="product-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="origin"
        placeholder="Origin"
        value={formData.origin}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        min="0"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL or path"
        value={formData.image}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
