import { useState } from "react";
import { Link } from "react-router-dom";
import {products} from "../data/product";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { cart } = useCart();

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

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
          to="/cart"
          style={{
            textDecoration: "none",
            background: "#222222",
            color: "#ffffff",
            padding: "9px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "13px",
            letterSpacing: "0.3px",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#444444"}
          onMouseLeave={e => e.currentTarget.style.background = "#222222"}
        >
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Page heading */}
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ margin: "0 0 4px", fontSize: "26px", fontWeight: "700", color: "#111111" }}>All Products</h2>
          <p style={{ margin: 0, color: "#888888", fontSize: "14px" }}>{filtered.length} items found</p>
        </div>

        {/* Filters */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginBottom: "28px",
          flexWrap: "wrap",
          background: "#ffffff",
          padding: "16px",
          borderRadius: "10px",
          border: "1px solid #e0e0e0",
        }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "10px 14px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#333333",
              background: "#f9f9f9",
              outline: "none",
            }}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              padding: "10px 16px",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              fontSize: "14px",
              background: "#f9f9f9",
              color: "#333333",
              cursor: "pointer",
              outline: "none",
              minWidth: "150px",
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#aaaaaa" }}>
            <p style={{ fontSize: "18px", fontWeight: "500" }}>No products found</p>
            <p style={{ fontSize: "14px" }}>Try a different search or category</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: "22px",
          }}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;