import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, PhoneIcon, EnvelopeIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import api from '../api/axios';
import "./Register.css";

const Register = ( { onSuccess, onClose}) => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        username: '',
        password: '',
        roles: []
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [roles, setRoles] = useState([]);
    const [showRoleDropDown, setShowRoleDropDown] = useState(false);
    const [roleSearchTerm, setRoleSearchTerm] = useState('');
    const [isSearchingRoles, setIsSearchingRoles] = useState(false);

    const searchRoles = async (term) => {
        setIsSearchingRoles(true);
        try {
            const response = await api.post('/api/role/list', {
                page: 0,
                sizePerPage: 10,
                sortField: 'identifier',
                filter: term
            });
            setRoles(response.data.dtoList || []);
        } catch (err) {
            console.error('Error searching roles:', err);
        } finally {
            setIsSearchingRoles(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (roleSearchTerm) {
                searchRoles(roleSearchTerm);
            }
            else
            {
                setRoles([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [roleSearchTerm]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/api/registeruser/register', formData);
            setMessage("Success: " + response.data.message);
            alert('Registration successful!');
        } catch (err) {
            setMessage("Error: " + (err.response?.data?.message || "Registration failed"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const closeMenu = () => setShowRoleDropDown(false);
        window.addEventListener('click', closeMenu);
        return () => window.removeEventListener('click', closeMenu);
    }, []);





    return (
        <div className="page-wrapper">
            <div className="register-card">
                <div className="icon-header">
                    <UserIcon className="header-svg" />
                </div>
                
                <h2>Create Account</h2>
                <p className="subtitle">Join us to manage your business efficiently</p>

                {message && (
                    <div className={message.startsWith('Success') ? 'msg success' : 'msg error'}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleRegister} className="register-form">
                    <div className="input-container">
                        <label htmlFor='username' className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="input-wrapper">
                            <UserIcon className="field-icon" />
                            <input type="text" placeholder="Enter full name" required 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                    </div>

                    <div className="input-container">
                        <label>Phone Number</label>
                        <div className="input-wrapper">
                            <PhoneIcon className="field-icon" />
                            <input type="text" placeholder="10-digit number" 
                                onChange={(e) => setFormData({...formData, phoneNo: e.target.value})} />
                        </div>
                    </div>

                    <div className="input-container">
                        <label>Username / Email</label>
                        <div className="input-wrapper">
                            <EnvelopeIcon className="field-icon" />
                            <input type="text" placeholder="Enter username" required 
                                onChange={(e) => setFormData({...formData, username: e.target.value})} />
                        </div>
                    </div>

                    <div className="input-container">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <LockClosedIcon className="field-icon" />
                            <input type="password" placeholder="••••••••" required 
                                onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        </div>
                    </div>

                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <input type="text" placeholder="Search and select roles"
                            className="w-full p-2 border rounded focus:ring-blue-500 outline-none"
                            value={formData.roles}
                            onClick={() => setShowRoleDropDown(true)} 
                            onChange={(e) => { 
                                const val = e.target.value; 
                                setFormData({...formData, roles: val});
                                setRoleSearchTerm(val);
                            }} />
                        {showRoleDropDown && (roles.length > 0 || isSearchingRoles) && (
                            <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lgmax-h-60 overflow-auto">
                                {isSearchingRoles ? (
                                    <li className="p-2 text-sm text-gray-400">Searching...</li>
                                ) : (
                                    roles.map((role, idx) => (
                                        <li
                                            key={role.id || idx}
                                            className="p-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer border-b:border-none"
                                            onClick={() => {
                                                setFormData({...formData, roles: role.identifier});
                                                setShowRoleDropDown(false);
                                                setRoles([]);
                                            }}
                                            >
                                                {role.identifier}
                                            </li>
                                )))}
                            </ul>
                        )}
                    </div>

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Processing...' : 'Register'}
                    </button>
                </form>

                <div className="footer-link">
                    Don't have an account? <Link to="/login">Sign in here</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
