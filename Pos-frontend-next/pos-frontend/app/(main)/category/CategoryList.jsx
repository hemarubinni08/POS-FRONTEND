"use client";

import { useState, useEffect } from "react";
import { FiTag } from "react-icons/fi";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

import CommonList from "@/component/CommonList";
import Modal from "@/component/Modal";

import CategoryRegistration from "./CategoryRegistration";
import CategoryEdit from "./CategoryEdit";

import api from "../api/axios";

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [displayCategories, setDisplayCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [sizePerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const categoryColumns = [
        {
            header: "Category Name",
            key: "identifier"
        },
        {
            header: "Super Category",
            key: "superCategory"
        }
    ];

    const fetchCategories = async () => {

        setLoading(true);

        try {

            const response = await api.post(
                "/api/category/list",
                {
                    page,
                    sizePerPage,
                    sortField: "identifier"
                }
            );

            const data =
                response.data.dtoList || [];

            setCategories(data);
            setDisplayCategories(data);

            setTotalPage(
                response.data.totalPage || 0
            );

        } catch (err) {

            console.error(err);

            setCategories([]);
            setDisplayCategories([]);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchCategories();

    }, [page]);

    useEffect(() => {

        if (!searchTerm.trim()) {

            setDisplayCategories(categories);
            return;
        }

        const filtered = categories.filter(category =>
            category.identifier
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            category.superCategory
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            category.description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
        );

        setDisplayCategories(filtered);

    }, [searchTerm, categories]);

    const handleAddClick = () => {

        setSelectedCategory(null);
        setIsEditMode(false);
        setOpenModal(true);

    };

    const handleEditClick = (category) => {

        setSelectedCategory(category);
        setIsEditMode(true);
        setOpenModal(true);

    };

    const handleCloseModal = () => {

        setOpenModal(false);
        setSelectedCategory(null);
        setIsEditMode(false);

        fetchCategories();
    };

    const handleDelete = async (category) => {

        const confirmDelete = window.confirm(
            `Delete category ${category.identifier}?`
        );

        if (!confirmDelete) return;

        try {

            await api.get(
                `/api/category/delete?identifier=${category.identifier}`
            );

            alert("Category deleted successfully.");

            fetchCategories();

        } catch (err) {

            console.error(err);

            alert("Delete failed.");

        }
    };

    const handleToggleStatus = async (category) => {

        const originalStatus =
            category.status;

        const newStatus =
            !originalStatus;

        setCategories(prev =>
            prev.map(c =>
                c.id === category.id
                    ? {
                        ...c,
                        status: newStatus
                    }
                    : c
            )
        );

        try {

            await api.post(
                "/api/category/update",
                {
                    ...category,
                    status: newStatus
                }
            );

        } catch (err) {

            console.error(err);

            setCategories(prev =>
                prev.map(c =>
                    c.id === category.id
                        ? {
                            ...c,
                            status: originalStatus
                        }
                        : c
                )
            );

            alert(
                "Status update failed."
            );
        }
    };

    const getPageNumbers = () => {

        if (!totalPage || totalPage <= 0)
            return [];

        const maxVisible = 5;

        let start =
            Math.max(
                0,
                page - Math.floor(maxVisible / 2)
            );

        let end =
            Math.min(
                totalPage,
                start + maxVisible
            );

        if (end - start < maxVisible) {

            start =
                Math.max(
                    0,
                    end - maxVisible
                );
        }

        const pages = [];

        for (
            let i = start;
            i < end;
            i++
        ) {
            pages.push(i);
        }

        return pages;
    };

    const renderCustomCell = (
        key,
        item
    ) => {

        switch (key) {

            case "status":

                return (
                    <label className="relative inline-flex items-center cursor-pointer">

                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={item.status}
                            onChange={() =>
                                handleToggleStatus(item)
                            }
                        />

                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>

                    </label>
                );

            default:
                return item[key];
        }
    };

    const headerExtras = (

        <div className="relative flex-grow md:w-72">

            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

            <input
                type="text"
                placeholder="Search Categories..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(
                        e.target.value
                    )
                }
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-900"
            />

            {searchTerm && (

                <button
                    onClick={() =>
                        setSearchTerm("")
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                </button>

            )}

        </div>
    );

    return (
        <>
            <CommonList
                title="Categories"
                icon={FiTag}
                columns={categoryColumns}
                data={displayCategories}
                loading={loading}
                onAdd={handleAddClick}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                renderCustomCell={renderCustomCell}
                headerExtras={headerExtras}
                pagination={{
                    page,
                    totalPage,
                    setPage,
                    getPageNumbers
                }}
            />

            <Modal
                isOpen={openModal}
                onClose={handleCloseModal}
            >
                {isEditMode ? (
                    <CategoryEdit
                        category={selectedCategory}
                        onClose={handleCloseModal}
                    />
                ) : (
                    <CategoryRegistration
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
        </>
    );
};

export default CategoryList;