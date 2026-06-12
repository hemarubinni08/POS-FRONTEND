import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";

import Layout from "../components/Layout";

function Dashboard() {

  const [nodes, setNodes] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNodes();
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:8080/api/user/profile",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setUser(response.data);
  };

  const fetchNodes = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:8080/api/node/list",
      {
        page: 0,
        sizePerPage: 100,
        sortDirection: "ASC",
        sortField: "id"
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setNodes(response.data);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Layout
      user={user}
      nodes={nodes}
      logout={logout}
      navigate={navigate}
    >
      {/* Dynamic Content */}
      <Outlet />

    </Layout>
  );
}

export default Dashboard;