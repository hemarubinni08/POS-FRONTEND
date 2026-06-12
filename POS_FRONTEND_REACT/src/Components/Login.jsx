import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./Api"; // ✅ changed

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch( // ✅ changed
        "http://localhost:8080/api/authenticate",{
          method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({username, password})
    });

      const data = await response.json();

      console.log("✅ Response from backend:", data);

      if (!data.token || data.token === "Error") {
        setMessage("❌ Login unsuccessful. Invalid credentials");
      } else {
        setMessage("✅ Login successful!");

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        setTimeout(() => navigate("/dashboard1"), 1000);
      }

    } catch (error) {
      console.error("❌ Login error:", error);
      setMessage("❌ Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ UI unchanged
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {message && (
          <div className="text-center text-sm text-red-500 mb-2">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="username"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white ${
              loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>

      </div>
    </div>
  );
};

export default Login;