import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, username, onLogout }) => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/node/getAll", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setNodes(data || []);
    } catch (err) {
      console.error("Node fetch error:", err);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 antialiased selection:bg-blue-100">
      
      {/* SIDEBAR */}
      <Sidebar nodes={nodes} username={username} onLogout={onLogout} />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header username={username} />

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;