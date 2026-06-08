"use client";

import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import api from "@/app/(main)/api/axios";

const CommonEdit = ({
    title,
    icon: TitleIcon,
    formData,
    setFormData,
    fields,
    onSubmit,
    validation,
    submitLabel = "Update"
}) => {

    const [dropdownData, setDropdownData] = useState({});
    const [openDropdown, setOpenDropdown] = useState(null);
    const [searchTerms, setSearchTerms] = useState({});
    const [loadingField, setLoadingField] = useState(null);

    useEffect(() => {
        const closeMenus = () => setOpenDropdown(null);

        window.addEventListener("click", closeMenus);

        return () =>
            window.removeEventListener("click", closeMenus);
    }, []);

    const searchField = async (field, term) => {
        if (!field.api) return;

        setLoadingField(field.key);

        try {
            const response = await api.post(field.api, {
                page: 0,
                sizePerPage: 10,
                sortField: "identifier",
                filter: term
            });
            let results = response.data.dtoList || [];

            if(field.key === "roles")
{
    results = results.filter(item =>
        !(formData.roles || []).includes(
            item.identifier
        )
    );
}

            if(field.excludeCurrent)
            {
                results = results.filter(
                    item => item.identifier !== formData.identifier
                );
            }

            setDropdownData(prev => ({
                ...prev,
                [field.key]: results
            }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingField(null);
        }
    };
    const validateField = (key, value) => {

    switch (key) {

        case "name":

            if (!value?.trim())
                return "Name is required.";

            if (value.trim().length < 3)
                return "Name must be at least 3 characters long.";

            break;

        case "phoneNo":

            if (!value || !/^[0-9]{10}$/.test(value))
                return "Phone number must contain exactly 10 digits.";

            break;

        case "username":

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!value || !emailRegex.test(value))
                return "Please enter a valid email.";

            break;

        case "password":

            if (!value?.trim())
                return "Password is required.";

            if (value.length < 6)
                return "Password must be at least 6 characters long.";

            break;

        case "roles":

            if (
                !value ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === "string" && !value.trim())
            ) {
                return "Role is required.";
            }

            break;

        default:
            return null;
    }

    return null;
};

const validateForm = () => {

    for (const field of fields) {

        const error = validateField(
            field.key,
            formData[field.key]
        );

        if (error) {
            alert(error);
            return false;
        }
    }

    return true;
};
    const handleFormSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    if (validation) {

        const error = validation(formData);

        if (error) {
            alert(error);
            return;
        }
    }

    onSubmit(e);
};

    useEffect(() => {
        const timer = setTimeout(() => {

            fields
                .filter(field => field.type === "search")
                .forEach(field => {

                    const term = searchTerms[field.key];

                    if (term) {
                        searchField(field, term);
                    }
                });

        }, 300);

        return () => clearTimeout(timer);

    }, [searchTerms, fields]);

    return (
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg text-gray-800">

            <div className="mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    {TitleIcon && <TitleIcon className="text-blue-600" />}
                    {title}
                </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">

                {fields.map(field => (

                    <div key={field.key}>

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                        </label>

                        {field.type === "search" ? (

                            <div
                                className="relative"
                                onClick={(e) => e.stopPropagation()}
                            >

                                {field.key === "roles" ? (

    <div className="border border-gray-300 rounded-md p-2 bg-white">

        <div className="flex flex-wrap gap-2 mb-2">

            {(Array.isArray(formData.roles)?formData.roles:formData.roles?[formData.roles]:[]).map(role => (

                <div
                    key={role}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                    <span>{role}</span>

                    <button
                        type="button"
                        className="font-bold hover:text-red-600"
                        onClick={() => {

                            setFormData({
                                ...formData,
                                roles: formData.roles.filter(
                                    r => r !== role
                                )
                            });

                        }}
                    >
                        ×
                    </button>
                </div>

            ))}

        </div>

        <input
            type="text"
            placeholder="Search roles..."
            value={searchTerms[field.key] || ""}
            onFocus={() => setOpenDropdown(field.key)}
            onChange={(e) => {

                setSearchTerms(prev => ({
                    ...prev,
                    [field.key]: e.target.value
                }));

            }}
            className="w-full outline-none"
        />

    </div>

) : (

    <input
        type="text"
        value={formData[field.key] || ""}
        onFocus={() => setOpenDropdown(field.key)}
        onChange={(e) => {

            let val = e.target.value;

            setFormData({
                ...formData,
                [field.key]: val
            });

            setSearchTerms(prev => ({
                ...prev,
                [field.key]: val
            }));
        }}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
    />

)}

                                {openDropdown === field.key && (

                                    <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-auto">

                                        {loadingField === field.key ? (

                                            <li className="p-2 text-sm text-gray-400">
                                                Searching...
                                            </li>

                                        ) : (

                                            dropdownData[field.key]?.map((item, index) => (

                                                <li
                                                    key={item.id || index}
                                                    className="p-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer border-b border-gray-100 last:border-none"
                                                    onClick={() => {

                                                    if(field.key === "roles")
                                                    {
                                                        const existingRoles =
                                                            Array.isArray(formData.roles)
                                                                ? formData.roles
                                                                : [];

                                                        console.log("Existing roles: ", existingRoles);
                                                        console.log("Selected Role: ", item.identifier);

                                                        if(
                                                            !existingRoles.includes(
                                                                item.identifier
                                                            )
                                                        )
                                                        {
                                                            setFormData({
                                                                ...formData,
                                                                roles: [
                                                                    ...existingRoles,
                                                                    item.identifier
                                                                ]
                                                            });
                                                        }
                                                    }
                                                    else
                                                    {
                                                        setFormData({
                                                            ...formData,
                                                            [field.key]: item.identifier
                                                        });
                                                    }

                                                    setOpenDropdown(null);

                                                    setDropdownData(prev => ({
                                                        ...prev,
                                                        [field.key]: []
                                                    }));
                                                }}
                                                >
                                                    {item.identifier}
                                                </li>

                                            ))

                                        )}

                                    </ul>

                                )}

                            </div>

                        ) : (

                            <input
                                type={field.type}
                                maxLength={
        field.key === "phoneNo"
            ? 10
            : undefined
    }
                                value={formData[field.key] || ""}
                                onChange={(e) => {

    let val = e.target.value;

    if (field.key === "phoneNo") {
        val = val.replace(/\D/g, "");
    }

    setFormData({
        ...formData,
        [field.key]: val
    });
}}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                        )}

                    </div>

                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
                >
                    <FiSave />
                    {submitLabel}
                </button>

            </form>

        </div>
    );
};

export default CommonEdit;