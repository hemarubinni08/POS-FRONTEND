import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ nodes = [], username, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-60 min-w-[240px] bg-white text-slate-800 flex flex-col h-screen border-r border-slate-200">
      
      {/* LOGO */}
      <div className="p-5 text-base font-bold border-b border-slate-100 flex items-center gap-2.5 text-slate-900 tracking-tight">
        <span className="text-lg">🛒</span> RetailPOS
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 overflow-y-auto flex flex-col gap-1">
        {nodes.map((node) => {
          const isActive = location.pathname === node.path;
          return (
            <button
              key={node.id}
              onClick={() => navigate(node.path)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150 text-left ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className={isActive ? "opacity-100" : "opacity-70"}>📦</span>
              {node.identifier}
            </button>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-100 flex flex-col gap-3 bg-slate-50">
        <div className="text-xs text-slate-500 flex items-center gap-2 px-1">
          <span className="text-base">👤</span>
          <span className="text-slate-700 font-medium truncate">
            {username || "User"}
          </span>
        </div>
        <button
          onClick={onLogout}
          className="w-full bg-white text-red-600 border border-red-100 rounded-md py-2 px-3 font-medium text-xs shadow-sm transition-all duration-150 hover:bg-red-50 hover:border-red-300"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;