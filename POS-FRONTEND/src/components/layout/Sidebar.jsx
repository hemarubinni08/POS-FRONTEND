import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState([]);

  // Icon mapping based on identifier
  const iconMap = {
    dashboard: <LayoutDashboard size={20} />,
    users: <Users size={20} />,
    products: <Package size={20} />,
    settings: <Settings size={20} />,
  };

  // Fetch nodes from backend
  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/node/getnodesforroles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Sidebar Nodes:", response.data);

      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching sidebar nodes:", error);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-black text-white flex flex-col border-r border-gray-800 transition-all duration-300 ${
        sidebarOpen ? "w-[260px]" : "w-[80px]"
      }`}
    >
      {/* Header */}
      <div className="h-[75px] flex items-center justify-center border-b border-gray-800 shrink-0">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold">Dashboard</h1>
        ) : (
          <LayoutDashboard size={24} />
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {menu.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path || "/")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-white text-black"
                : "bg-[#1a1a1a] hover:bg-white hover:text-black"
            }`}
          >
            {/* Icon */}
            {iconMap[item.identifier?.toLowerCase()] || (
              <LayoutDashboard size={20} />
            )}

            {/* Node Name */}
            {sidebarOpen && (
              <span className="text-sm font-medium capitalize">
                {item.identifier?.replaceAll("_", " ")}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          <LogOut size={18} />

          {sidebarOpen && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;