import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  const navigate = useNavigate();

  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const name = localStorage.getItem("name") || "User";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          "http://localhost:8080/api/node/getNodesForRoles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Ensure nodes is an array
        if (Array.isArray(res.data)) {
          setNodes(res.data);
        } else if (res.data?.dtoList) {
          setNodes(res.data.dtoList);
        } else {
          setNodes([]);
        }
      } catch (err) {
        console.error("Error fetching nodes:", err);
        // Only logout if it's a 401 (unauthorized)
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          setNodes([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNodes();
  }, [navigate]);

  return (
    <div className="h-screen flex bg-slate-100">
      
      {/* SIDEBAR - Fixed positioning */}
      <Sidebar
        nodes={nodes}
        loading={loading}
        onLogout={handleLogout}
      />

      {/* RIGHT SIDE - Account for fixed sidebar */}
      <div className="flex-1 flex flex-col ml-64">

        {/* HEADER */}
        <Header name={name} />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet context={{ nodes, loading, name }} />
        </main>

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
};

export default Layout;