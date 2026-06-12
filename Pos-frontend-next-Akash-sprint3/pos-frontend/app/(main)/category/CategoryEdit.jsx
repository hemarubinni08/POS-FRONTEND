"use client";

import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import CommonEdit from "@/component/CommonEdit";
import PropTypes from "prop-types";
import api from "../api/axios";

const CategoryEdit = ({ category, onClose }) => {

    const [formData, setFormData] = useState({
        identifier: "",
        superCategory: "",
        description: ""
    });

    useEffect(() => {

        if(category)
        {
            setFormData({
                identifier: category.identifier || "",
                superCategory: category.superCategory || "",
                description: category.description || ""
            });
        }

    }, [category]);

    const fields = [
        {
            key: "identifier",
            label: "Category Name",
            type: "text",
            disabled: true
        },
        {
            key: "superCategory",
            label: "Super Category",
            type: "search",
            api: "/api/category/list",
            excludeCurrent: true
        }
    ];

    const handleSubmit = async () => {

        try {

            const response = await api.post(
                "/api/category/update",
                formData
            );

            if(response.data)
            {
                alert("Category updated successfully.");
                onClose();
            }

        } catch(err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to update category."
            );
        }
    };

    return (
        <CommonEdit
            title="Edit Category"
            icon={FiEdit}
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Update Category"
        />
    );
};
CategoryEdit.propTypes = {
    category: PropTypes.shape({
        identifier: PropTypes.string,
        superCategory: PropTypes.string,
        description: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired
};

export default CategoryEdit;