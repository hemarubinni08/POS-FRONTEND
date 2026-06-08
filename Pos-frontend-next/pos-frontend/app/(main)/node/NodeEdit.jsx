"use client";

import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import CommonEdit from "@/component/CommonEdit";
import api from "../api/axios";

const NodeEdit = ({ node, onClose }) => {

    const [formData, setFormData] = useState({
        identifier: "",
        path: "",
        roles: []
    });

    useEffect(() => {

        if(node)
        {
            console.log("Node recieved: ", node);
            setFormData({
                identifier: node.identifier || "",
                path: node.path || "",
                roles: node.roles || []
            });
        }

    }, [node]);

    const fields = [
        {
            key: "identifier",
            label: "Node Name",
            type: "text",
            disabled: true
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
                "/api/node/update",
                payload
            );

            if(response.data)
            {
                alert("Node updated successfully");

                window.dispatchEvent(
                    new Event("refreshSidebar")
                );

                onClose();
            }

        }
        catch(err)
        {
            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to update node."
            );
        }
    };

    return (
        <CommonEdit
            title="Edit Node"
            icon={FiEdit}
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Update Node"
        />
    );
};

export default NodeEdit;