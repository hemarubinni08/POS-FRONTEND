"use client";

import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import CommonEdit from "@/component/CommonEdit";
import api from "../api/axios";

const RoleEdit = ({ role, onClose }) => {

    const [formData, setFormData] = useState({
        identifier: "",
        description: ""
    });

    useEffect(() => {

        if(role)
        {
            setFormData({
                identifier: role.identifier || "",
                description: role.description || ""
            });
        }

    }, [role]);

    const fields = [
        {
            key: "identifier",
            label: "Role Name",
            type: "text",
            disabled: true
        },
        {
            key: "description",
            label: "Description",
            type: "text"
        }
    ];

    const handleSubmit = async () => {

        try {

            const response = await api.post(
                "/api/role/update",
                formData
            );

            if(response.data)
            {
                alert("Role updated successfully.");

                onClose();
            }

        }
        catch(err)
        {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to update role."
            );
        }
    };

    return (
        <CommonEdit
            title="Edit Role"
            icon={FiEdit}
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Update Role"
        />
    );
};

export default RoleEdit;