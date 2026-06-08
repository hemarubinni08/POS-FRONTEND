"use client";

import { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import CommonAdd from "@/component/CommonAdd";
import api from "../api/axios";

const UserRegistration = ({ onClose }) => {

    const [formData, setFormData] = useState({
        name: "",
        phoneNo: "",
        username: "",
        password: "",
        roles: []
    });

    const userFields = [
        {
            key: "name",
            label: "Name",
            type: "text"
        },
        {
            key: "phoneNo",
            label: "Phone Number",
            type: "tel"
        },
        {
            key: "username",
            label: "Email",
            type: "email"
        },
        {
            key: "password",
            label: "Password",
            type: "password"
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
                roles: Array.isArray(formData.roles)
                    ? formData.roles
                    : [formData.roles]
            };

            const response = await api.post(
                "/api/user/add",
                payload
            );

            if (response.data) {

                alert("User Added Successfully");

                onClose();
            }

        } catch (err) {

            console.error("User Creation Failed:", err);

            alert(
                err.response?.data?.message ||
                "Failed to create user"
            );
        }
    };

    return (
        <CommonAdd
            title="Add User"
            icon={FiUserPlus}
            formData={formData}
            setFormData={setFormData}
            fields={userFields}
            onSubmit={handleSubmit}
            submitLabel="Create User"
        />
    );
};

export default UserRegistration;