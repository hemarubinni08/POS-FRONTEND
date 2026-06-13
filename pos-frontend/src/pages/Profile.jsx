import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Profile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [rolesList, setRolesList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNo: "",
    roles: [],
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // ✅ PROTECT ROUTE
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  // ✅ LOAD USER & ROLES
  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/api/user/get?username=${username}`);

      setFormData({
        ...res.data,
        roles: (res.data.roles || []).map((r) =>
          typeof r === "string" ? r : r.identifier
        ),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await api.post("/api/role/list", {
        page: 0,
        sizePerPage: 10,
        sortDirection: "ASC",
        sortField: "identifier",
      });

      setRolesList(res.data.dtoList || []);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      roles: checked
        ? [...prev.roles, value]
        : prev.roles.filter((r) => r !== value),
    }));
  };

  const validate = () => {
    let err = {};

    if (!formData.name.trim())
      err.name = "Name is required";

    if (!formData.phoneNo || formData.phoneNo.length !== 10)
      err.phoneNo = "Phone must be 10 digits";

    if (formData.roles.length === 0)
      err.roles = "Select at least one role";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await api.post(`/api/user/update?oldUsername=${username}`, formData);

      setMessage("✅ Profile updated successfully");

    } catch (err) {
      console.error(err);
      setMessage("❌ Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md border border-gray-200 p-8">

        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
          My Profile
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Update your details ✏️
        </p>

        {/* MESSAGE */}
        {message && (
          <div className="text-center mb-4 text-sm text-green-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* EMAIL (DISABLED) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              name="username"
              value={formData.username}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNo && (
              <p className="text-red-500 text-xs">{errors.phoneNo}</p>
            )}
          </div>

          {/* ROLES */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Select Roles</p>

            <div className="flex flex-wrap gap-2">
              {rolesList.map((role, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={role.identifier}
                    checked={formData.roles.includes(role.identifier)}
                    onChange={handleRoleChange}
                  />
                  {role.identifier}
                </label>
              ))}
            </div>

            {errors.roles && (
              <p className="text-red-500 text-xs mt-1">{errors.roles}</p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3">

            {/* UPDATE */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white 
              bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900
              hover:from-blue-900 hover:to-indigo-800 transition-all duration-300"
            >
              Update Profile
            </button>

            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3 rounded-lg text-white bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default Profile;