"use client";

import { useEffect, useState } from "react";
import CommonList from "@/components/CommonList";
import api from "@/services/api";

const CartEntryList = () => {
  const [entries, setEntries] = useState([]);
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedCart, setSelectedCart] =
    useState("");

  const [newEntry, setNewEntry] =
    useState({
      cartId: "",
      product: "",
      quantity: 1,
      discount: 0,
    });

  const fetchCarts = async () => {
    try {
      const response =
        await api.get("/api/cart/list");

      setCarts(response.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response =
        await api.get("/api/price/list");

      setProducts(response.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEntries = async (
    cartId
  ) => {
    if (!cartId) return;

    try {
      setLoading(true);

      const response = await api.get(
        `/api/cartentry/getByCartId?cartId=${cartId}`
      );

      setEntries(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error(err);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchEntries(selectedCart);
  }, [selectedCart]);

  const handleAddEntry = async () => {
    try {
      await api.post(
        "/api/cartentry/add",
        newEntry
      );

      setMessage(
        "Item added to cart"
      );

      fetchEntries(
        newEntry.cartId
      );

      setNewEntry({
        cartId: "",
        product: "",
        quantity: 1,
        discount: 0,
      });
    } catch (err) {
      console.error(err);
      setMessage("Add failed");
    }
  };

  const handleDelete = async (
    identifier
  ) => {
    const confirmDelete =
      globalThis.confirm(
        "Delete item?"
      );

    if (!confirmDelete) return;

    try {
      await api.get(
        `/api/cartentry/delete?identifier=${identifier}`
      );

      fetchEntries(selectedCart);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const columns = [
    {
      label: "Identifier",
      key: "identifier",
    },
    {
      label: "Product",
      key: "product",
    },
    {
      label: "Quantity",
      key: "quantity",
    },
    {
      label: "Unit Price",
      key: "unitPrice",
    },
    {
      label: "Discount",
      key: "discount",
    },
    {
      label: "Total Price",
      key: "totalPrice",
    },
  ];

  const actions = [
    {
      label: "🗑",
      onClick: (row) =>
        handleDelete(
          row.identifier
        ),
    },
  ];

  const addFields = [
    {
      name: "cartId",
      label: "Cart",
      type: "select",
      options: carts.map(
        (cart) => ({
          label:
            cart.identifier,
          value:
            cart.identifier,
        })
      ),
    },
    {
      name: "product",
      label: "Product",
      type: "select",
      options: products.map(
        (product) => ({
          label:
            product.identifier,
          value:
            product.identifier,
        })
      ),
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
    },
    {
      name: "discount",
      label: "Discount",
      type: "number",
    },
  ];

  return (
    <>
      <div className="mb-4">
        <label>
          Select Cart
        </label>

        <select
          className="form-control"
          value={selectedCart}
          onChange={(e) =>
            setSelectedCart(
              e.target.value
            )
          }
        >
          <option value="">
            Select Cart
          </option>

          {carts.map((cart) => (
            <option
              key={
                cart.identifier
              }
              value={
                cart.identifier
              }
            >
              {cart.identifier}
            </option>
          ))}
        </select>
      </div>

      <CommonList
        title="Cart Entries"
        data={entries}
        columns={columns}
        loading={loading}
        message={message}
        setMessage={setMessage}
        newItem={newEntry}
        setNewItem={setNewEntry}
        handleAdd={
          handleAddEntry
        }
        addFields={addFields}
        actions={actions}
        addButtonText="+ Add Item"
        emptyMessage="No items in cart"
      />
    </>
  );
};

export default CartEntryList;