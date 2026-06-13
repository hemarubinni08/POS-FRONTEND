import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    roles: [],
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  // ✅ FETCH ROLES (FIXED)
  const fetchRoles = async () => {
    try {
      const res = await api.post("/api/role/list", {
        page: 0,
        sizePerPage: 10,
        sortDirection: "ASC",
        sortField: "identifier",
      });

      console.log("ROLES:", res.data);

      setRoles(res.data.dtoList || []); // ✅ IMPORTANT FIX
    } catch (err) {
      console.error(err);
      setRoles([]);
    }
  };

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNo") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ ROLE SELECT
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      roles: checked
        ? [...prev.roles, value]
        : prev.roles.filter((r) => r !== value),
    }));
  };

  // ✅ VALIDATION
  const validateForm = () => {
    let err = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) err.name = "Name required";
    if (!emailRegex.test(formData.username)) err.username = "Invalid email";
    if (!phoneRegex.test(formData.phoneNo))
      err.phoneNo = "Phone must be 10 digits";
    if (formData.roles.length === 0) err.roles = "Select at least one role";
    if (formData.password.length < 6)
      err.password = "Min 6 characters";
    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await api.post("/api/user/register", {
        username: formData.username,
        name: formData.name,
        phoneNo: formData.phoneNo,
        password: formData.password,
        roles: formData.roles,
      });

      alert("Registered Successfully ✅");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed ❌");
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

        <h1 className="text-4xl font-bold mb-4">
          Join With Us 🚀
        </h1>

        <p className="text-lg opacity-90 max-w-md">
          Create your account and start managing your system easily.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full md:w-1/2 items-center justify-center">

        <div className="w-full max-w-lg p-8">


          <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">

            <h2 className="text-2xl font-semibold mb-1">
              Create Account
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              Fill the details to register
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAME */}
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}

              {/* EMAIL */}
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && <p className="text-red-400 text-xs">{errors.username}</p>}

              {/* PHONE */}
              <input
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phoneNo && <p className="text-red-400 text-xs">{errors.phoneNo}</p>}

              {/* PASSWORD */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}

              {/* CONFIRM PASSWORD */}
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-3 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs">{errors.confirmPassword}</p>
              )}

              {/* ROLES */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Select Roles</p>

                <div className="flex flex-wrap gap-2">
                  {Array.isArray(roles) &&
                    roles.map((role, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg 
                        cursor-pointer hover:bg-gray-600 transition"
                      >
                        <input
                          type="checkbox"
                          value={role.identifier}
                          checked={formData.roles.includes(role.identifier)}
                          onChange={handleRoleChange}
                          className="accent-blue-500"
                        />
                        {role.identifier}
                      </label>
                    ))}
                </div>

                {errors.roles && (
                  <p className="text-red-400 text-xs mt-1">{errors.roles}</p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-medium flex justify-center items-center
                bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900
                hover:from-blue-900 hover:to-indigo-800
                transition-all duration-300"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Register"
                )}
              </button>

              {/* LOGIN LINK */}
              <p className="text-center text-sm text-gray-400 mt-3">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/")}
                  className="cursor-pointer text-white hover:underline"
                >
                  Login here
                </span>
              </p>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;