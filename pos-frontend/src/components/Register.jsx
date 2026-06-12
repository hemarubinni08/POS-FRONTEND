import React, {useState} from 'react';
import api from '../api/axios';
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        username: '',
        password: '',
        roles: []
    });
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post('/api/registeruser/register', formData);
            setMessage("Success: "+response.data.message);
            alert('Registration successful!');
        }
        catch(err){
            setMessage("Error: " + (err.response?.data?.message || "Registration failed"));
        }
    };

    return (
        <div className="register-box">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Full Name" required
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input type="text" placeholder="Phone Number" 
                    onChange={(e) => setFormData({...formData, phoneNo: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="email" required
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <input
                    type="password"
                    placeholder = "Password" required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <input
                    type="text"
                    placeholder = "Role" required
                    onChange={(e) => setFormData({...formData, roles: [e.target.value]})}
                />
                <button type="submit">Register</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Register;