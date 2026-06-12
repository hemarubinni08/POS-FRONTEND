import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./Api"; // ✅ changed

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    id: "",
    name: "",
    username: "",
    phoneNo: "",
    roles: []
  });

  const [rolesList, setRolesList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!username) {
      navigate("/login");
      return;
    }

    // ✅ FETCH USER
    api.get( // ✅ changed
      "/user/get",
      {
        params: { identifier: username }
      }
    )
      .then((res) => {
        const data = res.data;

        setUserDetails({
          id: data.id,
          name: data.name || "",
          username: data.username || "",
          phoneNo: data.phoneNo || "",
          roles: (data.roles || []).map(r => r.identifier || r),
        });
      })
      .catch((err) => console.error("User fetch error:", err));

    // ✅ FETCH ROLES
    api.post( // ✅ changed
      "/role/list",
      {
        page: 0,
        sizePerPage: 10,
        sortDirection: "ASC",
        sortField: "identifier",
      }
    )
      .then((res) => {
        setRolesList(res.data.content || res.data);
      })
      .catch((err) => console.error("Roles fetch error:", err));

  }, [navigate]);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  // ✅ ROLE CHANGE
  const handleRoleChange = (e) => {
    const selectedRoles = Array.from(e.target.options)
      .filter(option => option.selected)
      .map(option => option.value);

    setUserDetails({
      ...userDetails,
      roles: selectedRoles
    });
  };

  // ✅ SAVE
  const handleSave = () => {
    const payload = {
      id: userDetails.id,
      name: userDetails.name,
      username: userDetails.username,
      phoneNo: userDetails.phoneNo,
      roles: userDetails.roles,
    };

    api.post( // ✅ changed
      "/user/update",
      payload
    )
      .then((res) => {
        const data = res.data;

        console.log("✅ API Response:", data);

        if (data.success === false) {
          if (data.message?.toLowerCase().includes("exists")) {
            setMessage("❌ Email already exists");
          } else {
            setMessage("❌ " + data.message);
          }
        } else {
          setMessage("✅ Profile updated successfully!");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Server error");
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Profile
        </h2>

        {message && (
          <p className={`text-center mb-3 text-sm ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}>
            {message}
          </p>
        )}

        <div className="space-y-4">

          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            name="phoneNo"
            value={userDetails.phoneNo}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
          />

          <select
            multiple
            value={userDetails.roles}
            onChange={handleRoleChange}
            className="w-full p-3 border rounded-lg"
          >
            {rolesList.map(role => (
              <option key={role.id} value={role.identifier}>
                {role.identifier}
              </option>
            ))}
          </select>

        </div>

        <button
          onClick={handleSave}
          className="w-full mt-4 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Save Changes
        </button>

        <button
          onClick={handleLogout}
          className="w-full mt-6 p-3 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;