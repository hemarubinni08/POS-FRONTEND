import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginUser } from "../services/api";
import { saveToken } from "../utils/auth";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterNavigation = () => {
  navigate("/register");
};

  console.log("Component Re-rendered");

  useEffect(() => {

  console.log("useEffect Executed");

}, []);
    
  const handleSubmit = async (e) => {

  e.preventDefault();

  if (username.trim() === "" || password.trim() === "") {

    setError("Username and Password are required");

    return;

  }

  try {

    setError("");

    setLoading(true);

    const data = await loginUser(username, password);

    console.log(data);

    setLoading(false);

    if (data.token === "Error") {

      setError("Invalid Username or Password");

      return;

    }

    console.log("JWT Token:", data.token);

    saveToken(data.token);

    navigate("/dashboard");

  } catch (error) {

    console.log(error);

    setLoading(false);

    setError("Something went wrong");

  }

};

  return (

  <div className="min-h-screen flex bg-[#111111]">

    {/* LEFT SIDE */}

    <div className="hidden lg:flex w-1/2 bg-[#111111] text-white flex-col justify-between px-20 py-14">

      <div>

        {/* Logo */}

        <div className="flex items-center gap-4 mb-20">

          <div className="w-14 h-14 border-2 border-white rounded-xl flex items-center justify-center">

            <span className="text-2xl font-semibold">
              P
            </span>

          </div>

          <div>

            <h1 className="text-3xl font-semibold">
              YOUR POS
            </h1>

            <p className="text-gray-400 text-sm">
              Retail Management System
            </p>

          </div>

        </div>

        {/* Main Heading */}

        <div className="max-w-xl">

          <h1 className="text-7xl font-bold leading-tight tracking-tight">

            Start your POS journey today.

          </h1>

          <p className="mt-10 text-2xl text-gray-300 leading-relaxed">

            Manage billing, inventory, products, sales, and customers
            from one powerful platform.

          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-gray-800 pt-10">

        <h2 className="text-4xl font-bold mb-6">

          Need assistance?

        </h2>

        <div className="flex gap-10 text-xl text-gray-300">

          <p>
            +91 9876543210
          </p>

          <p>
            support@yourpos.com
          </p>

        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="w-full lg:w-1/2 bg-[#f5f5f5] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-xl bg-white rounded-2xl p-14 shadow-sm">

        {/* Heading */}

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold text-black">

            Welcome back

          </h1>

          <p className="text-gray-600 mt-4 text-xl">

            Sign in to continue to your dashboard

          </p>

        </div>

        {/* Error */}

        {

          error && (

            <div className="mb-6 border border-red-200 bg-red-50 text-red-600 px-5 py-4 rounded-xl text-base">

              {error}

            </div>

          )

        }

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Username */}

          <div>

            <label className="block text-lg font-medium text-gray-700 mb-3">

              Username

            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border border-gray-300 bg-white rounded-xl px-5 py-5 text-lg outline-none focus:border-blue-600 transition-all"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block text-lg font-medium text-gray-700 mb-3">

              Password

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-300 bg-white rounded-xl px-5 py-5 text-lg outline-none focus:border-blue-600 transition-all"
            />

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f62fe] hover:bg-[#004de6] text-white text-xl font-semibold py-5 rounded-xl transition-all"
          >

            {loading ? "Signing In..." : "Sign In"}

          </button>

        </form>

        {/* Bottom Section */}

        <div className="mt-10 text-center">

          <p className="text-gray-600 text-lg">

            Are you a new user?

          </p>

          <button
            type="button"
            onClick={handleRegisterNavigation}
            className="mt-3 text-[#0f62fe] hover:underline text-lg font-semibold"
          >

            Create Account

          </button>

        </div>

      </div>

    </div>

  </div>

);

}

export default Login;