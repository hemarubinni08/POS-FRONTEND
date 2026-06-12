// src/layouts/Sidebar.jsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../api/axios';
import { FiChevronRight } from 'react-icons/fi';
import { getIconForNode } from '../utils/iconMapping';

const Sidebar = ({ isCollapsed = false }) => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        console.log("fetchNodes");
        const response = await api.post('/api/node/list', {
          page: 0,
          sizePerPage: 100,
          sortDirection: 'ASC',
          sortField: 'identifier'
        });
        
        // Handle different response structures
        const nodeData = Array.isArray(response.data) 
          ? response.data 
          : response.data.content || [];
          
        console.log('Loaded nodes:', nodeData); // Debug log
        setNodes(nodeData);
        setError(null);
      } catch (err) {
        console.error("Could not load navigation nodes:", err);
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNodes();
  }, []);

  // Debug: Log collapse state
  console.log('Sidebar isCollapsed:', isCollapsed);

  return (
    <aside 
      className={`flex flex-col text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #667eea, #764ba2)',
        flexShrink: 0
      }}
    >
      {/* Header */}
      <div className={`px-4 py-5 border-b border-white/20 flex items-center ${
        isCollapsed ? 'justify-center' : 'justify-start'
      }`}>
        {isCollapsed ? (
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">
            POS
          </div>
        ) : (
          <h5 className="font-bold text-lg">POS System</h5>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="flex flex-col gap-1 px-3">
          {loading ? (
            <li className="text-center text-sm opacity-75 mt-8">
              <div className="animate-pulse">Loading...</div>
            </li>
          ) : error ? (
            <li className="text-center text-xs text-red-200 bg-red-500/20 rounded-lg p-3 mt-4">
              {error}
            </li>
          ) : nodes.length === 0 ? (
            <li className="text-center text-sm opacity-50 mt-8">
              No menu items
            </li>
          ) : (
            nodes.map((node) => {
              const IconComponent = getIconForNode(node.identifier);
              const navPath = `/layout${node.path || `/${node.identifier.toLowerCase()}`}`;
              
              return (
                <li key={node.identifier || node.id}>
                  <NavLink 
                    to={navPath}
                    className={({ isActive }) => 
                      `flex items-center rounded-lg transition-all duration-200 group
                      ${isCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'}
                      ${isActive 
                        ? 'bg-white/25 shadow-lg' 
                        : 'hover:bg-white/10 hover:shadow-md'
                      }`
                    }
                    title={isCollapsed ? node.identifier : undefined}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <IconComponent 
                        size={20} 
                        className="transition-transform group-hover:scale-110" 
                      />
                    </div>
                    
                    {/* Text & Arrow (hidden when collapsed) */}
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium whitespace-nowrap">
                          {node.identifier}
                        </span>
                        <FiChevronRight 
                          size={14} 
                          className="opacity-50 transition-transform group-hover:translate-x-1" 
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;