import { useState, useEffect } from "react";

function useProducts() {
  // Store products fetched from JSON Server
  const [products, setProducts] = useState([]);

  // Track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products when the component using this hook mounts
  useEffect(() => {
    fetch("http://localhost:6001/products")
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

  // Return the data and state setters to the component
  return {
    products,
    setProducts,
    loading,
    error,
    setError,
  };
}

export default useProducts;
