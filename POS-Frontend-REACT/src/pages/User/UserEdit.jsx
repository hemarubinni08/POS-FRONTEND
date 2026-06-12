import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader, AlertCircle } from "lucide-react";

const UserEdit = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [availableRoles, setAvailableRoles] = useState(["SUPER_ADMIN", "ADMIN", "USER"]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    username: "", // Email - READ ONLY
    phoneNo: "",
    roles: [],
    status: true
  });

  const [errors, setErrors] = useState({});

  const API_BASE = "http://localhost:8080";
  const token = localStorage.getItem("token");

  /* ===== FETCH USER DATA ===== */
  useEffect(() => {
    fetchUserData();
  }, [username]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${API_BASE}/api/user/get`,
        {
          params: { username },
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const user = res.data;
      setFormData({
        id: user.id,
        name: user.name || "",
        username: user.username || "",
        phoneNo: user.phoneNo || "",
        roles: user.roles || [],
        status: user.status !== undefined ? user.status : true
      });
    } catch (err) {
      setError("Failed to load user details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ===== VALIDATION ===== */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phoneNo.trim()) newErrors.phoneNo = "Phone is required";
    if (!/^\d{10}$/.test(formData.phoneNo.replace(/\D/g, ""))) newErrors.phoneNo = "Phone must be 10 digits";
    if (formData.roles.length === 0) newErrors.roles = "At least one role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ===== HANDLE INPUT ===== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  /* ===== HANDLE ROLE SELECTION ===== */
  const toggleRole = (role) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      // Format roles - ensure ROLE_ prefix
      const rolesPayload = formData.roles.map(r => 
        r.startsWith("ROLE_") ? r : `ROLE_${r}`
      );

      const payload = {
        id: formData.id,
        name: formData.name,
        username: formData.username, // Sent but not updated by backend
        phoneNo: formData.phoneNo,
        roles: rolesPayload,
        status: formData.status
      };

      const res = await axios.post(
        `${API_BASE}/api/user/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.success) {
        setSuccess("User updated successfully!");
        setTimeout(() => navigate("/users"), 1500);
      } else {
        setError(res.data.message || "Failed to update user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader size={32} className="animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      
      {/* HEADER */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/users")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Users
        </button>
        <h1 className="text-3xl font-bold text-slate-900">Edit User</h1>
        <p className="text-sm text-slate-600 mt-2">Update user information, roles, and status</p>
      </div>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          {success}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 max-w-2xl">
        
        {/* READ-ONLY INFO BOX */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-semibold mb-1">Important:</p>
            <p>Email and password cannot be edited. Only name, phone, roles, and status can be modified.</p>
          </div>
        </div>

        {/* NAME */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Kushal S"
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.name
                ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        {/* EMAIL (READ-ONLY) */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address <span className="text-xs text-slate-500 font-normal">(read-only)</span></label>
          <input
            type="email"
            value={formData.username}
            disabled
            className="w-full px-4 py-2.5 border border-slate-300 bg-slate-100 text-slate-600 rounded-lg cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-slate-500">Email address cannot be changed</p>
        </div>

        {/* PHONE */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="e.g., 9876543210"
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.phoneNo
                ? "border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {errors.phoneNo && <p className="mt-1 text-xs text-red-600">{errors.phoneNo}</p>}
        </div>

        {/* ROLES */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-3">Assign Roles *</label>
          <div className="space-y-2">
            {availableRoles.map(role => (
              <label key={role} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.roles.includes(role) || formData.roles.includes(`ROLE_${role}`)}
                  onChange={() => toggleRole(role)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                />
                <span className="text-sm text-slate-700 font-medium">{role.replace("ROLE_", "").replace(/_/g, " ")}</span>
              </label>
            ))}
          </div>
          {errors.roles && <p className="mt-2 text-xs text-red-600">{errors.roles}</p>}
        </div>

        {/* STATUS */}
        <div className="mb-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
            />
            <span className="text-sm text-slate-700 font-medium">Active Status</span>
          </label>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {submitting ? (
              <>
                <Loader size={18} className="animate-spin" />
                Updating...
              </>
            ) : (
              "Update User"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default UserEdit;