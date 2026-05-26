import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api.config';
import { apiFetch } from '../utils/apiFetch';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        phoneNo: '',
    });
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch(`${API_ENDPOINTS.USER}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, roles: selectedRoles })
            });
            if (!response) return;

            const data = await response.json();

            if (data.success) {
                setSuccess('User registered successfully');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.ROLE}/active`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response) return;
                const data = await response.json();
                setRoles(data);
            } catch (err) {
                console.error('Failed to fetch roles:', err);
            }
        };
        fetchRoles();
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4'>
            <div className='bg-white rounded-2xl shadow-xl p-10 w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-extrabold text-gray-800'>Create Account</h1>
                    <p className='text-gray-500 text-sm mt-2'>Register a new POS user</p>
                </div>

                {error && (
                    <div className='bg-red-50 text-red-500 text-sm text-center px-4 py-3 rounded-xl mb-4'>
                        {error}
                    </div>
                )}
                {success && (
                    <div className='bg-green-50 text-green-600 text-sm text-center px-4 py-3 rounded-xl mb-4'>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Email</label>
                        <input
                            type='email'
                            name='username'
                            placeholder='Enter email'
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className='border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Full Name</label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter full name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Password</label>
                        <input
                            type='password'
                            name='password'
                            minLength={6}
                            placeholder='Enter password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className='border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Phone Number</label>
                        <input
                            type='tel'
                            name='phoneNo'
                            pattern='[0-9]{10}'
                            maxLength={10}
                            placeholder='Enter 10 digit phone number'
                            value={formData.phoneNo}
                            onKeyDown={(e) => {
                                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                                    e.preventDefault();
                                }
                            }}
                            onChange={handleChange}
                            required
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
                        disabled={loading}
                        className='bg-indigo-600 text-white rounded-xl py-3 font-bold text-sm hover:bg-indigo-700 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Registering...' : 'Register'}
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