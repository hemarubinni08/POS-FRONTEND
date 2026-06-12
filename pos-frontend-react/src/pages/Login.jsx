import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const C = {
  navy:    "#363955",
  mid:     "#54668E",
  light:   "#879EC6",
  gray:    "#E8E8E8",
  offWhite:"#F5F6E6",
  text:    "#1e2235",
  muted:   "#6b7280",
  white:   "#ffffff",
  error:   "#c0392b",
  errorBg: "#fdf2f2",
  errorBdr:"#f5c6c6",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: `linear-gradient(145deg, ${C.navy} 0%, ${C.mid} 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
  },
  wrapper: {
    display: "flex",
    width: "100%",
    maxWidth: "820px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 24px 60px rgba(54,57,85,0.45)",
  },
  panel: {
    width: "240px",
    background: `linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
    padding: "40px 28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRight: "1px solid rgba(135,158,198,0.2)",
  },
  panelLogo: { fontSize: "36px", marginBottom: "16px" },
  panelTitle: {
    fontSize: "22px", fontWeight: "700", color: "#fff",
    marginBottom: "8px", letterSpacing: "-0.3px",
  },
  panelSub: { fontSize: "13px", color: "rgba(232,232,232,0.6)", lineHeight: "1.5", marginBottom: "24px" },
  panelFeatures: { display: "flex", flexDirection: "column", gap: "10px" },
  panelFeature: { display: "flex", alignItems: "center", gap: "8px", color: "rgba(232,232,232,0.75)", fontSize: "12px" },
  featureDot: { width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.light, flexShrink: 0 },
  card: {
    flex: 1,
    backgroundColor: C.white,
    padding: "40px 36px",
  },
  header: { marginBottom: "28px" },
  label_top: {
    display: "inline-block",
    fontSize: "10px", fontWeight: "700", color: C.mid,
    letterSpacing: "1.2px", textTransform: "uppercase",
    backgroundColor: "rgba(84,102,142,0.08)",
    border: "1px solid rgba(84,102,142,0.2)",
    padding: "3px 10px", borderRadius: "20px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "22px", fontWeight: "700", color: C.navy,
    margin: "0 0 4px", letterSpacing: "-0.3px",
  },
  subtitle: { fontSize: "13px", color: C.muted, margin: 0 },
  field: { marginBottom: "16px" },
  label: {
    display: "block", fontSize: "12px",
    fontWeight: "600", color: "#374151",
    marginBottom: "6px", letterSpacing: "0.2px",
  },
  input: {
    width: "100%", padding: "10px 13px",
    border: `1.5px solid ${C.gray}`,
    borderRadius: "8px", fontSize: "14px",
    outline: "none", boxSizing: "border-box",
    backgroundColor: "#fafafa",
    color: C.text,
    transition: "border-color 0.2s",
  },
  inputFocus: { borderColor: C.light },
  inputError: { borderColor: C.error, backgroundColor: C.errorBg },
  errorText: { fontSize: "11px", color: C.error, marginTop: "4px" },
  button: {
    width: "100%", padding: "11px",
    background: `linear-gradient(135deg, ${C.navy}, ${C.mid})`,
    color: "#fff", border: "none",
    borderRadius: "8px", fontSize: "14px",
    fontWeight: "600", cursor: "pointer",
    marginTop: "8px",
    letterSpacing: "0.3px",
    boxShadow: `0 4px 14px rgba(54,57,85,0.3)`,
  },
  buttonDisabled: {
    background: "#c4c8d4",
    boxShadow: "none",
    cursor: "not-allowed",
  },
  errorBox: {
    backgroundColor: C.errorBg,
    border: `1px solid ${C.errorBdr}`,
    color: C.error,
    borderRadius: "8px", padding: "10px 14px",
    fontSize: "13px", marginBottom: "16px", textAlign: "center",
  },
  footer: {
    textAlign: "center", marginTop: "20px",
    fontSize: "13px", color: C.muted,
  },
  link: {
    color: C.mid, fontWeight: "600",
    textDecoration: "none", marginLeft: "4px",
  },
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validate() {
    const errors = {};
    if (!username.trim()) errors.username = "Username is required.";
    if (!password.trim()) errors.password = "Password is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const response = await api.post("/authenticate", { username, password });
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        setServerError("Invalid username or password.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setServerError("Invalid username or password.");
      } else {
        setServerError("Cannot reach server. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>

        {/* Left branding panel */}
        <div style={styles.panel}>
          <div style={styles.panelLogo}>🛒</div>
          <h2 style={styles.panelTitle}>RetailPOS</h2>
          <p style={styles.panelSub}>Your complete point-of-sale solution for modern retail.</p>
          <div style={styles.panelFeatures}>
            {["Real-time inventory", "Fast billing", "Sales analytics", "Multi-user roles"].map(f => (
              <div key={f} style={styles.panelFeature}>
                <div style={styles.featureDot} />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div style={styles.card}>
          <div style={styles.header}>
            <span style={styles.label_top}>Secure Sign In</span>
            <h1 style={styles.title}>Welcome back</h1>
            <p style={styles.subtitle}>Sign in to your RetailPOS account</p>
          </div>

          {serverError && <div style={styles.errorBox}>{serverError}</div>}

          <form onSubmit={handleLogin} noValidate>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="username">Username</label>
              <input
                id="username" type="text"
                style={{ ...styles.input, ...(fieldErrors.username ? styles.inputError : {}) }}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (fieldErrors.username) setFieldErrors(p => ({ ...p, username: "" }));
                }}
              />
              {fieldErrors.username && <p style={styles.errorText}>{fieldErrors.username}</p>}
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="password">Password</label>
              <input
                id="password" type="password"
                style={{ ...styles.input, ...(fieldErrors.password ? styles.inputError : {}) }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors(p => ({ ...p, password: "" }));
                }}
              />
              {fieldErrors.password && <p style={styles.errorText}>{fieldErrors.password}</p>}
            </div>

            <button
              type="submit"
              style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <div style={styles.footer}>
            Don't have an account?
            <Link to="/register" style={styles.link}>Create one</Link>
          </div>
        </div>

      </div>
    </div>
  );
}