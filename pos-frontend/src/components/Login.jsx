// import React, { useState } from 'react';
// import api from './api/axios';

// // Basic Login Form using fetch API
// const Login = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:8080/api/authenticate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem('token', data.token); // Store JWT token
//         alert('Login successful!');
//       } else {
//         setError(data.message || 'Login failed');
//       }
//     } catch (err) {
//       setError('Connection error');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" type="email" onChange={handleChange} required />
//       <input name="password" type="password" onChange={handleChange} required />
//       <button type="submit">Login</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };
// export default Login;
import React, { useState } from 'react';
import api from '../api/axios'; // This uses your custom axios instance

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/authenticate', credentials);
      
      if (response.data.token && response.data.token !== "Error") {
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Connection error: Is the backend running?');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Username"
        onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password"
        onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
        required 
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;

