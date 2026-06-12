import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:8080/api/authenticate",
                {
                    username: username,
                    password: password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Full response:", response);
            console.log("Response data:", response.data);

            // Extract token from possible fields
            const token =
                response.data.token ||
                response.data.jwt ||
                response.data.accessToken ||
                response.data.jwtToken;

            if (token) {

    localStorage.setItem("token", token);

    localStorage.setItem(
        "user",
        JSON.stringify({
            name: response.data.name,
            username: response.data.username,
            phoneNo: response.data.phoneNo,
            roles: response.data.roles
        })
    );

    navigate("/dashboard");
} else {

                console.warn(
                    "Login succeeded but token not found:",
                    response.data
                );

                setError("Login succeeded but token was not received.");

            }

        } catch (error) {

            console.error("Login error status:", error.response?.status);
            console.error("Login error data:", error.response?.data);
            console.error("Login error message:", error.message);

            if (error.response?.status === 401) {

                setError("Invalid username or password.");

            } else if (error.response?.status === 403) {

                setError("Access forbidden. Check backend CORS/security.");

            } else if (error.code === "ERR_NETWORK") {

                setError(
                    "Cannot connect to server. Is Spring Boot running on port 8080?"
                );

            } else {

                setError(
                    error.response?.data?.message ||
                    "Login failed. Check console for details."
                );

            }

        } finally {

            setLoading(false);

        }
    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "#0f1010",
                fontFamily: "Arial"
            }}
        >

            <form
                onSubmit={handleLogin}
                style={{
                    width: "340px",
                    background: "#ffffff",
                    padding: "30px",
                    borderRadius: "16px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
                }}
            >

                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "25px",
                        color: "#2b5ff9"
                    }}
                >
                    POS Login
                </h2>

                {/* Error Message */}
                {error && (
                    <div
                        style={{
                            color: "#b00020",
                            background: "#ffeaea",
                            border: "1px solid #ffb3b3",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "18px",
                            fontSize: "14px"
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Username */}
                <div style={{ marginBottom: "18px" }}>

                    <label
                        style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600"
                        }}
                    >
                        Username
                    </label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>

                {/* Password */}
                <div style={{ marginBottom: "22px" }}>

                    <label
                        style={{
                            display: "block",
                            marginBottom: "6px",
                            fontWeight: "600"
                        }}
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        border: "none",
                        borderRadius: "10px",
                        background:
                            "linear-gradient(135deg, #4b6cb7, #182848)",
                        color: "white",
                        fontSize: "15px",
                        fontWeight: "600",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

        </div>
    );
}

export default Login;