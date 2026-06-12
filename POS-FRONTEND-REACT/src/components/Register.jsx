import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
function Register() {
    const navigate = useNavigate();
 
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [password, setPassword] = useState("");
 
    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [error, setError] = useState("");
 
    useEffect(() => {
        // GLOBAL PAGE FIX
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.backgroundColor = "#f4f6f9";
        document.body.style.overflowX = "hidden";
 
        const fetchRoles = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/role/list"
                );
 
                setRoles(response.data || []);
            } catch (err) {
                console.error("Error fetching roles:", err);
                setError("Failed to load roles");
            } finally {
                setLoadingRoles(false);
            }
        };
 
        fetchRoles();
    }, []);
 
    const handleRoleChange = (e) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
 
        setSelectedRoles(values);
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        if (
            !username ||
            !name ||
            !phoneNo ||
            selectedRoles.length === 0 ||
            !password
        ) {
            setError("Please fill all fields");
            return;
        }
 
        try {
            await axios.post("http://localhost:8080/register", {
                username,
                name,
                phoneNo,
                roles: selectedRoles,
                password,
            });
 
            alert("Registration Successful ✅");
            navigate("/login");
        } catch (error) {
            console.log(error);
            setError("Registration Failed ❌");
        }
    };
 
    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Register</h2>
 
                {error && (
                    <div style={styles.errorMessage}>
                        {error}
                    </div>
                )}
 
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                    </div>
 
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                        />
                    </div>
 
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            style={styles.input}
                        />
                    </div>
 
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Roles</label>
 
                        <select
                            multiple
                            value={selectedRoles}
                            onChange={handleRoleChange}
                            style={styles.multiSelect}
                        >
                            {loadingRoles ? (
                                <option>Loading roles...</option>
                            ) : (
                                roles.map((r, index) => (
                                    <option key={index} value={r.identifier}>
                                        {r.identifier}
                                    </option>
                                ))
                            )}
                        </select>
 
                        <small style={styles.helperText}>
                            Hold Ctrl (Windows) or Cmd (Mac) to select multiple roles
                        </small>
                    </div>
 
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
 
                    <button type="submit" style={styles.button}>
                        Register
                    </button>
                </form>
 
                <p style={styles.footerText}>
                    Already have an account?{" "}
                    <span
                        style={styles.loginLink}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
 
export default Register;
 
const styles = {
    page: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
    },
 
    card: {
        width: "500px",
        backgroundColor: "#ffffff",
        padding: "28px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        boxSizing: "border-box",
    },
 
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
 
    title: {
        textAlign: "center",
        color: "#222",
        fontWeight: "600",
        fontSize: "26px",
        margin: 0,
    },
 
    errorMessage: {
        padding: "8px",
        backgroundColor: "#ffe5e5",
        border: "1px solid #ffb3b3",
        color: "#d32f2f",
        borderRadius: "6px",
        textAlign: "center",
        fontSize: "13px",
    },
 
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
    },
 
    label: {
    textAlign: "left",
        fontSize: "14px",
        fontWeight: "500",
        color: "#333",
    },
 
    input: {
        width: "100%",
        padding: "9px 12px",
        borderRadius: "6px",
        border: "1px solid #cfcfcf",
        fontSize: "14px",
        backgroundColor: "#fff",
        color: "#222",
        boxSizing: "border-box",
        outline: "none",
    },
 
    multiSelect: {
        width: "100%",
        height: "95px",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #cfcfcf",
        fontSize: "14px",
        backgroundColor: "#fff",
        color: "#222",
        boxSizing: "border-box",
    },
 
    helperText: {
        fontSize: "11px",
        color: "#666",
        marginTop: "2px",
    textAlign: "left",
    },
 
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "16px",
    },
 
    footerText: {
        textAlign: "center",
        fontSize: "13px",
        color: "#555",
        margin: 0,
        marginTop: "2px",
    },
 
    loginLink: {
        color: "#1976d2",
        fontWeight: "500",
        cursor: "pointer",
    },
};