import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const data = await res.json();

      if (!res.ok || data.success === false || data.token === "Error") {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("name", data.name);
      localStorage.setItem("phone", data.phoneNo || "");
      localStorage.setItem("roles", JSON.stringify(data.roles || []));

      navigate("/home");

    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ INTERNAL CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f3f4f6;
        }

        .container {
          display: flex;
          height: 100vh;
        }

        .left-panel {
          flex: 1;
          background: linear-gradient(135deg, #0B3C5D, #164E75);
          color: white;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .left-panel h1 {
          font-size: 42px;
          font-weight: 800;
        }

        .left-panel ul {
          margin-top: 20px;
          padding: 0;
          list-style: none;
        }

        .left-panel li {
          margin-bottom: 10px;
        }

        .right-panel {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f9fafb;
        }

        .card {
          width: 100%;
          max-width: 380px;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        .card h2 {
          margin-bottom: 5px;
        }

        .subtitle {
          color: gray;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .error {
          background: #fee2e2;
          color: #991b1b;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 14px;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-group label {
          font-size: 13px;
          display: block;
          margin-bottom: 5px;
        }

        .input-group input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .input-group input:focus {
          outline: none;
          border-color: #0B3C5D;
        }

        .btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #0B3C5D;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .btn:disabled {
          opacity: 0.6;
        }

        .footer {
          margin-top: 15px;
          text-align: center;
          font-size: 14px;
        }

        .footer span {
          color: #0B3C5D;
          font-weight: bold;
          cursor: pointer;
        }

        @media (max-width: 850px) {
          .left-panel {
            display: none;
          }
        }
      `}</style>

      <div className="container">

        {/* LEFT */}
        <div className="left-panel">
          <h1>POS Management</h1>
          <p>Smart, reliable business platform</p>

          <ul>
            <li>✅ Real-time Analytics</li>
            <li>✅ Secure Storage</li>
            <li>✅ Inventory Control</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="right-panel">
          <div className="card">

            <h2>Sign In</h2>
            <p className="subtitle">Access your dashboard</p>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <label>Email</label>
                <input
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>

            <div className="footer">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/register")}>
                Create one
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;