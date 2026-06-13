import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (error) setError(""); 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:8080/api/authenticate",
        formData
      );

      // SAFE BACKEND RESPONSE EVALUATION
      const token = response.data?.token || response.data?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", formData.username); // Storing username for your profile queries
        navigate("/profile");
      } else {
        setError("Invalid username or password credentials");
      }
    } catch (err) {
      console.error("Login Context Error:", err);
      setError(err.response?.data?.message || "Unable to reach auth servers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-6 antialiased">

      {/* PERFECTLY PROPORTIONED LAPTOP AUTH CONTAINER */}
      <div className="w-[390px] bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)]">

        {/* HEADER AREA */}
        <div className="text-center mb-7">
          <h2 className="text-[26px] font-extrabold text-gray-900 tracking-tight leading-tight">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Login to access your dashboard
          </p>
        </div>

        {/* FIXED SPACE-Y UTILITY RUNTIME TARGET */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL INPUT */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block pl-0.5">
              Email Address
            </label>
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-black/40 focus:ring-4 focus:ring-black/5 hover:border-gray-300"
              required
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block pl-0.5">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-4 pr-11 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-black/40 focus:ring-4 focus:ring-black/5 hover:border-gray-300"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors p-1"
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* ERROR STATUS WINDOW */}
          {error && (
            <div className="text-red-600 text-xs font-medium bg-red-50/60 border border-red-100/70 px-4 py-2.5 rounded-xl transition-all duration-200 animate-in fade-in duration-200">
              {error}
            </div>
          )}

          {/* FORM LOG ACTION */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-black text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm hover:bg-gray-900 hover:shadow active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* DESIGN SEPARATOR LINE */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px bg-gray-100 flex-1"></div>
            <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">OR</span>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>

          {/* AUXILIARY REGISTRATION BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:text-black active:scale-[0.99]"
          >
            Create Account
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;