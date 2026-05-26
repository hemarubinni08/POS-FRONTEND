import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiFetch } from '../utils/apiFetch';
import { API_BASE_URL } from '../config/api.config';

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                const response = await apiFetch(`${API_BASE_URL}/api/node/getroles`, {
                    method: 'GET',
                });
                if (!response) return;
                const data = await response.json();
                setNodes(data);
            } catch (err) {
                console.error('Failed to fetch nodes:', err);
            }
        };
        fetchNodes();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className='w-56 h-screen bg-gray-900 flex flex-col justify-between overflow-y-auto'>
            {/* Logo */}
            <div>
                <div className='px-5 py-5 border-b border-gray-700'>
                    <h1 className='text-base font-bold text-white tracking-wide'>🏪 POS System</h1>
                    <p className='text-xs text-gray-500 mt-0.5'>Retail Management</p>
                </div>

                {/* Menu */}
                <div className='px-3 py-4'>
                    <p className='text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 px-2'>Navigation</p>
                    <div className='flex flex-col gap-0.5'>
                        <button
                            onClick={() => navigate('/home')}
                            className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                                isActive('/home')
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/profile')}
                            className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                                isActive('/profile')
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            Profile
                        </button>
                        {nodes.map((node) => (
                            <button
                                key={node.identifier}
                                onClick={() => navigate(`/${node.identifier.toLowerCase()}`)}
                                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                                    isActive(`/${node.identifier.toLowerCase()}`)
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                {node.identifier}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Logout */}
            <div className='px-3 py-4 border-t border-gray-700'>
                <button
                    onClick={handleLogout}
                    className='w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 transition'
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;