import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

function Register(){
    
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const navigate = useNavigate();

    const handleRegister = async (e) =>{
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/user/add', {
                username,
                name,
                password,
                phoneNo,
                roles: selectedRoles
            });

            const data = response.data;
            if(data.success){
                alert('Registration successful!');
                navigate('/login');
            }
            else{
                alert('Registration failed: ' + (data.message || 'Unknown error'));
            };
        } catch (error) {
            alert('Registration failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
        }
    };
    useEffect(() => {
        const fetchRoles = async () => {
            const response = await axios.get('http://localhost:8080/api/role/findAllActive');
            const data = response.data || [];
            setRoles(Array.isArray(data) ? data : []);
        };
        fetchRoles();
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4'>
            <div className='bg-white rounded-2xl shadow-xl p-10 w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-extrabold text-red-800'>Create Account</h1>
                    <p className='text-gray-500 text-sm mt-2'>Register a new POS user</p>
                </div>
                <form onSubmit={handleRegister} className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Username</label>
                        <input
                            type='email'
                            placeholder='Enter username'
                            onChange={(e) => setUsername(e.target.value)}
                            className='border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Name</label>
                        <input
                            type='text'
                            placeholder='Enter full name'
                            onChange={(e) => setName(e.target.value)}
                            className='border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Password</label>
                        <input
                            type='password'
                            minLength={6}
                            placeholder='Enter password'
                            onChange={(e) => setPassword(e.target.value)}
                            className='border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Phone Number</label>
                        <input
                            type='tel'
                            pattern='[0-9]{10}'
                            maxLength={10}
                            placeholder='Enter phone number'
                            onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            className='border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Roles</label>
                        <select
                            multiple
                            onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                setSelectedRoles(selected);
                            }}
                            className='border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition'
                        >
                            {roles.map((role) => (
                                <option key={role.identifier} value={role.identifier}>
                                    {role.identifier}
                                </option>
                            ))}
                        </select>
                        <p className='text-xs text-gray-400 mt-1'>Hold Ctrl to select multiple roles</p>
                    </div>
                    <button
                        type='submit'
                        className='bg-indigo-600 text-white rounded-xl py-3 font-bold text-sm hover:bg-indigo-700 transition mt-2'
                    >
                        Register
                    </button>
                    <div className='text-center'>
                        <span className='text-gray-500 text-sm'>Already have an account? </span>
                        <button
                            type='button'
                            onClick={() => navigate('/login')}
                            className='text-indigo-600 text-sm font-semibold hover:underline'
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Register;
