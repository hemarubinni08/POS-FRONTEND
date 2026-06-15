"use client";

import { useState, useEffect } from "react";
import { FiShoppingCart, FiPlus, FiTrash2 } from "react-icons/fi";
import api from "../api/axios";

const CartList = () => {

    const [customer, setCustomer] = useState("");
    const [customers, setCustomers] = useState([]);
    const [showCustomerDropdown, setShowCustomerDropdown]=useState(false);
    const [selectedCustomerName, setSelectedCustomerName] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [products, setProducts] = useState([]);
    const [cartEntries, setCartEntries] = useState([]);

    const [cartTotal, setCartTotal] = useState(0);

    const [loading, setLoading] = useState(false);

    const loadCustomers = async(term)=>{
        try{
            const response = await api.get(
                "/api/customer/list"
            );
            setCustomers(response.data || []);
        }
        catch(err)
        {
            console.error("Failed to load customers", err);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const searchProducts = async (term) => {

        try {

            const response = await api.get(
                "/api/price/list"
            );
            const filteredProducts = (response.data || []).filter(item => item.identifier ?.toLowerCase().includes(term.toLowerCase()));

            setProducts(
                filteredProducts
            );

        } catch (err) {

            console.error(err);

        }
    };

    const refreshCart = async () => {

        try {

            const entryResponse =
                await api.post(
                    "/api/cartentry/getByCartId",
                    {
                        cartId: customer
                    }
                );

            setCartEntries(
                entryResponse.data || []
            );

            const total = (
                entryResponse.data || []
            ).reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.totalPrice || 0
                    ),
                0
            );

            setCartTotal(total);

        } catch (err) {

            console.error(err);
        }
    };

    const handleAddProduct = async () => {

        if(!customer)
        {
            alert("Please select a customer first");
            return;
        }
        if (!product) {
            alert("Select a product");
            return;
        }

        try {

            setLoading(true);

            await api.post(
                "/api/cartentry/add",
                {
                    cartId: customer,
                    product,
                    quantity
                }
            );

            setProduct("");
            setQuantity(1);

            refreshCart();

        } catch (err) {

            console.error(err);

            alert("Failed to add product");

        } finally {

            setLoading(false);

        }
    };

    const handleDeleteEntry = async (
        entry
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete item?"
            );

        if (!confirmDelete) return;

        try {

            await api.get(
                `/api/cartentry/delete?identifier=${entry.identifier}`
            );

            refreshCart();

        } catch (err) {

            console.error(err);

            alert("Delete failed");

        }
    };

    useEffect(() => {
        if(customer)
            refreshCart();
    }, [customer]);

    return (
        <div className="p-6">

            <div className="bg-white rounded-xl shadow-md p-6">

                <div className="flex items-center gap-3 mb-6 text-blue-600">

                    <FiShoppingCart
                        size={24}
                    />

                    <h2 className="text-2xl font-bold text-gray-800">
                        Cart Billing
                    </h2>

                </div>

                <div
    className="relative mb-4"
    onClick={(e) => e.stopPropagation()}
>

    <label className="block mb-1 font-medium text-gray-600">
        Customer
    </label>

    <input
        type="text"
        placeholder="Search Customer"
        value={selectedCustomerName}
        onFocus={() =>
            setShowCustomerDropdown(true)
        }
        onClick={() => {
            setShowCustomerDropdown(!showCustomerDropdown)
        }}
        readOnly
        className="w-full border rounded p-2 text-gray-400"
    />

    {showCustomerDropdown &&
        customers.length > 0 && (

        <ul className="absolute z-50 w-full bg-white border rounded mt-1 max-h-48 overflow-auto text-gray-600">

            {customers.map(
                customer => (

                <li
                    key={customer.id}
                    className="p-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                    onClick={() => {

                        setCustomer(
                            customer.email
                        );
                        setSelectedCustomerName(customer.email);

                        setShowCustomerDropdown(false);
                    }}
                >
                    {customer.email}
                </li>

            ))}

        </ul>

    )}

</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-gray-600">

                    <div>

                        <label className="block mb-1 font-medium">
                            Product
                        </label>

                        <input
                            type="text"
                            placeholder="Search Product"
                            value={product}
                            onChange={(e) => {

                                setProduct(
                                    e.target.value
                                );

                                searchProducts(
                                    e.target.value
                                );
                            }}
                            className="w-full border rounded p-2"
                        />

                        {products.length >
                            0 && (
                            <div className="border rounded mt-1 bg-white max-h-40 overflow-auto">

                                {products.map(
                                    (
                                        item
                                    ) => (
                                        <div
                                            key={
                                                item.id
                                            }
                                            className="p-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                                            onClick={() => {

                                                setProduct(
                                                    item.identifier
                                                );

                                                setProducts(
                                                    []
                                                );
                                            }}
                                        >
                                            {
                                                item.identifier
                                            }
                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </div>

                    <div>

                        <label className="block mb-1 font-medium">
                            Quantity
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    e.target.value
                                )
                            }
                            className="w-full border rounded p-2"
                        />

                    </div>

                    <div className="flex items-end">

                        <button
                            onClick={
                                handleAddProduct
                            }
                            disabled={
                                loading
                            }
                            className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 flex justify-center items-center gap-2"
                        >
                            <FiPlus />

                            Add Product
                        </button>

                    </div>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse text-gray-600">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="border p-2">
                                    Product
                                </th>

                                <th className="border p-2">
                                    Qty
                                </th>

                                <th className="border p-2">
                                    Unit Price
                                </th>

                                <th className="border p-2">
                                    Total
                                </th>

                                <th className="border p-2">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {cartEntries.map(
                                (
                                    entry
                                ) => (
                                    <tr
                                        key={
                                            entry.identifier
                                        }
                                    >
                                        <td className="border p-2">
                                            {
                                                entry.product
                                            }
                                        </td>

                                        <td className="border p-2">
                                            {
                                                entry.quantity
                                            }
                                        </td>

                                        <td className="border p-2">
                                            ₹
                                            {
                                                entry.unitPrice
                                            }
                                        </td>

                                        <td className="border p-2">
                                            ₹
                                            {
                                                entry.totalPrice
                                            }
                                        </td>

                                        <td className="border p-2 text-center">

                                            <button
                                                onClick={() =>
                                                    handleDeleteEntry(
                                                        entry
                                                    )
                                                }
                                                className="text-red-600"
                                            >
                                                <FiTrash2 />
                                            </button>

                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>

                <div className="mt-6 flex justify-end">
                    <div className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 flex justify-center items-center gap-2">

                        <div className="text-xl font-bold">

                            Total : ₹
                            {cartTotal}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CartList;