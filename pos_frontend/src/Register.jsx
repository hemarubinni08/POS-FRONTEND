import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [rolesList, setRolesList] = useState([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    phoneNo: "",
    roles: [],
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/role/findByStatus", {
      });
      // Handle array structure variants safely
      setRolesList(response.data.content || response.data);
    } catch (err) {
      console.error("Error fetching operational security roles", err);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };

  const toggleRole = (roleName) => {
    const updatedRoles = user.roles.includes(roleName)
      ? user.roles.filter((r) => r !== roleName)
      : [...user.roles, roleName];

    setUser({ ...user, roles: updatedRoles });
    setError("");
  };

  const validate = () => {
    if (user.roles.length === 0) return "Select at least one terminal security role";
    if (!/^[0-9]{10}$/.test(user.phoneNo)) return "Phone number must be exactly 10 digits";
    if (user.password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(user.password)) return "Add at least one uppercase letter (A-Z)";
    if (!/[0-9]/.test(user.password)) return "Add at least one numerical digit (0-9)";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/add",
        user
      );

      if (res.data.success === false) {
        return setError(res.data.message);
      }

      setError("");
      setSuccessMsg("Account provisions initialized. Redirecting...");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError("Registration rejected by gateway server");
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans text-left overflow-hidden select-none">

      {/* LEFT SPLIT PANEL: ANCHORED RETAILOS THEME CARD */}
      <div className="hidden md:flex w-5/12 bg-slate-900 text-white flex-col p-10 justify-between relative border-r border-slate-800">
        
        {/* BRAND LABEL HEAD AREA */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
            🛒
          </div>
          <span className="text-sm font-semibold tracking-wide uppercase text-slate-200">RetailOS POS</span>
        </div>

        {/* BOTTOM METADATA TEXT BLOCK */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
            Run your store terminal with <span className="text-blue-400">absolute control.</span>
          </h1>
          <p className="text-xs text-slate-400 mt-3 max-w-sm leading-relaxed">
            Onboard point-of-sale operators and backend managers instantly using high-granularity role security parameters.
          </p>
        </div>
        
        {/* FOOTER SYSTEM VERSION HINT */}
        <div className="text-[10px] text-slate-500 font-mono">
          v2.4.0-build // production_terminal
        </div>
      </div>

      {/* RIGHT SPLIT PANEL: FORM REGISTRATION AREA */}
      <div className="w-full md:w-7/12 flex justify-center items-center px-8 md:px-16 overflow-y-auto bg-slate-50 h-full">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm my-auto">

          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Create account</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">Provision credentials for a new system user</p>

          {/* DYNAMIC SYSTEM MESSAGES PANEL */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium p-3 rounded-xl mb-4 flex items-center gap-2 animate-shake">
              ⚠️ {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium p-3 rounded-xl mb-4 flex items-center gap-2">
              ✓ {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* FORM FIELD ROW 1 */}
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={user.name}
                  onChange={handleChange}
                  className="border border-slate-200 bg-slate-50 text-slate-800 p-2.5 rounded-lg w-full text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">Email Identity</label>
                <input
                  name="username"
                  type="email"
                  placeholder="operator@retailos.com"
                  value={user.username}
                  onChange={handleChange}
                  className="border border-slate-200 bg-slate-50 text-slate-800 p-2.5 rounded-lg w-full text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* FORM FIELD ROW 2 */}
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">Contact Number</label>
                <input
                  name="phoneNo"
                  type="text"
                  placeholder="10-digit phone"
                  value={user.phoneNo}
                  onChange={handleChange}
                  className="border border-slate-200 bg-slate-50 text-slate-800 p-2.5 rounded-lg w-full text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">System Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={user.password}
                    onChange={handleChange}
                    className="border border-slate-200 bg-slate-50 text-slate-800 p-2.5 rounded-lg w-full text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors text-xs"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            </div>

            {/* GATEWAY SYSTEM SECURITY ROLES SECTION */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">Assign Terminal Roles</label>
              
              <div className="grid md:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {rolesList.map((role) => {
                  const isActive = user.roles.includes(role.identifier);

                  return (
                    <div
                      key={role.id || role.identifier}
                      onClick={() => toggleRole(role.identifier)}
                      className={`p-3 border rounded-xl cursor-pointer flex gap-3 items-start transition-all duration-150 select-none
                        ${isActive 
                          ? "bg-blue-50/50 border-blue-500 shadow-sm" 
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/40"}
                      `}
                    >
                      {/* Stylized custom dynamic checkbox circle */}
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold mt-0.5 transition-all
                        ${isActive ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"}
                      `}>
                        {isActive && "✓"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{role.identifier}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-normal line-clamp-2">
                          {role.description || "Grants general console endpoint clearance."}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SUBMIT ACTION BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-500/10 transition-colors mt-2"
            >
              Initialize Account
            </button>
          </form>

          {/* SIGN IN DIRECTION BUTTON RE-LINK */}
          <p className="text-center text-xs text-slate-500 mt-5">
            Already registered on this terminal?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
            >
              Sign in
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;