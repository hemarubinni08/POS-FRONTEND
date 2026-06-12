import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        roles: [],
        phoneNo: "",
        password: ""
    });

    const [rolesError, setRolesError] = useState("");
    const [availableRoles, setAvailableRoles] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
    const fetchRoles = async () => {
      setRolesError('')
 
      try {
        const response = await fetch('http://localhost:8080/api/role/findActiveStatus', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
 
        const responseText = await response.text()
        const data = responseText ? JSON.parse(responseText) : []
 
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load roles')
        }
 
        const activeRoles = Array.isArray(data)
          ? data.filter((role) => role.status !== false)
          : []
 
        setAvailableRoles(activeRoles)
      } catch (fetchRolesError) {
        setRolesError(fetchRolesError.message || 'Unable to load roles')
      }
    }
 
    fetchRoles()
  }, [])

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "username") {

            setFormData({
                ...formData,
                [name]: value.toLowerCase()
            });

        } else {

            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleRoleChange = (e) => {

        const selectedRoles = Array.from(
            e.target.selectedOptions,
            option => option.value
        );

        setFormData({
            ...formData,
            roles: selectedRoles
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8080/api/user/register",
                formData
            );

            console.log(response.data);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            console.log(error);

            setMessage("Registration Failed");
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#ffffff"
            }}
        >

            <div
                style={{
                    width: "430px",
                    background: "#fff",
                    padding: "35px 40px",
                    borderRadius: "16px",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
                }}
            >

                <h2
                    style={{
                        textAlign: "center",
                        color: "#4b6cb7"
                    }}
                >
                    User Registration
                </h2>

                {message && (
                    <p style={{ color: "red", textAlign: "center" }}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div style={{ marginBottom: "16px" }}>
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: "16px" }}>
                        <label>Email</label>

                        <input
                            type="email"
                            name="username"
                            required
                            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Enter valid email"
                            value={formData.username}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    {/* Roles */}
                    <div style={{ marginBottom: "16px" }}>
                        <label>Roles</label>

                        <select
                            multiple
                            required
                            value={formData.roles}
                            onChange={handleRoleChange}
                            style={{
                                ...inputStyle,
                                height: "120px"
                            }}
                        >

                            {availableRoles.map(role => (

    <option
        key={role.id}
        value={role.identifier}
    >
        {role.identifier}
    </option>

))}

                        </select>
                    </div>

                    {/* Phone */}
                    <div style={{ marginBottom: "16px" }}>
                        <label>Phone Number</label>

                        <input
                            type="text"
                            name="phoneNo"
                            required
                            pattern="[0-9]{10}"
                            title="Phone number must be 10 digits"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: "16px" }}>
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "13px",
                            background:
                                "linear-gradient(135deg,#4b6cb7,#182848)",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
};

export default Register;
