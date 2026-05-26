import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/common/Navbar";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const res = await api.get("/home");
      setNodes(res.data);
    } catch (err) {
      console.log(err);
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#E9EEF5]">
      <Sidebar nodes={nodes} />
      <Navbar />
      <div className="ml-[240px] pt-20 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;