"use client";

import { useState } from "react";
import { FiShield } from "react-icons/fi";
import CommonAdd from "@/component/CommonAdd";
import api from "../api/axios";

const RoleRegistration = ({ onClose }) => {

    const [formData, setFormData] = useState({
        identifier: "",
        description: ""
    });

    const fields = [
        {
            key: "identifier",
            label: "Role Name",
            type: "text"
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
                "/api/role/add",
                formData
            );

            if(response.data)
            {
                alert("Role added successfully.");

                onClose();
            }

        }
        catch(err)
        {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to add role."
            );
        }
    };

    return (
        <CommonAdd
            title="Add Role"
            icon={FiShield}
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Add Role"
        />
    );
};

export default RoleRegistration;