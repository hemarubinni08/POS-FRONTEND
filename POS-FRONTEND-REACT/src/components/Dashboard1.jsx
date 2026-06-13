import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Dashboard1.css";
 
const Dashboard1 = () => {
  const navigate = useNavigate();
 
  const [user, setUser] = useState({
    name: "Admin",
    role: "Administrator",
  });

  // ================= USER API =================
  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
 
      if (!token || !username) {
        navigate("/login");
        return;
      }
 
      const res = await axios.get(
        `http://localhost:8080/api/user/get?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      setUser({
        name: res.data?.name || username,
        role: res.data?.role || "Administrator",
      });
 
    } catch (err) {
      console.error("USER FETCH ERROR:", err);
 
      const username = localStorage.getItem("username");
 
      setUser({
        name: username || "Admin",
        role: "Administrator",
      });
    }
  }, [navigate]);
 
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
 
  // ================= UI =================
  return (
    <div>
 
      {/* TOPBAR */}
      <div className="topbar">
 
        <div>
          <h1 className="pageTitle">Dashboard</h1>
          <p className="pageSubtitle">Welcome back 👋</p>
        </div>
 
        {/* USER PROFILE */}
        <div
          className="profile"
          onClick={() => navigate("/user/profile")}
        >
          <div className="avatar">
            {user.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
 
          <div>
            <h4 className="profileName">{user.name}</h4>
            <p className="profileRole">{user.role}</p>
          </div>
        </div>
 
      </div>
 
      {/* MAIN */}
      <div className="mainCard">
        <div>
          <h2 className="mainTitle">
            Manage your POS business
          </h2>
 
          <p className="mainText">
            Track sales, orders and users in one place.
          </p>
        </div>
      </div>
 
    </div>
  );
};
 
export default Dashboard1;