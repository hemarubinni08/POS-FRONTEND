import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "60px",
      background: "linear-gradient(135deg, #363955 0%, #54668E 100%)",
      display: "flex", alignItems: "center",
      padding: "0 28px", zIndex: 200,
      boxShadow: "0 2px 12px rgba(54,57,85,0.35)",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{
        width: "100%", display: "flex",
        alignItems: "center", justifyContent: "space-between",
      }}>

        {/* LEFT — brand */}
        <Link to="/home" style={{
          display: "flex", alignItems: "center",
          gap: "10px", textDecoration: "none",
        }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "8px",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "17px",
          }}>🛒</div>
          <div>
            <div style={{
              fontSize: "16px", fontWeight: "700",
              color: "#fff", letterSpacing: "0.3px", lineHeight: 1.1,
            }}>RetailPOS</div>
            <div style={{
              fontSize: "9px", color: "rgba(135,158,198,0.85)",
              letterSpacing: "1.5px", textTransform: "uppercase",
            }}>Management System</div>
          </div>
        </Link>

        {/* RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isLoggedIn ? (
            <Link to="/profile" style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "6px 14px", borderRadius: "6px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              fontSize: "13px", fontWeight: "500",
              color: "rgba(232,232,232,0.9)", textDecoration: "none",
            }}>
              <span style={{
                width: "22px", height: "22px", borderRadius: "50%",
                background: "rgba(135,158,198,0.3)",
                display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "11px",
              }}>👤</span>
              My Account
            </Link>
          ) : (
            <>
              <Link to="/" style={{
                padding: "6px 14px", borderRadius: "6px",
                fontSize: "13px", color: "rgba(232,232,232,0.85)",
                textDecoration: "none",
              }}>
                Login
              </Link>
              <Link to="/register" style={{
                padding: "6px 16px", borderRadius: "6px",
                backgroundColor: "#879EC6", color: "#fff",
                fontSize: "13px", fontWeight: "700",
                textDecoration: "none",
              }}>
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}