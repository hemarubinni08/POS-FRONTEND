import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Layout from "../../Component/Layout";

function UserUpdate() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.post("/role/list", {
          page: 0,
          sizePerPage: 100,
          sortDirection: "ASC",
          sortField: "identifier",
        });
        setRoles(response.data.dtoList ?? response.data.content ?? response.data ?? []);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Unable to load roles.");
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/get", {
          params: { username },
        });
        const data = response.data || {};
        setId(data.id || "");
        setNewUsername(data.username || "");
        setName(data.name || "");
        setPhoneNo(data.phoneNo || "");
        setSelectedRoles(data.roles || []);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Unable to load user.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
    fetchUser();
  }, [username]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await axiosInstance.post("/user/update", {
        id,
        username: newUsername,
        name,
        phoneNo,
        roles: selectedRoles,
      });

      if (response.data?.success === false) {
        setError(response.data.message || "Failed to update user");
        return;
      }

      navigate("/profile/user");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Unable to update user.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="w-full py-10 text-center text-slate-600">Loading user...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Update User</h2>
          <p className="mt-1 text-sm text-slate-500">Edit the selected POS user account.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {error && <div className="mb-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{error}</div>}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Username</label>
              <input
                type="email"
                placeholder="Enter username"
                value={newUsername}
                onChange={(event) => setNewUsername(event.target.value)}
                required
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Phone Number</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="Enter phone number"
                value={phoneNo}
                onKeyDown={(event) => {
                  if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== "Tab") {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => setPhoneNo(event.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600">Roles</label>
              <select
                multiple
                value={selectedRoles}
                onChange={(event) => {
                  const selected = Array.from(event.target.selectedOptions, (option) => option.value);
                  setSelectedRoles(selected);
                }}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              >
                {roles.map((role) => (
                  <option key={role.identifier} value={role.identifier}>
                    {role.identifier}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">Hold Ctrl to select multiple roles</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default UserUpdate;
