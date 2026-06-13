import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});

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

  const fetchRoles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/role/findallactive",
        {
        }
      );
      console.log(res);
      setRoles(res.data || []);
    } catch (err) {
      setRoles([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNo") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    
    if (errors.roles) {
      setErrors((prev) => ({ ...prev, roles: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      roles: checked
        ? [...prev.roles, value]
        : prev.roles.filter((r) => r !== value),
    }));
  };

  const validateForm = () => {
    let err = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) err.name = "Name is required";
    if (!emailRegex.test(formData.username)) err.username = "Invalid email";
    if (!phoneRegex.test(formData.phoneNo)) err.phoneNo = "10 digits required";
    if (formData.roles.length === 0) err.roles = "Select at least one role";
    if (formData.password.length < 6) err.password = "Min 6 characters";
    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:8080/api/user/register", {
        username: formData.username,
        name: formData.name,
        phoneNo: formData.phoneNo,
        password: formData.password,
        roles: formData.roles,
      });

      alert("Registered Successfully ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-6 antialiased">

      {/* PERFECTLY PROPORTIONED LAPTOP REGISTRATION CONTAINER */}
      <div className="w-[440px] bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.07)]">

        {/* HEADER */}
        <div className="bg-black text-white text-center py-7 px-8">
          <h2 className="text-[24px] font-extrabold tracking-tight leading-tight text-white">
            User Registration
          </h2>
          <p className="text-gray-400 text-sm mt-1.5">
            Create your account to get started
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">

          {/* NAME */}
          <div className="space-y-1">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-black/40 focus:ring-4 focus:ring-black/5 hover:border-gray-300"
            />
            {errors.name && <p className="text-red-500 text-xs font-medium pl-1">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <input
              name="username"
              placeholder="Email Address"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-black/40 focus:ring-4 focus:ring-black/5 hover:border-gray-300"
            />
            {errors.username && <p className="text-red-500 text-xs font-medium pl-1">{errors.username}</p>}
          </div>

          {/* PHONE */}
          <div className="space-y-1">
            <input
              name="phoneNo"
              placeholder="Phone Number"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-black/40 focus:ring-4 focus:ring-black/5 hover:border-gray-300"
            />
            {errors.phoneNo && <p className="text-red-500 text-xs font-medium pl-1">{errors.phoneNo}</p>}
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-black/40 focus:ring-4 focus:ring-black/5 hover:border-gray-300"
            />
            {errors.password && <p className="text-red-500 text-xs font-medium pl-1">{errors.password}</p>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-1">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl outline-none text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-black/40 focus:ring-4 focus:ring-black/5 hover:border-gray-300"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs font-medium pl-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* ROLES */}
          <div className="space-y-1.5 pt-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 block pl-0.5">Select Roles</p>

            <div className="flex flex-wrap gap-2 pt-0.5">
              {roles.map((role, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-2 border px-3 py-2 rounded-xl cursor-pointer select-none transition-all duration-200 text-xs font-medium ${
                    formData.roles.includes(role.identifier)
                      ? "bg-gray-50 border-black text-black shadow-sm"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50/80 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={role.identifier}
                    checked={formData.roles.includes(role.identifier)}
                    onChange={handleRoleChange}
                    className="accent-black h-3.5 w-3.5 rounded border-gray-300"
                  />
                  <span>{role.identifier}</span>
                </label>
              ))}
            </div>

            {errors.roles && (
              <p className="text-red-500 text-xs font-medium pl-1">{errors.roles}</p>
            )}
          </div>

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-sm hover:bg-gray-900 hover:shadow active:scale-[0.99]"
          >
            Register
          </button>

          {/* DESIGN SEPARATOR LINE */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px bg-gray-100 flex-1"></div>
            <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">OR</span>
            <div className="h-px bg-gray-100 flex-1"></div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:text-black active:scale-[0.99]"
          >
            Already have an account? Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;