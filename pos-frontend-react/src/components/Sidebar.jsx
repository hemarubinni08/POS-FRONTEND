import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

const SIDEBAR_WIDTH = "220px";

const styles = {
  sidebar: {
    position: "fixed",
    top: "60px",
    left: 0,
    width: SIDEBAR_WIDTH,
    height: "calc(100vh - 60px)",
    backgroundColor: "#f8faf8",
    borderRight: "1px solid #d8e8d8",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', sans-serif",
    zIndex: 100,
    overflowY: "auto",
  },

  header: {
    padding: "18px 16px 10px",
    fontSize: "11px",
    fontWeight: "700",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "1px solid #e8ece8",
    marginBottom: "8px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    padding: "0 10px",
    gap: "2px",
    flex: 1,
  },

  item: {
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "0.2s ease",
  },

  itemActive: {
    backgroundColor: "#e8ecff",
    color: "#3b4a8a",
    fontWeight: "600",
  },

  itemHover: {
    backgroundColor: "#eef1ff",
    color: "#3b4a8a",
  },

  logoutBtn: {
    margin: "10px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #f1b5b5",
    backgroundColor: "#fff5f5",
    color: "#c0392b",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s ease",
  },

  footer: {
    padding: "14px 16px",
    borderTop: "1px solid #e8ece8",
    fontSize: "11px",
    color: "#aaa",
  },
};

export default function Sidebar() {
  const [nodes, setNodes] = useState([]);
  const [hovered, setHovered] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchNodes() {
      try {
        const res = await api.get("/node/getNodesForRoles");
        setNodes(res.data || []);
      } catch (err) {
        console.error("Failed to fetch nodes:", err);
      }
    }

    fetchNodes();
  }, []);

  // Don't show sidebar on login or register pages
  if (
    location.pathname === "/" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>Navigation</div>

      <div style={styles.list}>
        {/* Hardcoded Home item */}
        <div
          style={{
            ...styles.item,
            ...(location.pathname === "/home"
              ? styles.itemActive
              : {}),
            ...(hovered === "home"
              ? styles.itemHover
              : {}),
          }}
          onMouseEnter={() => setHovered("home")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate("/home")}
        >
           Home
        </div>

        {/* Dynamic nodes from API */}
        {nodes.map((node, index) => {
          const isActive = location.pathname === node.path;
          const isHovered = hovered === index;

          return (
            <div
              key={index}
              style={{
                ...styles.item,
                ...(isActive ? styles.itemActive : {}),
                ...(isHovered ? styles.itemHover : {}),
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(node.path)}
            >
              {node.identifier}
            </div>
          );
        })}
      </div>

      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>

      <div style={styles.footer}>RetailPOS © 2025</div>
    </aside>
  );
}

// Export the width so other pages can use it for their left margin
export { SIDEBAR_WIDTH };