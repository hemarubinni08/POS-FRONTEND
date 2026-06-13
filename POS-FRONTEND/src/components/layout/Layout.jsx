import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">

      {/* Sidebar (fixed position handled inside Sidebar.jsx) */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Right side content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300
        ${sidebarOpen ? "ml-[260px]" : "ml-[80px]"}`}
      >

        {/* Header (fixed height, no scroll) */}
        <div className="shrink-0">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* ✅ ONLY THIS PART SCROLLS */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Footer (optional fixed) */}
        <div className="shrink-0">
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default Layout;
