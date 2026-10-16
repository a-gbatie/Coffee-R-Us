import "../styles/ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      {/* Display the product image using its URL from db.json */}
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Origin: {product.origin}</p>
      <p>Price: ${Number(product.price).toFixed(2)}</p>
    </div>
  );
}

export default ProductCard;