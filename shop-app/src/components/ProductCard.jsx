import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useCart();

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "190px",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
        <span style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "#222222",
          color: "#ffffff",
          fontSize: "10px",
          fontWeight: "600",
          padding: "3px 9px",
          borderRadius: "20px",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
        }}>
          {product.category}
        </span>
      </div>

      <div style={{
        padding: "16px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
        <h3 style={{
          margin: 0,
          fontSize: "15px",
          fontWeight: "600",
          color: "#222222",
          lineHeight: "1.3",
        }}>
          {product.name}
        </h3>

        <p style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: "700",
          color: "#111111",
        }}>
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <button
          onClick={() => dispatch({ type: "ADD_TO_CART", product })}
          style={{
            marginTop: "8px",
            padding: "10px",
            background: "#222222",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px",
            letterSpacing: "0.4px",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#444444"}
          onMouseLeave={e => e.currentTarget.style.background = "#222222"}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;