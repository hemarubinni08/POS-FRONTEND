import React from "react";
import { Menu } from "lucide-react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="h-[75px] bg-white border-b flex items-center justify-between px-6">

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center"
      >
        <Menu size={20} />
      </button>

      <div className="text-sm text-gray-600">
        Logged in as <span className="font-bold text-black">Admin</span>
      </div>

    </header>
  );
};

export default Header;