import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Profile = () => {
 
    const navigate = useNavigate();
 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
 
    useEffect(() => {
        fetchProfile();
    }, []);
 
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            const response = await axios.get(
                `http://localhost:8080/api/user/get?username=${username}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
 
            setUser(response.data);
 
        } catch (err) {
            console.error(err);
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };
 
    // Back button function
    const handleBack = () => {
        navigate('/home');
    };
 
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-blue-700">
                Loading Profile...
            </div>
        );
    }
 
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
                {error}
            </div>
        );
    }
 
    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center p-10">
 
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border-t-4 border-blue-600 overflow-hidden">
 
                {/* HEADER */}
                <div className="bg-blue-600 text-white p-8">
                    <h1 className="text-3xl font-bold">
                        User Profile
                    </h1>
                    <p className="text-blue-100 mt-2">
                        Account Details
                    </p>
                </div>
 
                {/* BODY */}
                <div className="p-8 space-y-6">
 
                    <div>
                        <p className="text-sm text-blue-500">
                            Full Name
                        </p>
                        <h2 className="text-xl font-semibold text-blue-900">
                            {user?.name}
                        </h2>
                    </div>
 
                    <div>
                        <p className="text-sm text-blue-500">
                            Email
                        </p>
                        <h2 className="text-xl font-semibold text-blue-900">
                            {user?.username}
                        </h2>
                    </div>
 
                    <div>
                        <p className="text-sm text-blue-500">
                            Phone Number
                        </p>
                        <h2 className="text-xl font-semibold text-blue-900">
                            {user?.phoneNo}
                        </h2>
                    </div>
 
                    {/* ROLES */}
                    <div>
                        <p className="text-sm text-blue-500 mb-2">
                            Roles
                        </p>
 
                        <div className="flex flex-wrap gap-3">
                            {user?.roles && user.roles.length > 0
                                ? user.roles.map((role, index) => (
                                      <span
                                          key={index}
                                          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                                      >
                                          {typeof role === 'object'
                                              ? role.identifier || role.name
                                              : role}
                                      </span>
                                  ))
                                : (
                                      <p className="text-blue-300 text-sm">
                                          No roles assigned
                                      </p>
                                  )}
                        </div>
                    </div>
 
                    {/* BACK BUTTON */}
                    <div className="flex justify-center pt-6">
                        <button
                            onClick={handleBack}
                            className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
                        >
                            Back
                        </button>
                    </div>
 
                </div>
            </div>
        </div>
    );
};
 
export default Profile;