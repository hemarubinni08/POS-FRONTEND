import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard1 = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';
  const role = localStorage.getItem('userRole') || 'Member';

  const sidebarLinks = useMemo(
    () => [
      { path: '#home', label: 'Home' },
      { path: '#profile', label: 'Profile' },
      { path: '#orders', label: 'Orders' },
      { path: '#analytics', label: 'Analytics' },
      { path: '#settings', label: 'Settings' }
    ],
    []
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <style>{`
        .dashboard-page {
          min-height: 100vh;
          display: flex;
          background: #f7f7fb;
          font-family: 'Poppins', sans-serif;
        }

        .dashboard-sidebar {
          width: 220px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: #2563eb;
          padding: 60px 0 20px;
          display: flex;
          flex-direction: column;
          box-shadow: 8px 0 20px rgba(59, 130, 246, 0.15);
          color: rgba(255, 255, 255, 0.95);
          z-index: 1;
        }

        .dashboard-sidebar h2 {
          margin: 0;
          margin-bottom: 24px;
          padding: 0 20px;
          font-size: 1.2rem;
          letter-spacing: 0.02em;
        }

        .dashboard-links {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 0 10px;
          overflow-y: auto;
        }

        .dashboard-link {
          color: rgba(255, 255, 255, 0.95);
          padding: 12px 18px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 500;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .dashboard-link:hover {
          background: rgba(255, 255, 255, 0.16);
          transform: translateX(3px);
        }

        .dashboard-logout {
          padding: 18px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.25);
          display: flex;
          justify-content: center;
        }

        .logout-button {
          width: 100%;
          border-radius: 20px;
          font-weight: 600;
          border: none;
          color: white;
          cursor: pointer;
          background: linear-gradient(135deg, #93c5fd, #3b82f6);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
          padding: 12px 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .logout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(37, 99, 235, 0.35);
        }

        .dashboard-content {
          margin-left: 220px;
          width: calc(100% - 220px);
          padding: 30px 32px;
        }

        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .dashboard-title {
          margin: 0;
          font-size: 2rem;
          color: #0f172a;
        }

        .dashboard-meta {
          color: #475569;
          font-size: 0.95rem;
          padding: 12px 18px;
          border-radius: 16px;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
        }

        .dashboard-card {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 18px;
          padding: 34px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(15, 23, 42, 0.04);
        }

        .dashboard-card h4 {
          margin-top: 0;
          font-size: 1.7rem;
          color: #1e293b;
        }

        .dashboard-card p {
          margin: 14px 0 0;
          color: #475569;
          line-height: 1.75;
          max-width: 760px;
        }
      `}</style>

      <aside className="dashboard-sidebar">
        <h2>Management</h2>
        <div className="dashboard-links">
          {sidebarLinks.map((link) => (
            <a key={link.label} className="dashboard-link" href={link.path}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="dashboard-logout">
          <button className="logout-button" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome to the dashboard</h1>
          <div className="dashboard-meta">
            Signed in as <strong>{username}</strong> • Role: <strong>{role}</strong>
          </div>
        </div>

        <div className="dashboard-card">
          <h4>Manage your application features from here</h4>
          <p>
            Use the sidebar to navigate through sections, review your current activity, and keep the application secure.
            This page reflects the same modern dashboard style as the example you provided.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard1;
