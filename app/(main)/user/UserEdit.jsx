"use client";

import { useState, useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import CommonEdit from "@/component/CommonEdit";
import api from "../api/axios";

const UserEdit = ({ user, onClose }) => {

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phoneNo: "",
        username: "",
        roles: "",
        status: true
    });

    useEffect(() => {

        if (user) {

            setFormData({
                ...user,
                roles: user.roles?.[0] || ""
            });

        }

    }, [user]);

    const userFields = [
        {
            key: "name",
            label: "Name",
            type: "text"
        },
        {
            key: "phoneNo",
            label: "Phone Number",
            type: "number"
        },
        {
            key: "username",
            label: "Email",
            type: "email"
        },
        {
            key: "roles",
            label: "Role",
            type: "search",
            api: "/api/role/list"
        }
    ];

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {
                ...formData,
                roles: [formData.roles]
            };

            const response = await api.post(
                "/api/user/update",
                payload
            );

            if (response.data) {

                alert("User Updated Successfully");

                onClose();
            }

        } catch (err) {

            console.error("User Update Failed:", err);

            alert(
                err.response?.data?.message ||
                "Failed to update user"
            );
        }
    };

    return (
        <CommonEdit
            title="Edit User"
            icon={FiUsers}
            formData={formData}
            setFormData={setFormData}
            fields={userFields}
            onSubmit={handleSubmit}
            submitLabel="Update User"
        />
    );
};

export default UserEdit;