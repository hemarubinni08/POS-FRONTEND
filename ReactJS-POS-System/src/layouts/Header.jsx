// src/layouts/Header.jsx
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiLogOut } from 'react-icons/fi';

const Header = ({ toggleSidebar, isSidebarCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      {/* Left: Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle Sidebar"
      >
        <FiMenu size={24} className="text-gray-700" />
      </button>

      {/* Center: Project Title */}
      <h1 className="text-xl font-bold text-gray-800">
        POS System Dashboard
      </h1>

      {/* Right: Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
      >
        <FiLogOut size={18} />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Header;