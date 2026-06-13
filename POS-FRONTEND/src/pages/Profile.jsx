import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    phoneNo: "",
    roles: [],
  });

  const [allRoles, setAllRoles] = useState([]);
  const [originalUsername, setOriginalUsername] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (username && token) {
      fetchProfile();
      fetchRoles();
    } else {
      navigate("/");
    }
  }, []);

  // ✅ Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/get", {
        params: { username },
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      setUser({
        ...data,
        roles:
          data.roles?.map((r) =>
            typeof r === "string" ? r : r.identifier
          ) || [],
      });

      setOriginalUsername(data.username);
    } catch (err) {
      console.error(err); // ✅ Sonar fix
      setError("Failed to load profile");
      localStorage.clear();
      navigate("/");
    }
  };

  // ✅ Fetch roles
  const fetchRoles = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/role/list",
        {
          page: 0,
          sizePerPage: 10,
          sortDirection: "ASC",
          sortField: "identifier",
        }
      );

      setAllRoles(res.data || []);
    } catch (err) {
      console.error(err); // ✅ Sonar fix
      setError("Failed to load roles");
    }
  };

  // ✅ Input change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Role change
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;

    setUser((prev) => ({
      ...prev,
      roles: checked
        ? [...prev.roles, value]
        : prev.roles.filter((r) => r !== value),
    }));
  };

  // ✅ Update profile
  const handleUpdate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/update",
        user,
        {
          params: { oldUsername: originalUsername },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("Profile updated ✅");
        localStorage.setItem("username", user.username);
        setEditMode(false);
      } else {
        setError(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err); // ✅ Sonar fix
      setError(err.response?.data?.message || "Server error");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200">

        {/* HEADER */}
        <div className="bg-black text-white text-center py-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold">My Profile 👤</h2>
          <p className="text-sm text-gray-300">Manage your account</p>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-4">

          {error && (
            <div className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* NAME */}
          <div>
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border p-3 rounded-xl mt-1"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="username" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border p-3 rounded-xl mt-1"
            />
          </div>

          {/* PHONE */}
          <div>
            <label htmlFor="phoneNo" className="text-sm font-semibold">
              Phone
            </label>
            <input
              id="phoneNo"
              name="phoneNo"
              value={user.phoneNo}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border p-3 rounded-xl mt-1"
            />
          </div>

          {/* ROLES */}
          <div>
            <p className="text-sm font-semibold">Roles</p>

            {editMode ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {allRoles.map((role) => (
                  <label key={role.identifier} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={role.identifier}
                      checked={user.roles.includes(role.identifier)}
                      onChange={handleRoleChange}
                    />
                    {role.identifier}
                  </label>
                ))}
              </div>
            ) : (
              <p className="mt-2">
                {user.roles.length > 0 ? user.roles.join(", ") : "No Roles"}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="space-y-3 pt-2">

            {editMode ? (
              <button
                onClick={handleUpdate}
                className="w-full bg-black text-white py-3 rounded-xl"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-black text-white py-3 rounded-xl"
              >
                Edit Profile
              </button>
            )}

            <button
              onClick={handleLogout}
              className="w-full border border-black py-3 rounded-xl"
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;