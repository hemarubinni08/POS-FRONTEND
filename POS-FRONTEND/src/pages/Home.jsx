import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { apiFetch } from '../utils/apiFetch';
import { API_BASE_URL } from '../config/api.config';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const username = localStorage.getItem('username');
            const response = await apiFetch(`${API_BASE_URL}/api/user/get?username=${username}`, {
                method: 'GET',
            });
            if (!response) return;
            const data = await response.json();
            setUser(data);
        };
        fetchUser();
    }, []);

    return (
        <Layout>
            <div className='p-6'>
                {/* Header */}
                <div className='mb-6'>
                    <h1 className='text-xl font-bold text-gray-800'>
                        Welcome, {user?.name || 'User'}
                    </h1>
                    <p className='text-sm text-gray-500 mt-0.5'>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                    <div className='bg-white border border-gray-200 rounded-lg p-4'>
                        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Logged in as</p>
                        <p className='text-sm font-semibold text-gray-800'>{user?.username}</p>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-lg p-4'>
                        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Role</p>
                        <div className='flex gap-1 flex-wrap'>
                            {user?.roles?.map((role, index) => (
                                <span key={index} className='bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded'>
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-lg p-4'>
                        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Phone</p>
                        <p className='text-sm font-semibold text-gray-800'>{user?.phoneNo}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className='bg-white border border-gray-200 rounded-lg p-4'>
                    <h2 className='text-sm font-semibold text-gray-700 mb-3'>Quick Access</h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                        {[
                            { label: 'Products', path: '/product' },
                            { label: 'Brands', path: '/brand' },
                            { label: 'Categories', path: '/category' },
                            { label: 'Users', path: '/user' },
                        ].map((action) => (
                            <button
                                key={action.label}
                                onClick={() => navigate(action.path)}
                                className='text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg py-3 px-4 text-left transition'
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;