import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance";
import Layout from '../Component/Layout';

function Profile(){
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchUserData = async (username) => {
            try {
                const response = await axiosInstance.get('/user/get', { params: { username } });
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };
        fetchUserData(username);
    }, []);

    return(
        <Layout>
            <div className='w-full max-w-2xl'>
                <div className='mb-8'>
                    <p className='text-sm font-semibold uppercase tracking-wide text-blue-600'>Account</p>
                    <h2 className='mt-2 text-3xl font-bold text-slate-900'>Profile</h2>
                    <p className='mt-2 text-sm text-slate-500'>Your saved user information and assigned roles.</p>
                </div>

                <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='rounded-xl bg-slate-50 p-4'>
                            <p className='text-xs font-semibold uppercase text-slate-400'>Name</p>
                            <p className='mt-2 text-base font-semibold text-slate-900'>{userData.name || 'Not available'}</p>
                        </div>
                        <div className='rounded-xl bg-slate-50 p-4'>
                            <p className='text-xs font-semibold uppercase text-slate-400'>Username</p>
                            <p className='mt-2 break-words text-base font-semibold text-slate-900'>{userData.username || 'Not available'}</p>
                        </div>
                        <div className='rounded-xl bg-slate-50 p-4'>
                            <p className='text-xs font-semibold uppercase text-slate-400'>Phone No</p>
                            <p className='mt-2 text-base font-semibold text-slate-900'>{userData.phoneNo || 'Not available'}</p>
                        </div>
                        <div className='rounded-xl bg-slate-50 p-4'>
                            <p className='text-xs font-semibold uppercase text-slate-400'>Roles</p>
                            <p className='mt-2 text-base font-semibold text-slate-900'>{userData.roles?.join(', ') || 'Not available'}</p>
                        </div>
                    </div>

                    <button onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        navigate('/login');
                    }} className='mt-6 w-full rounded-xl bg-red-500 px-4 py-3 font-semibold text-white shadow-lg shadow-red-100 transition hover:bg-red-600'>
                        Logout
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
