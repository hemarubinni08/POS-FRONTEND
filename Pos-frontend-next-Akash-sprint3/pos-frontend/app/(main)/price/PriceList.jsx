"use client";

import { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import {
    MagnifyingGlassIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

import CommonList from "@/component/CommonList";
import Modal from "@/component/Modal";

import PriceRegistration from "./PriceRegistration";
import PriceEdit from "./PriceEdit";

import api from "../api/axios";

const PriceList = () => {

    const [prices, setPrices] = useState([]);
    const [displayPrices, setDisplayPrices] = useState([]);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [sizePerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const priceColumns = [
        {
            header: "Product",
            key: "identifier"
        },
        {
            header: "Cost Price",
            key: "costPrice"
        },
        {
            header: "Selling Price",
            key: "sellingPrice"
        },
        {
            header: "Profit",
            key: "difference"
        }
    ];

    const fetchPrices = async () => {

        setLoading(true);

        try {

            const response = await api.post(
                "/api/price/list",
                {
                    page,
                    sizePerPage,
                    sortField: "identifier"
                }
            );

            const data =
                response.data.dtoList || [];

            setPrices(data);
            setDisplayPrices(data);

            setTotalPage(
                response.data.totalPage || 0
            );

        } catch (err) {

            console.error(err);

            setPrices([]);
            setDisplayPrices([]);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchPrices();
    }, [page]);

    useEffect(() => {

        if (!searchTerm.trim()) {

            setDisplayPrices(prices);
            return;
        }

        const filtered = prices.filter(price =>
            price.identifier
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
        );

        setDisplayPrices(filtered);

    }, [searchTerm, prices]);

    const handleAddClick = () => {

        setSelectedPrice(null);
        setIsEditMode(false);
        setOpenModal(true);

    };

    const handleEditClick = (price) => {

        setSelectedPrice(price);
        setIsEditMode(true);
        setOpenModal(true);

    };

    const handleCloseModal = () => {

        setOpenModal(false);
        setSelectedPrice(null);
        setIsEditMode(false);

        fetchPrices();
    };

    const handleDelete = async (price) => {

        const confirmDelete = globalThis.confirm(
            `Delete price for ${price.identifier}?`
        );

        if (!confirmDelete) return;

        try {

            await api.get(
                `/api/price/delete?identifier=${price.identifier}`
            );

            alert("Price deleted successfully.");

            fetchPrices();

        } catch (err) {

            console.error(err);

            alert("Delete failed.");

        }
    };

    const handleToggleStatus = async (price) => {

        const originalStatus =
            price.status;

        const newStatus =
            !originalStatus;

        setPrices(prev =>
            prev.map(p =>
                p.id === price.id
                    ? {
                        ...p,
                        status: newStatus
                    }
                    : p
            )
        );

        try {

            await api.post(
                "/api/price/update",
                {
                    ...price,
                    status: newStatus
                }
            );

        } catch (err) {

            console.error(err);

            setPrices(prev =>
                prev.map(p =>
                    p.id === price.id
                        ? {
                            ...p,
                            status: originalStatus
                        }
                        : p
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
                        <span className="sr-only">Toggle price status</span>
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

            case "costPrice":
            case "sellingPrice":
            case "difference":

                return (
                    <span>
                        ₹ {item[key]}
                    </span>
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
                placeholder="Search Prices..."
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
                title="Price"
                icon={FiDollarSign}
                columns={priceColumns}
                data={displayPrices}
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
                    <PriceEdit
                        price={selectedPrice}
                        onClose={handleCloseModal}
                    />
                ) : (
                    <PriceRegistration
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>
        </>
    );
};

export default PriceList;