import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Update.css";

const UserUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state?.username;

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phoneNo: "",
    username: "",
    roles: [],
  });

  // ================= FETCH USER =================
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token || !username) {
        alert("Invalid session or username missing");
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `http://localhost:8080/api/user/get?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        id: res.data?.id || "",
        name: res.data?.name || "",
        phoneNo: res.data?.phoneNo || "",
        username: res.data?.username || username,
        roles: res.data?.roles || [],
      });

    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }, [navigate, username]);

  useEffect(() => {
    if (username) {
      fetchUser();
    } else {
      alert("Username missing");
      navigate("/user/list");
    }
  }, [fetchUser, username, navigate]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= UPDATE USER =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!formData.id) {
        alert("User ID missing. Cannot update.");
        return;
      }

      const payload = {
        id: formData.id,
        name: formData.name,
        phoneNo: formData.phoneNo,
        username: formData.username,
        roles: formData.roles,
      };

      await axios.post(
        "http://localhost:8080/api/user/update",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully");
      navigate("/user/list");

    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Update failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="update-loading">Loading...</div>;
  }

  return (
    <div className="update-wrapper">

      <div className="update-card">

        <h2 className="update-title">Update User</h2>

        <form onSubmit={handleUpdate}>

          {/* NAME */}
          <div className="update-row">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* PHONE */}
          <div className="update-row">
            <label>Phone No</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>

          {/* USERNAME */}
          <div className="update-row">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              disabled
            />
          </div>

          {/* ROLES */}
          <div className="update-row">
            <label>Roles</label>
            <span>
              {(formData.roles || []).length > 0
                ? formData.roles.join(", ")
                : "-"}
            </span>
          </div>

          {/* HIDDEN ID */}
          <input type="hidden" value={formData.id} />

          {/* BUTTONS */}
          <button type="submit" className="update-btn">
            Save Changes
          </button>

          <button
            type="button"
            className="update-btn cancel"
            onClick={() => navigate("/user/list")}
          >
            Cancel
          </button>

        </form>

      </div>

    </div>
  );
};

export default UserUpdate;