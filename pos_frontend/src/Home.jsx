import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";

const Home = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (!token || !storedUsername) {
      navigate("/");
      return;
    }

    setUsername(storedUsername);

    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Layout username={username} onLogout={handleLogout}>
      
      {/* ERROR STATUS */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
          {error}
        </div>
      )}

      {/* LOADING STATUS */}
      {isLoading && (
        <div className="text-sm text-slate-500">
          Loading your space...
        </div>
      )}

      {/* CLEAN APP WELCOME VIEW */}
      {!isLoading && !error && (
        <div className="bg-white border border-slate-200 rounded-lg p-10 max-w-xl shadow-sm text-left">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3 tracking-tight">
            Welcome to RetailPOS Application
          </h2>
          
          <p className="text-sm text-slate-600 leading-relaxed m-0">
            Use the sidebar menu options to access modules, monitor stock inventories, issue client bills, and look through analytical sales data points effortlessly.
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Home;