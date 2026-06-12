"use client";

import { useState, useEffect } from "react";
import { FiGrid } from "react-icons/fi";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

import CommonList from "@/component/CommonList";
import Modal from "@/component/Modal";

import NodeRegistration from "./NodeRegistration";
import NodeEdit from "./NodeEdit";

import api from "../api/axios";

const NodeList = () => {

    const [nodes, setNodes] = useState([]);
    const [displayNodes, setDisplayNodes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(0);
    const [sizePerPage] = useState(5);
    const [totalPage, setTotalPage] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const nodeColumns = [
        {
            header: "Identifier",
            key: "identifier"
        },
        {
            header: "Path",
            key: "path"
        },
        {
            header: "Roles",
            key: "roles"
        }
    ];

    const fetchNodes = async () => {

        setLoading(true);

        try {

            const response = await api.post(
                "/api/node/list",
                {
                    page,
                    sizePerPage,
                    sortField: "identifier"
                }
            );
            console.log(response.data);

            const dat = response.data.dtoList || [];
            setNodes(dat);
            setDisplayNodes(dat);
            setTotalPage(response.data.totalPage || 0);

        }
        catch (err) {

            console.error(err);

            setNodes([]);
            setDisplayNodes([]);

        }
        finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchNodes();
    }, [page]);

    useEffect(() => {

        if (!searchTerm.trim()) {
            setDisplayNodes(nodes);
            return;
        }

        const filtered = nodes.filter(node =>
            node.identifier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            node.path?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            node.roles?.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
        );

        setDisplayNodes(filtered);

    }, [searchTerm, nodes]);

    const handleAddClick = () => {

        setSelectedNode(null);
        setIsEditMode(false);
        setOpenModal(true);

    };

    const handleEditClick = (node) => {

        setSelectedNode(node);
        setIsEditMode(true);
        setOpenModal(true);

    };

    const handleCloseModal = () => {

        setOpenModal(false);
        setSelectedNode(null);
        setIsEditMode(false);

        fetchNodes();

    };

    const handleDelete = async (node) => {

        const confirmDelete = globalThis.confirm(
            `Delete node ${node.identifier}?`
        );

        if (!confirmDelete) return;

        try {

            const response = await api.get(
                `/api/node/delete?identifier=${node.identifier}`
            );

            if (response.data) {
                alert("Node deleted successfully.");
                fetchNodes();
                globalThis.dispatchEvent(new Event("refreshSidebar"));
            }
            else {
                alert("Delete failed.");
            }

        }
        catch (err) {

            console.error(err);
            alert("Delete failed.");

        }
    };

    const handleToggleStatus = async (node) => {

        const originalStatus = node.status;
        const newStatus = !originalStatus;

        setNodes(prev =>
            prev.map(n =>
                n.id === node.id
                    ? { ...n, status: newStatus }
                    : n
            )
        );

        try {

            await api.post(
                "/api/node/update",
                {
                    ...node,
                    status: newStatus
                }
            );

        }
        catch (err) {

            console.error(err);

            setNodes(prev =>
                prev.map(n =>
                    n.id === node.id
                        ? { ...n, status: originalStatus }
                        : n
                )
            );

            alert("Status update failed.");

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
            start = Math.max(
                0,
                end - maxVisible
            );
        }

        const pages = [];

        for (let i = start; i < end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const renderCustomCell = (key, item) => {

        switch (key) {

            case "roles":

                return (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                        {item.roles?.join(", ")}
                    </span>
                );

            case "status":

                return (
                    <label className="relative inline-flex items-center cursor-pointer">

                        <input
                            type="checkbox"
                            aria-label="Toggle node status"
                            className="sr-only peer"
                            checked={item.status}
                            onChange={() => handleToggleStatus(item)}
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

            <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search Nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700"
            />

            {searchTerm && (
                <button
                    onClick={() => setSearchTerm("")}
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
                title="Nodes"
                icon={FiGrid}
                columns={nodeColumns}
                data={displayNodes}
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

                    <NodeEdit
                        node={selectedNode}
                        onClose={handleCloseModal}
                    />

                ) : (

                    <NodeRegistration
                        onClose={handleCloseModal}
                    />

                )}

            </Modal>
        </>
    );
};

export default NodeList;