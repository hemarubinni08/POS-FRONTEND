"use client";

import { useEffect, useState } from "react";
import CommonList from "@/components/CommonList";
import api, {
  addItem,
  deleteItem,
} from "@/services/api";

const CartList = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [newCart, setNewCart] = useState({
    identifier: "",
    discount: 0,
  });

  const fetchCarts = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/api/cart/list"
      );

      setCarts(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load carts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const handleAddCart = async () => {
    try {
      await addItem("cart", newCart);

      setMessage(
        "Cart added successfully"
      );

      setNewCart({
        identifier: "",
        discount: 0,
      });

      fetchCarts();
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
        `Delete cart ${identifier}?`
      );

    if (!confirmDelete) return;

    try {
      await deleteItem(
        "cart",
        identifier
      );

      fetchCarts();
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
      label: "Total Price",
      key: "totalPrice",
    },
    {
      label: "Discount",
      key: "discount",
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
      name: "identifier",
      label: "Cart ID",
      type: "text",
    },
    {
      name: "discount",
      label: "Discount",
      type: "number",
    },
  ];

  return (
    <CommonList
      title="Cart"
      data={carts}
      columns={columns}
      loading={loading}
      error={error}
      message={message}
      setMessage={setMessage}
      newItem={newCart}
      setNewItem={setNewCart}
      handleAdd={handleAddCart}
      addFields={addFields}
      actions={actions}
      addButtonText="+ Add Cart"
      emptyMessage="No carts found"
    />
  );
};

export default CartList;