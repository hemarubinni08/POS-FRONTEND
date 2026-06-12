import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

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
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Read once from localStorage — avoids stale reads on re-renders
  const token = localStorage.getItem("token");
  const storedUsername = localStorage.getItem("username");

  // ✅ HANDLE UNAUTHORIZED centrally
  const handleUnauthorized = useCallback(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);

  // ✅ FETCH PROFILE
  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (response.ok) {
        const normalizedRoles =
          data.roles?.map((r) => (typeof r === "string" ? r : r.identifier)) || [];

        setUser({ ...data, roles: normalizedRoles });
        setOriginalUsername(data.username); // ✅ Set original on load
      } else {
        setError("Failed to load profile ❌");
      }
    } catch (err) {
      console.error(err);
      setError("Server error ❌");
    }
  }, [token, handleUnauthorized]);

  // ✅ FETCH ROLES
  const fetchRoles = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/api/role/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 0,
          sizePerPage: 10,
          sortDirection: "ASC",
          sortField: "identifier",
        }),
      });

      const data = await response.json();

      // ✅ Handle both paginated { content: [] } and plain array responses
      const roles = Array.isArray(data)
        ? data
        : Array.isArray(data?.content)
        ? data.content
        : [];

      setAllRoles(roles);
    } catch (err) {
      console.error(err);
      setError("Failed to load roles ❌");
    }
  }, []);

  useEffect(() => {
    if (!storedUsername || !token) {
      navigate("/");
      return;
    }

    const init = async () => {
      setIsLoading(true);
      await Promise.all([fetchProfile(), fetchRoles()]);
      setIsLoading(false);
    };

    init();
  }, [token, storedUsername, navigate, fetchProfile, fetchRoles]);

  // ✅ INPUT CHANGE — functional updater avoids stale state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  // ✅ ROLE CHANGE
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      roles: checked
        ? [...prev.roles, value]
        : prev.roles.filter((r) => r !== value),
    }));
    setError("");
    setSuccess("");
  };

  // ✅ CANCEL EDIT — restore original data
  const handleCancelEdit = () => {
    setEditMode(false);
    setError("");
    setSuccess("");
    fetchProfile(); // Re-fetch to discard unsaved changes
  };

  // ✅ UPDATE PROFILE
  const handleUpdate = async () => {
    setError("");
    setSuccess("");

    if (!user.name.trim() || !user.username.trim()) {
      setError("Name and email are required ❌");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/update?oldUsername=${originalUsername}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess("Profile updated successfully ✅");
        localStorage.setItem("username", user.username);

        // ✅ Update originalUsername so next save uses new username
        setOriginalUsername(user.username);
        setEditMode(false);
      } else {
        setError(data.message || "Update failed ❌");
      }
    } catch (err) {
      console.error(err);
      setError("Server error ❌");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile 👤</h2>

        {error && <div className="error-box" role="alert">{error}</div>}
        {success && <div className="success-box" role="status">{success}</div>}

        {/* NAME */}
        <div className="profile-item">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!editMode}
            autoComplete="name"
          />
        </div>

        {/* EMAIL */}
        <div className="profile-item">
          <label htmlFor="username">Email</label>
          <input
            id="username"
            name="username"
            type="email"
            value={user.username}
            onChange={handleChange}
            disabled={!editMode}
            autoComplete="email"
          />
        </div>

        {/* PHONE */}
        <div className="profile-item">
          <label htmlFor="phoneNo">Phone</label>
          <input
            id="phoneNo"
            name="phoneNo"
            type="tel"
            value={user.phoneNo}
            onChange={handleChange}
            disabled={!editMode}
            autoComplete="tel"
          />
        </div>

        {/* ROLES */}
        <div className="profile-item">
          <label>Roles</label>
          {!editMode ? (
            <span>{user.roles.join(", ") || "No roles assigned"}</span>
          ) : (
            <div className="roles-checkbox">
              {allRoles.map((role) => (
                // ✅ Use stable unique key, not array index
                <label key={role.identifier}>
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
          )}
        </div>

        {/* BUTTONS */}
        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="primary-btn">
            Edit Profile
          </button>
        ) : (
          <div className="btn-group">
            <button onClick={handleUpdate} className="primary-btn">
              Save Changes
            </button>
            {/* ✅ Cancel button to exit edit mode safely */}
            <button onClick={handleCancelEdit} className="secondary-btn">
              Cancel
            </button>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;