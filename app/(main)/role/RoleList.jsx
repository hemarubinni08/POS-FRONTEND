"use client";

import { useState, useEffect } from "react";
import { FiShield } from "react-icons/fi";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

import CommonList from "@/component/CommonList";
import Modal from "@/component/Modal";

import RoleRegistration from "./RoleRegistration";
import RoleEdit from "./RoleEdit";

import api from "../api/axios";

const RoleList = () => {

    const [roles, setRoles] = useState([]);
    const [displayRoles, setDisplayRoles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [sizePerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const roleColumns = [
        {
            header: "Role Name",
            key: "identifier"
        },
        {
            header: "Description",
            key: "description"
        }
    ];

    const fetchRoles = async () => {

        setLoading(true);

        try {

            const response = await api.post(
                "/api/role/list",
                {
                    page,
                    sizePerPage,
                    sortField: "identifier"
                }
            );

            const data =
                response.data.dtoList || [];

            setRoles(data);
            setDisplayRoles(data);

            setTotalPage(
                response.data.totalPage || 0
            );

        }
        catch (err) {

            console.error(err);

            setRoles([]);
            setDisplayRoles([]);

        }
        finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchRoles();

    }, [page]);

    useEffect(() => {

        if (!searchTerm.trim()) {

            setDisplayRoles(roles);
            return;
        }

        const filtered = roles.filter(role =>
            role.identifier
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            role.description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
        );

        setDisplayRoles(filtered);

    }, [searchTerm, roles]);

    const handleAddClick = () => {

        setSelectedRole(null);
        setIsEditMode(false);
        setOpenModal(true);

    };

    const handleEditClick = (role) => {

        setSelectedRole(role);
        setIsEditMode(true);
        setOpenModal(true);

    };

    const handleCloseModal = () => {

        setOpenModal(false);
        setSelectedRole(null);
        setIsEditMode(false);

        fetchRoles();
    };

    const handleDelete = async (role) => {

        const confirmDelete = window.confirm(
            `Delete role ${role.identifier}?`
        );

        if (!confirmDelete) return;

        try {

            await api.get(
                `/api/role/delete?identifier=${role.identifier}`
            );

            alert("Role deleted successfully.");

            fetchRoles();

        }
        catch (err) {

            console.error(err);

            alert("Delete failed.");

        }
    };

    const handleToggleStatus = async (role) => {

        const originalStatus =
            role.status;

        const newStatus =
            !originalStatus;

        setRoles(prev =>
            prev.map(r =>
                r.id === role.id
                    ? {
                        ...r,
                        status: newStatus
                    }
                    : r
            )
        );

        try {

            await api.post(
                "/api/role/update",
                {
                    ...role,
                    status: newStatus
                }
            );

        }
        catch (err) {

            console.error(err);

            setRoles(prev =>
                prev.map(r =>
                    r.id === role.id
                        ? {
                            ...r,
                            status: originalStatus
                        }
                        : r
                )
            );

            alert(
                "Status update failed."
            );
        }
    };

    const getPageNumbers = () => {

        if (!totalPage || totalPage <= 0)
            return [];

        const maxVisible = 5;

        let start =
            Math.max(
                0,
                page - Math.floor(maxVisible / 2)
            );

        let end =
            Math.min(
                totalPage,
                start + maxVisible
            );

        if (end - start < maxVisible) {

            start =
                Math.max(
                    0,
                    end - maxVisible
                );
        }

        const pages = [];

        for (
            let i = start;
            i < end;
            i++
        ) {
            pages.push(i);
        }

        return pages;
    };

    const renderCustomCell = (
        key,
        item
    ) => {

        switch (key) {

            case "status":

                return (
                    <label className="relative inline-flex items-center cursor-pointer">

                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={item.status}
                            onChange={() =>
                                handleToggleStatus(item)
                            }
                        />

                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>

                    </label>
                );

            default:
                return item[key];
        }
    };

    const headerExtras = (

        <div className="relative flex-grow md:w-72">

            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

            <input
                type="text"
                placeholder="Search Roles..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(
                        e.target.value
                    )
                }
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-900"
            />

            {searchTerm && (

                <button
                    onClick={() =>
                        setSearchTerm("")
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                </button>

            )}

        </div>
    );

    return (
        <>
            <CommonList
                title="Roles"
                icon={FiShield}
                columns={roleColumns}
                data={displayRoles}
                loading={loading}
                onAdd={handleAddClick}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                renderCustomCell={renderCustomCell}
                headerExtras={headerExtras}
                pagination={{
                    page,
                    totalPage,
                    setPage,
                    getPageNumbers
                }}
            />

            <Modal
                isOpen={openModal}
                onClose={handleCloseModal}
            >
                {isEditMode ? (
                    <RoleEdit
                        role={selectedRole}
                        onClose={handleCloseModal}
                    />
                ) : (
                    <RoleRegistration
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
        </>
    );
};

export default RoleList;