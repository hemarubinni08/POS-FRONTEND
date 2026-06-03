"use client";

import { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import CommonAdd from "@/component/CommonAdd";
import api from "../api/axios";

const PriceRegistration = ({ onClose }) => {

    const [formData, setFormData] = useState({
        identifier: "",
        costPrice: "",
        sellingPrice: ""
    });

    const fields = [
        {
            key: "identifier",
            label: "Product",
            type: "search",
            api: "/api/product/list"
        },
        {
            key: "costPrice",
            label: "Cost Price",
            type: "number"
        },
        {
            key: "sellingPrice",
            label: "Selling Price",
            type: "number"
        }
    ];

    const handleSubmit = async () => {

        try {

            const payload = {
                ...formData,
                costPrice: Number(formData.costPrice),
                sellingPrice: Number(formData.sellingPrice)
            };

            const response = await api.post(
                "/api/price/add",
                payload
            );

            if (response.data) {

                alert("Price added successfully.");

                onClose();
            }

        }
        catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to add price."
            );
        }
    };

    return (
        <CommonAdd
            title="Add Price"
            icon={FiDollarSign}
            formData={formData}
            setFormData={setFormData}
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Add Price"
        />
    );
};

export default PriceRegistration;