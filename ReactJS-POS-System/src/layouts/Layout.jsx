// src/layouts/Layout.jsx
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);

    const handlePopState = () => {
      window.history.pushState(null, null, window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          toggleSidebar={toggleSidebar} 
          isSidebarCollapsed={isSidebarCollapsed} 
        />
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;