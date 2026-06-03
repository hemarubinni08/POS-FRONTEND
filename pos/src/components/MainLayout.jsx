import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../components/MainLayout.css";
import { getListItems } from "./api";

const MainLayout = () => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= MENU API =================
  const fetchMenu = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await getListItems("node");

      setMenu(res || []);
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

        <div>
          <div className="logoSection"
            onClick ={() => navigate("/dashboard1")}
            style={{cursor:"pointer"}}
            >
            <div className="logoCircle">P</div>
            <div>
              <h2 className="brand">POS System</h2>
              <p className="brandSub">Management Panel</p>
            </div>
          </div>

          <div className="menuContainer">
            <p className="menuLabel">MAIN MENU</p>

            {loading ? (
              <div className="loadingBox">Loading...</div>
            ) : menu.length === 0 ? (
              <div className="loadingBox">No menu available</div>
            ) : (
              <ul className="menuList">
                {menu.map((item, index) => (
                  <li key={index}>
                    <button
                      className="menuItem"
                      onClick={() => navigate(item.path)}
                    >
                       {item.identifier}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

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