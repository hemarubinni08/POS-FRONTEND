import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
import { loginUser } from "../../services/authService";
 
function LoginPage() {
 
    const [username, setUsername] = useState("");
 
    const [password, setPassword] = useState("");
 
    const navigate = useNavigate();
 
    const handleLogin = async (e) => {
 
        e.preventDefault();
 
        try {
 
            const response = await loginUser({
 
                username,
                password,
            });
 
            if (response.data.token === "Error") {
 
                alert("Invalid Credentials");
 
                return;
            }
 
            localStorage.setItem(
                "token",
                response.data.token
            );
 
            navigate("/dashboard");
 
        } catch (error) {
 
            console.log(error);
 
            alert("Login Failed");
        }
    };
 
    return (
 
        <div>
 
            <h1>POS Login</h1>
 
            <form onSubmit={handleLogin}>
 
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />
 
                <br /><br />
 
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
 
                <br /><br />
 
                <button type="submit">
                    Login
                </button>
 
            </form>
 
        </div>
    );
}
 
export default LoginPage;