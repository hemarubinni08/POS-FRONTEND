import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import api from "./Api";
import "bootstrap-icons/font/bootstrap-icons.css";

const MainLayout = () => {
  const [nodes, setNodes] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await api.get("/node/getNodesForRoles");
      setNodes(response.data || []);
    } catch (error) {
      console.error("Error fetching nodes:", error);
    }
  };

  const toggleSidebar = () => setCollapsed(!collapsed);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getIcon = (name) => {
    const map = {
      PRODUCT: "bi-box",
      INVENTORY: "bi-stack",
      CUSTOMER: "bi-people",
      WAREHOUSE: "bi-building",
      REPORT: "bi-bar-chart",
      USER: "bi-person",
    };
    return map[name?.toUpperCase()] || "bi-grid-fill";
  };

  const SIDEBAR_WIDTH = collapsed ? 64 : 256;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f3f4f6",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          background: "linear-gradient(to right, #0f766e, #134e4a)",
          color: "white",
          flexShrink: 0,
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: 20,
            marginRight: 12,
            cursor: "pointer",
          }}
        >
          <i className="bi bi-list"></i>
        </button>

        <span style={{ fontWeight: 600, fontSize: 18 }}>
          <i className="bi bi-cash-coin" style={{ marginRight: 8 }}></i>
          POS SYSTEM
        </span>

        <button
          onClick={logout}
          style={{
            marginLeft: "auto",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </nav>

      {/* BODY */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <div
          style={{
            width: SIDEBAR_WIDTH,
            minWidth: SIDEBAR_WIDTH,
            backgroundColor: "#030712",
            color: "#e5e7eb",
            padding: 16,
            overflowY: "auto",
            transition: "0.3s",
          }}
        >
          {!collapsed && (
            <div
              style={{
                fontSize: 11,
                color: "#9ca3af",
                marginBottom: 16,
              }}
            >
              MODULES
            </div>
          )}

          {nodes.map((node, index) => {
            const isActive = location.pathname === node.path;

            return (
              <Link
                key={index}
                to={node.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px",
                  marginBottom: 8,
                  borderRadius: 8,
                  color: isActive ? "white" : "#e5e7eb",
                  backgroundColor: isActive ? "#0f766e" : "transparent",
                  textDecoration: "none",
                }}
              >
                <i className={`bi ${getIcon(node.identifier)}`}></i>
                {!collapsed && <span>{node.identifier}</span>}
              </Link>
            );
          })}
        </div>

        {/* CONTENT */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;