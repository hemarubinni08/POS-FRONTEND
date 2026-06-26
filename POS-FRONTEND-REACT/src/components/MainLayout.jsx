import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../components/Dashboard1.css";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= MENU API =================
  const fetchMenu = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/node/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMenu(res.data || []);
    } catch (err) {
      console.error("MENU ERROR:", err);
      setMenu([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="wrapper">
      
      {/* SIDEBAR */}
      <aside className="sidebar">

        {/* TOP LOGO */}
        <div>
          <div className="logoSection">
            <div className="logoCircle">P</div>
            <div>
              <h2 className="brand">UST POS</h2>
              <p className="brandSub">Management Panel</p>
            </div>
          </div>

          {/* MENU */}
          <div className="menuContainer">
            <p className="menuLabel">MAIN MENU</p>

            {loading ? (
              <div className="loadingBox">Loading...</div>
            ) : menu.length === 0 ? (
              <div className="loadingBox">No menu available</div>
            ) : (
              <ul className="menuList">
                {menu.map((item, index) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <li key={index}>
                      <button
                        className={`menuItem ${isActive ? "active" : ""}`}
                        onClick={() => navigate(item.path)}
                      >
                        {item.identifier}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* LOGOUT */}
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;