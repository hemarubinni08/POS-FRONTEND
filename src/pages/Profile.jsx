import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      if (!token || !username) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/user/get?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-10">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-slate-800 text-white p-8">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-white transition"          >
            Back
          </button>

          <h1 className="text-3xl font-bold">
            User Profile
          </h1>

          <p className="text-slate-300 mt-2">
            Account Details
          </p>

        </div>

        {/* BODY */}
        <div className="p-8 space-y-6">

          <div>
            <p className="text-sm text-slate-500">Full Name</p>
            <h2 className="text-xl font-semibold text-slate-800">
              {user?.name}
            </h2>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <h2 className="text-xl font-semibold text-slate-800">
              {user?.username}
            </h2>
          </div>

          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <h2 className="text-xl font-semibold text-slate-800">
              {user?.phoneNo}
            </h2>
          </div>

          <div>
            <p className="text-sm text-slate-500">Roles</p>
            <h2 className="text-xl font-semibold text-slate-800">
              {Array.isArray(user?.roles)
                ? user.roles.map((r) => r.name || r).join(", ")
                : user?.roles}
            </h2>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;