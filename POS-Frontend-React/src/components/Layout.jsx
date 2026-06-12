import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function Layout({ children, user, nodes, logout, navigate }) {
  const defaultNavigate = useNavigate();
  const [layoutUser, setLayoutUser] = useState(user || null);
  const [layoutNodes, setLayoutNodes] = useState(Array.isArray(nodes) ? nodes : []);

  const activeNavigate = navigate || defaultNavigate;

  useEffect(() => {
    if (user) {
      setLayoutUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (Array.isArray(nodes)) {
      setLayoutNodes(nodes);
    } else if (Array.isArray(nodes?.dtoList)) {
      setLayoutNodes(nodes.dtoList);
    }
  }, [nodes]);

  useEffect(() => {
    if (user) return;

    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setLayoutUser(response.data);
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (nodes) return;

    const fetchNodes = async () => {
      try {
        const response = await axiosInstance.post("/node/list", {
          page: 0,
          sizePerPage: 100,
          sortDirection: "ASC",
          sortField: "id",
        });

        setLayoutNodes(response.data.dtoList || response.data || []);
      } catch (error) {
        console.error("Nodes fetch failed:", error);
      }
    };

    fetchNodes();
  }, [nodes]);

  const activeLogout =
    logout ||
    (() => {
      localStorage.clear();
      activeNavigate("/");
    });

  return (
<div
  style={{
    display: "flex",
    height: "100vh",
    overflow: "hidden"
  }}
>
      {/* SIDEBAR */}
      <Sidebar nodes={layoutNodes} user={layoutUser} />

      {/* RIGHT SIDE */}
<div
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  }}
>
        {/* HEADER */}
        <Header user={layoutUser} logout={activeLogout} navigate={activeNavigate} />

        {/* PAGE CONTENT */}
<div
  style={{
    flex: 1,
    padding: "30px",
    overflowY: "auto",
    background: "#f8fafc"
  }}
>          {children}
        </div>

        {/* FOOTER */}
        <Footer />

      </div>

    </div>
  );
}

export default Layout;
