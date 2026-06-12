import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    phoneNo: "",
    password: "",
    roles: []
  });

  const [allRoles, setAllRoles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/role/getAllActive");
        const data = await res.json();
        setAllRoles(data);
      } catch (err) {
        console.error("Error loading roles");
      }
    };
    fetchRoles();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Toggle role selection
  const toggleRole = (role) => {
    const updated = form.roles.includes(role)
      ? form.roles.filter(r => r !== role)
      : [...form.roles, role];

    setForm({ ...form, roles: updated });
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.roles.length === 0) {
      setError("Select at least one role");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/login");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial;
          background: #f4f4f4;
        }

        .container {
          display: flex;
          height: 100vh;
        }

        /* LEFT SIDE */
        .left {
          flex: 1;
          background: #0B3C5D;
          color: white;
          padding: 40px;
        }

        /* RIGHT SIDE */
        .right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .card {
          background: white;
          padding: 30px;
          width: 350px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .input {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .roles {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .role {
          padding: 5px 10px;
          border: 1px solid #0B3C5D;
          border-radius: 6px;
          cursor: pointer;
        }

        .role.active {
          background: #0B3C5D;
          color: white;
        }

        .btn {
          width: 100%;
          padding: 10px;
          background: #0B3C5D;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .error {
          background: #ffdddd;
          color: red;
          padding: 8px;
          margin-bottom: 10px;
          border-radius: 6px;
        }

        .link {
          color: blue;
          cursor: pointer;
          text-align: center;
          margin-top: 10px;
        }
      `}</style>

      <div className="container">

        {/* LEFT */}
        <div className="left">
          <h1>POS System</h1>
          <p>Create your account to access system</p>
        </div>

        {/* RIGHT */}
        <div className="right">
          <div className="card">

            <h2>Register</h2>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>

              <input
                className="input"
                placeholder="Full Name"
                name="name"
                onChange={handleChange}
                required
              />

              <input
                className="input"
                placeholder="Email"
                name="username"
                onChange={handleChange}
                required
              />

              <input
                className="input"
                placeholder="Phone"
                name="phoneNo"
                onChange={handleChange}
                required
              />

              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />

              {/* ROLES */}
              <div className="roles">
                {allRoles.map((r, i) => (
                  <div
                    key={i}
                    className={`role ${form.roles.includes(r.identifier) ? "active" : ""}`}
                    onClick={() => toggleRole(r.identifier)}
                  >
                    {r.identifier}
                  </div>
                ))}
              </div>

              <br />

              <button className="btn" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>

            </form>

            <div
              className="link"
              onClick={() => navigate("/login")}
            >
              Already have account? Login
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default Register;