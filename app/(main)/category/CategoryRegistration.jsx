"use client";

import { useState } from "react";
import { FiTag } from "react-icons/fi";
import CommonAdd from "@/component/CommonAdd";
import api from "../api/axios";

const CategoryRegistration = ({ onClose }) => {

    const [formData, setFormData] = useState({
        identifier: "",
        superCategory: "",
    });

    const fields = [
        {
            key: "identifier",
            label: "Category Name",
            type: "text"
        },
        {
            key: "superCategory",
            label: "Super Category",
            type: "search",
            api: "/api/category/list"
        }
    ];

    const handleSubmit = async () => {

        try {

            const response = await api.post(
                "/api/category/add",
                formData
            );

            if(response.data)
            {
                alert("Category added successfully.");
                onClose();
            }

        } catch(err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to add category."
            );
        }
    };

    return (
        <CommonAdd
            title="Add Category"
            icon={FiTag}
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Add Category"
        />
    );
};

export default CategoryRegistration;