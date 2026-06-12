import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import MultiDropdown from "../components/dropdowns/MultiDropDown";

const C = {
  navy: "#363955", mid: "#54668E", light: "#879EC6",
  gray: "#E8E8E8", offWhite: "#F5F6E6", text: "#1e2235",
  muted: "#6b7280", white: "#ffffff",
  error: "#c0392b", errorBg: "#fdf2f2", errorBdr: "#f5c6c6",
  successBg: "#f0fdf4", successBdr: "#86efac", successText: "#166534",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: `linear-gradient(145deg, ${C.navy} 0%, ${C.mid} 100%)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif", padding: "24px 20px",
  },
  card: {
    backgroundColor: C.white, borderRadius: "14px",
    padding: "36px 36px 28px",
    width: "100%", maxWidth: "480px",
    boxShadow: "0 24px 60px rgba(54,57,85,0.4)",
  },
  header: { textAlign: "center", marginBottom: "26px" },
  badge: {
    display: "inline-block", padding: "3px 12px",
    borderRadius: "20px", backgroundColor: "rgba(84,102,142,0.09)",
    color: C.mid, fontSize: "10px", fontWeight: "700",
    letterSpacing: "1.2px", textTransform: "uppercase",
    border: "1px solid rgba(84,102,142,0.2)", marginBottom: "10px",
  },
  title: { fontSize: "21px", fontWeight: "700", color: C.navy, margin: "0 0 4px", letterSpacing: "-0.3px" },
  subtitle: { fontSize: "13px", color: C.muted, margin: 0 },
  field: { marginBottom: "14px" },
  label: {
    display: "block", fontSize: "12px",
    fontWeight: "600", color: "#374151", marginBottom: "5px", letterSpacing: "0.2px",
  },
  input: {
    width: "100%", padding: "9px 12px",
    border: `1.5px solid ${C.gray}`,
    borderRadius: "7px", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
    backgroundColor: "#fafafa", color: C.text,
  },
  inputError: { borderColor: C.error, backgroundColor: C.errorBg },
  errorText: { fontSize: "11px", color: C.error, marginTop: "3px" },
  button: {
    width: "100%", padding: "11px",
    background: `linear-gradient(135deg, ${C.navy}, ${C.mid})`,
    color: "#fff", border: "none",
    borderRadius: "8px", fontSize: "14px",
    fontWeight: "600", cursor: "pointer", marginTop: "8px",
    letterSpacing: "0.3px",
    boxShadow: `0 4px 14px rgba(54,57,85,0.3)`,
  },
  buttonDisabled: { background: "#c4c8d4", boxShadow: "none", cursor: "not-allowed" },
  successBox: {
    backgroundColor: C.successBg, border: `1px solid ${C.successBdr}`,
    color: C.successText, borderRadius: "8px",
    padding: "10px 14px", fontSize: "13px",
    marginBottom: "14px", textAlign: "center",
  },
  errorBox: {
    backgroundColor: C.errorBg, border: `1px solid ${C.errorBdr}`,
    color: C.error, borderRadius: "8px",
    padding: "10px 14px", fontSize: "13px",
    marginBottom: "14px", textAlign: "center",
  },
  footer: { textAlign: "center", marginTop: "18px", fontSize: "13px", color: C.muted },
  link: { color: C.mid, fontWeight: "600", textDecoration: "none", marginLeft: "4px" },
};

export default function Register() {
  const [form, setForm] = useState({ name: "", username: "", phoneNo: "", password: "" });
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: "" }));
  }

  function handleRolesChange(values) {
    setSelectedRoles(values);
    if (fieldErrors.roles) setFieldErrors(prev => ({ ...prev, roles: "" }));
  }

  function validate() {
    const errors = {};
    if (!form.name.trim()) errors.name = "Full name is required.";
    if (!form.username.trim()) errors.username = "Username is required.";
    if (!form.phoneNo.trim()) errors.phoneNo = "Phone number is required.";
    else if (!/^\d{7,15}$/.test(form.phoneNo.trim())) errors.phoneNo = "Phone must be 7–15 digits only.";
    if (selectedRoles.length === 0) errors.roles = "Please select at least one role.";
    if (!form.password) errors.password = "Password is required.";
    else if (form.password.length < 4) errors.password = "Password must be at least 4 characters.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const response = await api.post("/user/register", {
        name: form.name, username: form.username,
        phoneNo: form.phoneNo, password: form.password, roles: selectedRoles,
      });
      const data = response.data;
      if (data.success === true) {
        setMessage({ text: "Registration successful! Redirecting to login…", type: "success" });
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage({ text: data.message || "Registration failed. Please try again.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Server error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.badge}>New Account</div>
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Register a new RetailPOS user</p>
        </div>

        {message.text && (
          <div style={message.type === "success" ? styles.successBox : styles.errorBox}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister} noValidate>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text"
              style={{ ...styles.input, ...(fieldErrors.name ? styles.inputError : {}) }}
              placeholder="e.g. John Smith" value={form.name} onChange={handleChange} />
            {fieldErrors.name && <p style={styles.errorText}>{fieldErrors.name}</p>}
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input id="username" name="username" type="text"
              style={{ ...styles.input, ...(fieldErrors.username ? styles.inputError : {}) }}
              placeholder="e.g. johnsmith" value={form.username}
              onChange={handleChange} autoComplete="username" />
            {fieldErrors.username && <p style={styles.errorText}>{fieldErrors.username}</p>}
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="phoneNo">Phone Number</label>
            <input id="phoneNo" name="phoneNo" type="tel"
              style={{ ...styles.input, ...(fieldErrors.phoneNo ? styles.inputError : {}) }}
              placeholder="Digits only, 7–15 characters" value={form.phoneNo} onChange={handleChange} />
            {fieldErrors.phoneNo && <p style={styles.errorText}>{fieldErrors.phoneNo}</p>}
          </div>

          <MultiDropdown
            label="Assign Role(s)"
            apiUrl="/role/findByStatus"
            valueField="identifier" labelField="identifier"
            selectedValues={selectedRoles} onChange={handleRolesChange}
          />
          {fieldErrors.roles && (
            <p style={{ ...styles.errorText, marginTop: "-10px", marginBottom: "12px" }}>
              {fieldErrors.roles}
            </p>
          )}

          <div style={styles.field}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input id="password" name="password" type="password"
              style={{ ...styles.input, ...(fieldErrors.password ? styles.inputError : {}) }}
              placeholder="Min. 4 characters" value={form.password}
              onChange={handleChange} autoComplete="new-password" />
            {fieldErrors.password && <p style={styles.errorText}>{fieldErrors.password}</p>}
          </div>

          <button type="submit"
            style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
            disabled={loading}>
            {loading ? "Registering…" : "Register User →"}
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account?
          <Link to="/" style={styles.link}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}