import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Shoaib from "../Component/demo/component";
import Srujan from "../Component/demo/srujan";
function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () =>{
      try {
        const response = await axiosInstance.post('/authenticate', 
        { username, password });
        const data = response.data;

        if (data.token && data.token !== 'Error') {
          alert('Login successful!');
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', username);
          navigate('/profile');
        } else {
          alert('Login failed: ' + (data.message || 'Unknown error'));
        }
      } catch (error) {
        alert('Login failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
      }
    };
   return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <Shoaib username="ShoaibEjaz" title="Welcome to Shoaib's Component!" name="Shoaib Ejaz" message="This is a message passed as a prop." />
  <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-200">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
          POS
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to continue to your POS dashboard.
        </p>
      </div>

      <div className="space-y-5">
        <input
          type="email"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />

        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
        >
          Login
             </button>
             <Srujan username="Srujannnn" age={25} />
      </div>
    </div>
  </div>
  </div>
)
}

export default Login;
