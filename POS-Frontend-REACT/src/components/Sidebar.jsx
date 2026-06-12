import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import * as Icons from "lucide-react";
import { Menu, PanelLeftClose } from "lucide-react";
import ustLogo from "../assets/logo/UST_Logo_Black.png";

const Sidebar = ({ nodes, loading, onLogout }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  /* ✅ ICON MAP */
  const iconMap = {
    Checkout: "ShoppingCart",
    Registers: "Monitor",
    Transactions: "Receipt",
    Customers: "Users",
    Products: "Package",
    Stocks: "PackagePlus",
    Prices: "Tags",
    Categories: "FolderTree",
    Brands: "Award",
    Models: "Sliders",
    Units: "Scale",
    Warehouses: "Warehouse",
    Racks: "Columns4",
    Shelves: "Rows4",
    Nodes: "Network",
    Roles: "ShieldAlert",
    Users: "Users",
    test: "Terminal",
  };

  const getIcon = (name) => {
    const key = Object.keys(iconMap).find(
      (k) => k.toLowerCase() === name?.toLowerCase()
    );
    return Icons[iconMap[key]] || Icons.Circle;
  };

  /**
   * FIX: Properly format the path from database
   * Database paths: "/user/list", "node/list", "/product/list", etc.
   * Need to ensure consistent URL format
   */
  const formatPath = (dbPath) => {
    if (!dbPath) return "";
    // Remove leading/trailing slashes for consistent routing
    return dbPath.replace(/^\/|\/$/g, "");
  };

  /**
   * FIX: Check if route is active by comparing formatted paths
   */
  const isActive = (dbPath) => {
    const formattedPath = formatPath(dbPath);
    const currentPath = location.pathname.replace(/^\/|\/$/g, "");
    return currentPath === formattedPath;
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-all duration-300 fixed h-screen left-0 top-0 z-40`}
    >
      {/* ✅ TOP HEADER (LOGO ALWAYS TOP) */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
        
        {/* LOGO */}
        <div className={`flex items-center ${collapsed ? "justify-center w-full" : "gap-3"}`}>
          <img
            src={ustLogo}
            alt="UST"
            className="h-8 w-8 object-contain"
          />

          {!collapsed && (
            <div className="leading-tight">
              <p className="text-white font-bold text-sm">
                UST
              </p>
              <p className="text-xs text-slate-400">
                Retail POS
              </p>
            </div>
          )}
        </div>

        {/* TOGGLE */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
            title="Collapse sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      {/* ✅ COLLAPSED TOGGLE BUTTON */}
      {collapsed && (
        <div className="flex justify-center py-3 border-b border-slate-800 flex-shrink-0">
          <button
            onClick={() => setCollapsed(false)}
            className="p-2 hover:bg-slate-800 rounded transition-colors"
            title="Expand sidebar"
          >
            <Menu size={18} />
          </button>
        </div>
      )}

      {/* ✅ NAVIGATION */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {!collapsed && (
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            Navigation
          </p>
        )}

        {loading ? (
          <div className="animate-pulse space-y-2 px-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-slate-800 rounded w-3/4" />
            ))}
          </div>
        ) : nodes && nodes.length > 0 ? (
          <nav className="space-y-1">
            {nodes.map((node) => {
              const IconComponent = getIcon(node.identifier);
              const formattedPath = formatPath(node.path);

              return (
                <Link
                  key={node.id || node.path}
                  to={`/${formattedPath}`}
                  className={`relative group flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } px-3 py-2.5 text-sm rounded-md transition-colors ${
                    isActive(node.path)
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                  title={collapsed ? node.identifier : undefined}
                >
                  <IconComponent size={18} className="flex-shrink-0" />

                  {/* ✅ LABEL */}
                  {!collapsed && (
                    <span className="flex-1">{node.identifier}</span>
                  )}

                  {/* ✅ TOOLTIP (ONLY WHEN COLLAPSED) */}
                  {collapsed && (
                    <span className="absolute left-14 whitespace-nowrap bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {node.identifier}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        ) : (
          <div className="px-3 py-4 text-xs text-slate-500 italic">
            No modules assigned
          </div>
        )}
      </div>

      {/* ✅ FOOTER */}
      <div className="p-3 border-t border-slate-800 flex-shrink-0">
        <button
          onClick={onLogout}
          className={`w-full flex items-center justify-center ${
            collapsed ? "" : "gap-2"
          } px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white rounded transition-colors`}
        >
          <Icons.LogOut size={16} className="flex-shrink-0" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;