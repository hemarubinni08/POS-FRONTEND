import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { apiFetch } from '../utils/apiFetch';
import { API_BASE_URL } from '../config/api.config';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const username = localStorage.getItem('username');
            const response = await apiFetch(`${API_BASE_URL}/api/user/get?username=${username}`, {
                method: 'GET',
            });
            if (!response) return;
            const data = await response.json();
            setUser(data);
        };
        fetchProfile();
    }, []);

    if (!user) return (
        <Layout>
            <div className='flex justify-center items-center h-64'>
                <p className='text-gray-400 text-sm'>Loading...</p>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className='p-6'>
                <div className='mb-6'>
                    <h1 className='text-xl font-bold text-gray-800'>Profile</h1>
                    <p className='text-sm text-gray-500 mt-0.5'>Your account details</p>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg overflow-hidden max-w-lg'>
                    <div className='bg-gray-800 px-6 py-5'>
                        <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3'>
                            <span className='text-lg font-bold text-white'>
                                {user.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <h2 className='text-base font-bold text-white'>{user.name}</h2>
                        <p className='text-sm text-gray-400'>{user.username}</p>
                    </div>

                    <div className='divide-y divide-gray-100'>
                        <div className='px-6 py-4'>
                            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Full Name</p>
                            <p className='text-sm font-medium text-gray-800'>{user.name}</p>
                        </div>
                        <div className='px-6 py-4'>
                            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Email</p>
                            <p className='text-sm font-medium text-gray-800'>{user.username}</p>
                        </div>
                        <div className='px-6 py-4'>
                            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Phone</p>
                            <p className='text-sm font-medium text-gray-800'>{user.phoneNo}</p>
                        </div>
                        <div className='px-6 py-4'>
                            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Roles</p>
                            <div className='flex gap-2 flex-wrap mt-1'>
                                {user.roles?.map((role, index) => (
                                    <span key={index} className='bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded'>
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;