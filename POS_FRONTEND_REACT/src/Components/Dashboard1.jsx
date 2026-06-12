import React, { useEffect, useState } from "react";
import api from "./Api";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard1 = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const response = await api.get("/node/getNodesForRoles");
      setNodes(response.data || []);
    } catch (error) {
      console.error("Error fetching nodes:", error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      
      {/* DASHBOARD HEADER CARD */}
      <div
        style={{
          background: "linear-gradient(to right, #0f766e, #134e4a)",
          color: "white",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <h4 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
          Welcome to POS Dashboard 👋
        </h4>

        <p style={{ fontSize: 14, marginTop: 8, opacity: 0.9 }}>
          Manage your products, customers, inventory and billing from one place.
        </p>
      </div>

      {/* OPTIONAL QUICK STATS SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        {nodes.slice(0, 4).map((node, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: 16,
              borderRadius: 10,
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              borderLeft: "4px solid #0f766e",
            }}
          >
            <div style={{ fontSize: 14, color: "#666" }}>Module</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>
              {node.identifier}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard1;