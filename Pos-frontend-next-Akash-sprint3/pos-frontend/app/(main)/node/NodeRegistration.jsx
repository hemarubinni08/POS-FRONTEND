"use client";

import { useState } from "react";
import { FiGrid } from "react-icons/fi";
import PropTypes from "prop-types";
import CommonAdd from "@/component/CommonAdd";
import api from "../api/axios";

const NodeRegistration = ({ onClose }) => {

    const [formData, setFormData] = useState({
        identifier: "",
        path: "",
        roles: []
    });

    const fields = [
        {
            key: "identifier",
            label: "Identifier",
            type: "text"
        },
        {
            key: "path",
            label: "Path",
            type: "text"
        },
        {
            key: "roles",
            label: "Role",
            type: "search",
            api: "/api/role/list"
        }
    ];

    const handleSubmit = async () => {

        try {

            const payload = {
                ...formData,
                roles: Array.isArray(formData.roles)
                    ? formData.roles
                    : [formData.roles]
            };

            const response = await api.post(
                "/api/node/add",
                payload
            );

            if (response.data.success === false) {
                alert(response.data.message);
                return;
            }
            alert("Node added successfully.");
            globalThis.dispatchEvent(new Event("refreshSidebar"));
            onClose();

        }
        catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to add node."
            );
        }
    };

    return (
        <CommonAdd
            title="Add Node"
            icon={FiGrid}
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Add Node"
        />
    );
};
NodeRegistration.propTypes = {
    onClose: PropTypes.func.isRequired
};
export default NodeRegistration;