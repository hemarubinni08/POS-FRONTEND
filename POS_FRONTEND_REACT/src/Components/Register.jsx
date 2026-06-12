import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./Api"; // ✅ changed

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    roles: [],
    phoneNo: "",
    password: ""
  });

  const [rolesList, setRolesList] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FETCH ROLES
  useEffect(() => {
    api.post("/role/list", { // ✅ changed
      page: 0,
      sizePerPage: 10,
      sortDirection: "ASC",
      sortField: "identifier"
    })
      .then((response) => {
        console.log("✅ Full Response:", response.data);

        const roles = response.data.dtoList || response.data;
        setRolesList(roles);
      })
      .catch((err) => {
        console.error("❌ Error fetching roles:", err);
        setMessage("❌ Failed to load roles");
      });
  }, []);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "roles") {
      const selectedRoles = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);

      setUser({ ...user, roles: selectedRoles });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (user.phoneNo.length !== 10) {
      setMessage("❌ Phone number must be exactly 10 digits");
      setLoading(false);
      return;
    }

    if (user.password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post( // ✅ changed
        "/user/register",
        user
      );

      const data = response.data;

      if (data.success === false) {
        if (data.message?.toLowerCase().includes("exists")) {
          setMessage("❌ Email already exists");
        } else {
          setMessage(data.message || "❌ Registration failed");
        }
      } else {
        setMessage("✅ Registration successful!");
        setTimeout(() => navigate("/login"), 1500);
      }

    } catch (error) {
      console.error("❌ Submit error:", error);
      setMessage("❌ Error connecting to server");
    }

    setLoading(false);
  };

  return (
    // ✅ UI unchanged
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          User Registration
        </h2>

        {message && (
          <div className="text-center text-sm text-red-500 mb-2">
            {message}
          </div>
        )}

        {rolesList.length === 0 && (
          <div className="text-red-500 text-sm text-center mb-2">
            ⚠️ Roles not loaded
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="username"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={user.username}
            onChange={handleChange}
            required
          />

          <select
            name="roles"
            value={user.roles}
            multiple
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            required
          >
            {rolesList.map(role => (
              <option key={role.id} value={role.identifier}>
                {role.identifier}
              </option>
            ))}
          </select>

          <input
            type="tel"
            name="phoneNo"
            placeholder="Mobile Number"
            maxLength="10"
            className="w-full p-3 border rounded-lg"
            value={user.phoneNo}
            onChange={(e) =>
              setUser({
                ...user,
                phoneNo: e.target.value.replace(/[^0-9]/g, "")
              })
            }
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={user.password}
            onChange={handleChange}
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
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <div className="text-center mt-4 text-sm">
          Already have account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>

      </div>
    </div>
  );
};

export default Register;