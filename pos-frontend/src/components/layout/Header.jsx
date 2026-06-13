import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ FIX

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ FIX

  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-14 
      bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 
      flex items-center px-4 z-50 shadow-md">

      {/* Sidebar Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleSidebar();
        }}
        className="text-white text-xl mr-4"
      >
        ☰
      </button>

      {/* Logo */}
      <div className="text-white font-semibold text-lg">
        POS SYSTEM
      </div>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-3 relative">

        <span className="text-gray-200 text-sm">{username}</span>

        {/* Avatar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
          className="w-8 h-8 flex items-center justify-center 
          bg-blue-600 text-white rounded-full cursor-pointer"
        >
          {username.charAt(0).toUpperCase()}
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div
            className="absolute right-0 top-12 w-40 
            bg-gradient-to-b from-blue-950 via-blue-900 to-indigo-900
            border border-blue-800 rounded-lg shadow-lg text-white"
          >

            {/* ✅ PROFILE */}
            <div
              onClick={() => {
                setDropdownOpen(false);
                navigate("/profile"); // ✅ NOW WORKS
              }}
              className="px-4 py-2 hover:bg-white/10 cursor-pointer"
            >
              👤 Profile
            </div>

            <div className="border-t border-blue-800"></div>

            {/* ✅ LOGOUT */}
            <div
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-white/10 cursor-pointer text-red-300"
            >
              🚪 Logout
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Header;