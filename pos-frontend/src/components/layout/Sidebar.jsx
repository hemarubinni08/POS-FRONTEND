import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../../api/api";

const Sidebar = ({ collapsed }) => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const res = await api.get("/api/node/getNodesForRoles");
      const data = res.data.data || res.data;
      setNodes(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`fixed top-14 left-0 h-[calc(100vh-56px)] 
      bg-gradient-to-b from-blue-1000 via-blue-950 to-indigo-950
      border-r border-blue-800 p-3 transition-all 
      ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="text-gray-300 text-xs mb-3 uppercase">
        Modules
      </div>

      {nodes.length === 0 ? (
        <div className="text-gray-400 text-sm">No modules</div>
      ) : (
        nodes.map((node, index) => (
          <NavLink
            key={index}
            to={node.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm transition
               ${
                 isActive
                   ? "bg-white/20 text-white"
                   : "text-gray-300 hover:bg-white/10 hover:text-white"
               }`
            }
          >
            <span>📦</span>

            {!collapsed && <span>{node.identifier}</span>}
          </NavLink>
        ))
      )}
    </div>
  );
};

export default Sidebar;