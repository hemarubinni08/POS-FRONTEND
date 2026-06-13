import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
  };

  const validate = () => {
    let err = {};
    if (!formData.username) err.username = "Email required";
    if (!formData.password) err.password = "Password required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await api.post("/api/authenticate", formData);
      const data = res.data;

      localStorage.setItem("token", data.token || "");
      localStorage.setItem("username", formData.username);

      navigate("/home");
    } catch (err) {
      setErrors({
        general: err.response
          ? "Invalid email or password"
          : "Server error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2
        bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900
        flex-col justify-center items-center px-10 text-center">

        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
          Welcome Back 👋
        </h1>

        <p className="text-lg opacity-90 max-w-md">
          Manage your system, inventory, and operations efficiently with our platform.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full md:w-1/2 items-center justify-center">

        <div className="w-full max-w-md p-8">

          <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">

            <h2 className="text-2xl font-semibold mb-1">
              Sign In
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              Enter your credentials to continue
            </p>

            {/* ERROR */}
            {errors.general && (
              <div className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {errors.username && (
                <p className="text-red-400 text-xs">{errors.username}</p>
              )}

              {/* PASSWORD */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 pr-10
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-400"
                  >
                    {showPassword ? "🙈" : "👁"}
                  </span>
                </div>
              </div>

              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password}</p>
              )}

              {/* ✅ BUTTON MATCHED WITH LEFT PANEL */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-medium flex justify-center items-center
                bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900
                hover:from-blue-900 hover:to-indigo-800
                transition-all duration-300 shadow-md"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* FOOTER */}
              <div className="flex justify-between text-sm text-gray-400 mt-4">
                <span
                  onClick={() => navigate("/register")}
                  className="cursor-pointer hover:text-white"
                >
                  Create account
                </span>

                <span className="cursor-pointer hover:text-white">
                  Forgot password?
                </span>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;