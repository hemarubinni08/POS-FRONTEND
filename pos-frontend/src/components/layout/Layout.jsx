import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen">

      {/* HEADER */}
      <Header toggleSidebar={() => setCollapsed(!collapsed)} />

      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} />

      {/* ✅ MAIN CONTENT AREA */}
      <div
        
className={`pt-14 transition-all min-h-screen
bg-gradient-to-br from-white to-gray-100
${collapsed ? "ml-16" : "ml-64"}`}

      >
        {/* ✅ GLASS BACKGROUND AREA (ONLY HERE) */}
        <div className="min-h-[calc(100vh-56px)] p-6 
          bg-white/10 backdrop-blur-lg">

          {/* ✅ CONTENT CARD */}
          <div className="bg-white/20 backdrop-blur-lg 
            border border-white/20 rounded-2xl 
            shadow-xl p-6 text-gray">

            {children}

          </div>
        </div>

        {/* ✅ FOOTER (unaffected) */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
