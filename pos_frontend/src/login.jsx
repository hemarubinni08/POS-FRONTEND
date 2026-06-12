import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Please enter username and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/authenticate",
        credentials
      );

      const token = response?.data?.token;

      if (!token || token === "null") {
        setError("Invalid credentials entry code");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("username", credentials.username);
      navigate("/home");

    } catch (err) {
      const message =
        err?.response?.data?.message || "Invalid credentials entry code";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen font-sans bg-slate-50 text-left overflow-hidden select-none">

      {/* LEFT SPLIT PANEL: ANCHORED RETAILOS THEME CARD */}
      <div className="hidden md:flex w-[42%] bg-slate-900 p-10 flex-col justify-between relative border-r border-slate-800">

        {/* BRAND LABEL HEAD AREA */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <span className="text-slate-200 text-sm font-semibold tracking-wide uppercase">RetailOS POS</span>
        </div>

        {/* BOTTOM METADATA TEXT BLOCK */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white leading-tight">
            Welcome <br />
            <span className="text-blue-400">back.</span>
          </h1>
          <p className="text-slate-400 text-xs mt-3 max-w-xs leading-relaxed">
            Sign in to your authorized terminal account to continue managing your store logs, products inventory, and node clusters.
          </p>
        </div>

        {/* FOOTER SYSTEM VERSION HINT */}
        <p className="text-slate-500 font-mono text-[10px]">© 2026 RetailOS</p>
      </div>

      {/* RIGHT SPLIT PANEL: FORM REGISTRATION AREA */}
      <div className="w-full md:w-[58%] flex items-center justify-center p-8 bg-slate-50 h-full">

        <div className="w-full max-w-sm bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Sign in</h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter secure operator credentials to unlock console.
            </p>
          </div>

          {/* DYNAMIC SYSTEM MESSAGES PANEL */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium p-3 rounded-xl mb-4 flex items-center gap-2 animate-shake">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
                Email Identity
              </label>
              <input
                name="username"
                type="email"
                placeholder="operator@retailos.com"
                value={credentials.username}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-slate-50 text-slate-800 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
                Security Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-slate-50 text-slate-800 p-2.5 rounded-lg text-sm pr-10 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 transition-colors text-xs"
              >
                {showPassword ? "👁️" : "👁️"}
              </button>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-500/10 transition-all disabled:opacity-70 mt-2"
            >
              {isLoading ? "Validating security layer..." : "Login"}
            </button>
          </form>

          {/* SIGN UP DIRECTION LINK RE-LINK */}
          <p className="text-center text-xs text-slate-500 mt-5">
            Don't have an account on this system?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
            >
              Register identity
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;