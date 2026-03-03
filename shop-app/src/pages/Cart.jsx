import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Navbar */}
      <div style={{
        background: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        padding: "0 40px",
        height: "62px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}>
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#111111", letterSpacing: "-0.4px" }}>
          🛍 MyStore
        </h1>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#555555",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          ← Back to Shop
        </Link>
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "32px 24px" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: "26px", fontWeight: "700", color: "#111111" }}>Your Cart</h2>
        <p style={{ margin: "0 0 28px", color: "#888888", fontSize: "14px" }}>
          {cart.length === 0 ? "No items yet" : `${cart.length} item${cart.length > 1 ? "s" : ""} in your cart`}
        </p>

        {cart.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "80px 0",
            background: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
            color: "#aaaaaa",
          }}>
            <p style={{ fontSize: "18px", fontWeight: "500", margin: "0 0 8px" }}>Your cart is empty</p>
            <p style={{ fontSize: "14px", margin: "0 0 20px" }}>Add some products to get started</p>
            <Link to="/" style={{
              display: "inline-block",
              textDecoration: "none",
              background: "#222222",
              color: "#ffffff",
              padding: "10px 22px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "13px",
            }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
              {cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    background: "#ffffff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    padding: "16px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      flexShrink: 0,
                      border: "1px solid #eeeeee",
                    }}
                  />

                  <div style={{ flexGrow: 1 }}>
                    <p style={{ margin: "0 0 4px", fontWeight: "600", fontSize: "15px", color: "#222222" }}>
                      {item.name}
                    </p>
                    <p style={{ margin: 0, fontSize: "13px", color: "#888888" }}>{item.category}</p>
                    <p style={{ margin: "4px 0 0", fontWeight: "700", fontSize: "15px", color: "#111111" }}>
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <label style={{ fontSize: "12px", color: "#888888", fontWeight: "500" }}>Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={e => dispatch({ type: "UPDATE_QUANTITY", id: item.id, qty: e.target.value })}
                        style={{
                          width: "60px",
                          padding: "6px 8px",
                          border: "1px solid #e0e0e0",
                          borderRadius: "6px",
                          fontSize: "14px",
                          color: "#333333",
                          background: "#f9f9f9",
                          outline: "none",
                          textAlign: "center",
                        }}
                      />
                    </div>

                    <p style={{ margin: 0, fontWeight: "700", fontSize: "15px", color: "#111111" }}>
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>

                    <button
                      onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                      style={{
                        background: "none",
                        border: "1px solid #cccccc",
                        color: "#888888",
                        borderRadius: "6px",
                        padding: "4px 10px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "#333333";
                        e.currentTarget.style.color = "#333333";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "#cccccc";
                        e.currentTarget.style.color = "#888888";
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{
              background: "#ffffff",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "700", color: "#222222" }}>Order Summary</h3>

              <div style={{ borderTop: "1px solid #eeeeee", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ fontSize: "18px", fontWeight: "700", color: "#111111" }}>Total</span>
                <span style={{ fontSize: "22px", fontWeight: "800", color: "#111111" }}>
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "13px",
                  background: "#222222",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "15px",
                  cursor: "pointer",
                  letterSpacing: "0.3px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#444444"}
                onMouseLeave={e => e.currentTarget.style.background = "#222222"}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;