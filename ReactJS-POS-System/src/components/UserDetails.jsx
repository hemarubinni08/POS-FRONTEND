import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, UserCircleIcon, PhoneIcon, EnvelopeIcon, ShieldCheckIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';
import api from '../api/axios';
import "./UserDetails.css";

const UserDetails = () => {
    const [searchName, setSearchName] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingField, setEditingField] = useState(null);
    const [rolelist, setRolesList] = useState([]);
    const [showRoleDropDown, setShowRoleDropDown] = useState(false);
    const [roleSearchTerm, setRoleSearchTerm] = useState('');
    const [isSearchingRoles, setIsSearchingRoles] = useState(false);
    
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setUserData(null);
        setEditingField(null);

        try {
            const response = await api.post('/api/user/listuser', null, {
                params: { username: searchName }
            });
            setUserData(response.data);
        } catch (err) {
            setError(err.response?.status === 404 ? 'User not found' : 'Error fetching user details');
        } finally {
            setLoading(false);
        }
    };

    //Search Logic for roles
    const searchRoles = async (term) => {
        setIsSearchingRoles(true);
        try
        {
            const response = await api.post('/api/role/list',{
                page: 0,
                sizePerPage: 10,
                sortField: 'identifier',
                filter:term
            });
            setRolesList(response.data.dtoList || []);
        }
        catch (err)
        {
            console.error("Role search failed", err);
        }
        finally 
        {
            setIsSearchingRoles(false);
        }
    };

    //Debounce for role search
    useEffect(() => {
        const timer = setTimeout(() => {
        if(roleSearchTerm) searchRoles(roleSearchTerm);
        else setRolesList([]);
    }, 300);
    return () => clearTimeout(timer);
    }, [roleSearchTerm]);

    useEffect(() => {
        const closeMenu = () => setShowRoleDropDown(false);
        window.addEventListener('click', closeMenu);
        return () => window.removeEventListener('click', closeMenu);
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const nameRegex = /^[a-zA-Z\s-']{2,50}$/;
        if (!nameRegex.test(userData.name))
        {
            alert("Please enter a valid name (2-50 letters only)");
            return;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if(!phoneRegex.test(userData.phoneNo))
        {            alert("Please enter a valid 10-digit phone number");
            return;
        }

        if(!userData.roles || userData.roles.length === 0|| userData.roles[0].trim() === "")
        {
            alert("Atleast one role must be assigned");
            return;
        }
        setUpdateLoading(true);
        try{
            await api.post('/api/user/update', userData);
            alert("User details updated");
            setEditingField(null);
        }catch(err)
        {
            alert("Failed to update"+(err.response?.data?.message || "Server error"));
        }finally{
            setUpdateLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="search-card">
                <div className="icon-header">
                    <MagnifyingGlassIcon className="header-svg" />
                </div>
                
                <h2>User Directory</h2>
                <p className="subtitle">Find and view detailed member information</p>

                <form onSubmit={handleSearch} className="search-form">
                    <div className="input-wrapper">
                        <EnvelopeIcon className="field-icon" />
                        <input 
                            type="text" 
                            placeholder="Enter username to search..." 
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Searching...' : 'Search User'}
                    </button>
                </form>

                {error && <div className="msg error">{error}</div>}

                {/* Success State: User Details Card */}
                {userData && (
                    <div className="details-box">
                        <div className="detail-item">
                            <UserCircleIcon className="detail-icon" />
                            <div>
                                <label>Full Name</label>
                                {editingField === "name" ? (
                                    <input
                                        className="edit-input active"
                                        autoFocus
                                        value={userData.name}
                                        onChange = {(e) => setUserData({...userData, name: e.target.value})}
                                        />
                                ):(
                                    <p className="static-text">{userData.name}</p>
                                )
                                }
                            </div>
                            <button className='edit-toggle-btn' onClick={() => setEditingField(editingField === 'name' ? null : 'name')}>
                                {editingField === 'name' ? <CheckIcon className="edit-small-icon green" /> : <PencilSquareIcon className="edit-small-icon" />}
                            </button>
                        </div>
                        <div className="detail-item">
                            <EnvelopeIcon className="detail-icon" />
                            <div>
                                <label>Username / Email</label>
                                <p className="static-text readonly">{userData.username}</p>
                            </div>
                        </div>


                        <div className="detail-item">
                            <PhoneIcon className="detail-icon" />
                            <div className="edit-group">
                                <label>Phone Number</label>
                                {editingField === "phoneNo" ? (
                                    <input
                                        className="edit-input active"
                                        autoFocus
                                        maxLength="10"
                                        value={userData.phoneNo}
                                        onChange={(e) => setUserData({...userData, phoneNo: e.target.value.replace(/\D/g, '')})}
                                        />

                                    ): (
                                        <p className="static-text">{userData.phoneNo || "Not provided"}</p>
                                    )}
                            </div>
                            <button className="edit-toggle-btn" onClick={() => setEditingField(editingField === 'phoneNo' ? null : 'phoneNo')}>
                                {editingField === 'phoneNo' ? <CheckIcon className="edit-small-icon green" /> : <PencilSquareIcon className="edit-small-icon" />}
                            </button>
                        </div>
                        <div className="detail-item">
    <ShieldCheckIcon className="detail-icon" />
    <div className='edit-group' onClick={(e) => e.stopPropagation()}>
        <label>Assigned Roles</label>
        {editingField === "roles" ? (
            <div className="relative w-full">
                <input
                    className="edit-input active"
                    autoFocus
                    placeholder="Search roles..."
                    value={roleSearchTerm}
                    onFocus={() => setShowRoleDropDown(true)}
                    onChange={(e) => setRoleSearchTerm(e.target.value)}
                />
                
                {/* Search Results Dropdown */}
                {showRoleDropDown && (rolesList.length > 0 || isSearchingRoles) && (
                    <ul className="absolute z-[100] w-full bg-white border border-gray-200 rounded-md mt-1 shadow-xl max-h-40 overflow-auto list-none p-0 left-0">
                        {isSearchingRoles ? (
                            <li className="p-2 text-sm text-gray-400">Searching...</li>
                        ) : (
                            rolesList.map((role, idx) => (
                                <li
                                    key={role.id || idx}
                                    className="p-2 text-sm text-gray-800 hover:bg-blue-600 hover:text-white cursor-pointer border-b last:border-none"
                                    onClick={() => {
                                        // Adding the role to the array if it's not already there
                                        if (!userData.roles.includes(role.identifier)) {
                                            setUserData({
                                                ...userData, 
                                                roles: [...userData.roles, role.identifier]
                                            });
                                        }
                                        setShowRoleDropDown(false);
                                        setRoleSearchTerm(''); // Clear search after selection
                                    }}
                                >
                                    {role.identifier}
                                </li>
                            ))
                        )}
                    </ul>
                )}
                
                {/* Chips for already assigned roles */}
                <div className="flex flex-wrap gap-1 mt-2">
                    {userData.roles?.map((r, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs flex items-center gap-1">
                            {r}
                            <button 
                                onClick={() => setUserData({...userData, roles: userData.roles.filter(item => item !== r)})}
                                className="text-blue-900 font-bold ml-1"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        ) : (
            <p className="static-text">{userData.roles?.join(', ') || 'Standard User'}</p>
        )}
    </div>
    <button className="edit-toggle-btn" onClick={() => {
        setEditingField(editingField === "roles" ? null : 'roles');
        setRoleSearchTerm(''); // Reset search when toggling
    }}>
        {editingField === "roles" ? <CheckIcon className="edit-small-icon green" /> : <PencilSquareIcon className="edit-small-icon" />}
    </button>
</div>


                <div className="footer-link-group">
                    <Link to="/login">Back to Dashboard</Link>
                    <Link to="/productRegistration" className='footer-link-group'>
                        Manage Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
