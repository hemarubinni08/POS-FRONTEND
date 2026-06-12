"use client";

import { useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CommonList from "@/component/CommonList";
import Modal from "@/component/Modal";
import UserRegistration from "./UserRegistration";
import UserEdit from "./UserEdit";
import api from "../api/axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [displayUsers, setDisplayUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [sizePerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const userColumns =
    [
        {
            header: "Name",
            key: "name"
        },
        {
            header: "Phone Number",
            key: "phoneNo"
        },
        {
            header: "Role",
            key: "roles"
        },
        {
            header: "Username",
            key: "username"
        }
    ];

    const fetchUsers = async () => {
        setLoading(true);
        try{
            const response = await api.post("/api/user/list",
            {
                page,
                sizePerPage,
                sortField: "name"
            });
            const data = response.data.dtoList || [];
            setUsers(data);
            setDisplayUsers(data);
            setTotalPage(response.data.totalPage || 0);
        }
        catch(err)
        {
            console.error(err);
            setUsers([]);
            setDisplayUsers([]);
        }
        finally
        {
            setLoading(false);
        }
    };
    useEffect(() => {

    if(openModal)
    {
        document.body.style.overflow = "hidden";
    }
    else
    {
        document.body.style.overflow = "auto";
    }

    return () => {
        document.body.style.overflow = "auto";
    };

}, [openModal]);
useEffect(() => {

    const timer = setTimeout(() => {

        if(!searchTerm.trim())
        {
            setDisplayUsers(users);
            return;
        }

        const filtered = users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.roles?.join(",").toLowerCase().includes(searchTerm.toLowerCase())
        );

        setDisplayUsers(filtered);

    }, 300);

    return () => clearTimeout(timer);

}, [searchTerm, users]);
    useEffect(()=>{fetchUsers();}, [page]);
    useEffect(()=>
    {
        if(!searchTerm.trim())
        {
            setDisplayUsers(users);
            return;
        }
        const filtered = users.filter(user => 
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.roles?.join(",").toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDisplayUsers(filtered);
    }, [searchTerm, users]);
    const handleAddClick = () => 
    {
        setSelectedUser(null);
        setIsEditMode(false);
        setOpenModal(true);
    };
    const handleEditClick = (user) =>
    {
        setSelectedUser(user);
        setIsEditMode(true);
        setOpenModal(true);
    };
    const handleCloseModal = () =>
    {
        setOpenModal(false);
        setSelectedUser(null);
        setIsEditMode(false);
        fetchUsers();
    };
    const handleDelete = async(user) =>
    {
        const confirmDelete = window.confirm(
            `Delete user ${user.name}?`
        );
        if(!confirmDelete) return;
        try
        {
           const response = await api.get(
            "/api/user/delete",
            {
                params: {
                    username: user.username
                }
            }
           );
           if(response.data)
           {
            fetchUsers();
           }
           else
           {
            alert("Delete failed");
           }
        }
        catch(err)
        {
            console.log(err);
            alert("Delete failed");
        }
    };
    const handleToggleStatus = async(user) => {
        const originalStatus = user.status;
        const newStatus = !originalStatus;
        setUsers(prev => prev.map(u => u.id === user.id ? {...u, status: newStatus} : u));
        try
        {
            await api.post("/api/user/update", { ...user, status:newStatus, roles:user.roles});
        }
        catch(err)
        {
            console.error(err);
            setUsers(prev => prev.map(u => u.id === user.id ? {...u, status: originalStatus} : u));
            alert("Status update failed");
        }
    };
    const getPageNumbers = () => {
        if(!totalPage || totalPage <= 0)
            return[];
        const maxVisible = 5;
        let start = Math.max(0, page-Math.floor(maxVisible / 2));
        let end = Math.min(totalPage, start+maxVisible);
        if(end-start<maxVisible)
        {
            start=Math.max(0, end-maxVisible);
        }
        const pages = [];
        for(let i=start; i<end;i++)
        {
            pages.push(i);
        }
        return pages;
    };
    const renderCustomCell = (key, item) =>{
        switch(key)
        {
            case "roles":
                return(<span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold"> { item.roles?.join(", ") }</span>);
            case "status":
                return(
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox"
                        className="sr-only peer"
                        checked={item.status}
                        onChange={() => handleToggleStatus(item)} />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                );
                default: return item[key];
        }
    };
    const headerExtras = (
        <div className="relative flex-grow md:w-72">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 text-gray-500 focus:ring-blue-500 shadow-sm"
            />
            {searchTerm && (
                <button onClick = {() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2">
                    <XMarkIcon className="h-5 w-5 text-gray-400"/>
                </button>
            )}
        </div>
    );
    return (
        <>
        <CommonList
            title="Users"
            icon={FiUsers}
            columns={userColumns}
            data={displayUsers}
            loading={loading}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            renderCustomCell={renderCustomCell}
            headerExtras={headerExtras}
            pagination={{
                page,
                totalPage,
                setPage,
                getPageNumbers
        }}/>
        <Modal
            isOpen={openModal}
            onClose={handleCloseModal}
        >
            {isEditMode ? (
                <UserEdit
                    user={selectedUser}
                    onClose={handleCloseModal}
                    />
            ): (
                <UserRegistration
                onClose={handleCloseModal}/>
            )}
        </Modal>
        </>
    );
};
export default UserList;