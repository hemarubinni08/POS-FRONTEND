import { useEffect, useState } from "react";
import CommonList from "../../components/CommonList";

import {
  listItems,
  deleteItem,
  toggleItem,
  updateItem,
  addItem,
  getListItems,
} from "../../components/api";

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const sizePerPage = 5;

  // ================= ADD =================
  const [newProduct, setNewProduct] =
    useState({
      identifier: "",
      supplierId: "",
      warehouseName: "",
      category: "",
    });

  // ================= EDIT =================
  const [editProduct, setEditProduct] =
    useState(null);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {

    try {

      setLoading(true);

      setError("");

      const res = await listItems(
        "product",
        {
          page,
          sizePerPage,
          sortField: "id",
        }
      );

      const data =
        res?.content || [];

      // NORMALIZE STATUS
      const normalized =
        data.map((p) => ({
          ...p,

          status:
            p.status === true ||
            p.status === 1 ||
            p.status === "1",
        }));

      setProducts(normalized);

      setTotalPages(
        res?.totalPages ||
          Math.ceil(
            (
              res?.totalElements ||
              data.length
            ) / sizePerPage
          ) ||
          1
      );

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load products"
      );

    } finally {

      setLoading(false);

    }
  };

  // ================= FETCH CATEGORY =================
  const fetchCategory = async () => {

    try {

      const response =
        await getListItems(
          "category"
        );

      setCategories(
        response || []
      );

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    fetchCategory();
  }, []);

  // ================= ADD =================
  const handleAddProduct =
    async () => {

      try {

        await addItem(
          "product",
          newProduct
        );

        setNewProduct({
          identifier: "",
          supplierId: "",
          warehouseName: "",
          category: "",
        });

        fetchProducts();

      } catch (err) {

        alert("Add failed");

      }
    };

  // ================= UPDATE =================
  const handleUpdate =
    async () => {

      try {

        await updateItem(
          "product",
          editProduct
        );

        setProducts((prev) =>
          prev.map((p) =>
            p.identifier ===
            editProduct.identifier
              ? editProduct
              : p
          )
        );

        setEditProduct(null);

      } catch (err) {

        alert("Update failed");

      }
    };

  // ================= DELETE =================
  const handleDelete =
    async (identifier) => {

      const confirmDelete =
        window.confirm(
          `Delete ${identifier}?`
        );

      if (!confirmDelete) return;

      try {

        await deleteItem(
          "product",
          identifier
        );

        setProducts((prev) =>
          prev.filter(
            (p) =>
              p.identifier !==
              identifier
          )
        );

      } catch (err) {

        alert("Delete failed");

      }
    };

  // ================= TOGGLE =================
  const handleToggleStatus =
    async (identifier) => {

      // SMOOTH UI UPDATE
      setProducts((prev) =>
        prev.map((p) =>
          p.identifier ===
          identifier
            ? {
                ...p,
                status: !p.status,
              }
            : p
        )
      );

      try {

        await toggleItem(
          "product",
          identifier
        );

      } catch (err) {

        alert("Toggle failed");

        // REFETCH IF FAILED
        fetchProducts();
      }
    };

  // ================= COLUMNS =================
  const columns = [
    {
      label: "ID",
      key: "id",
    },

    {
      label: "Identifier",
      key: "identifier",
    },

    {
      label: "Supplier",
      key: "supplierId",
    },

    {
      label: "Warehouse",
      key: "warehouseName",
    },

    {
      label: "Category",
      key: "category",
    },

    {
      label: "Status",

      render: (p) => (
        <label className="switch">

          <input
            type="checkbox"

            checked={p.status}

            onChange={() =>
              handleToggleStatus(
                p.identifier
              )
            }
          />

          <span className="slider"></span>

        </label>
      ),
    },
  ];

  // ================= ACTIONS =================
  const actions = [
    {
      label: "✏️ Edit",

      onClick: (row) =>
        setEditProduct(row),
    },

    {
      label: "🗑 Delete",

      onClick: (row) =>
        handleDelete(
          row.identifier
        ),
    },
  ];

  // ================= ADD FIELDS =================
  const addFields = [
    {
      name: "identifier",
      label: "Identifier",
    },

    {
      name: "supplierId",
      label: "Supplier ID",
    },

    {
      name: "warehouseName",
      label: "Warehouse Name",
    },

    {
      name: "category",
      label: "Category",

      type: "select",

      options:
        categories.map((cat) => ({
          label:
            cat.identifier,

          value:
            cat.identifier,
        })),
    },
  ];

  // ================= EDIT FIELDS =================
  const editFields = [
    {
      name: "identifier",

      label: "Identifier",

      disabled: true,
    },

    {
      name: "supplierId",

      label: "Supplier ID",
    },

    {
      name: "warehouseName",

      label: "Warehouse Name",
    },

    {
      name: "category",

      label: "Category",

      type: "select",

      options:
        categories.map((cat) => ({
          label:
            cat.identifier,

          value:
            cat.identifier,
        })),
    },
  ];

  return (
    <CommonList
      title="Products"

      data={products}

      columns={columns}

      loading={loading}

      error={error}

      page={page}

      setPage={setPage}

      sizePerPage={sizePerPage}

      totalPages={totalPages}

      // ADD
      onAdd={() => {}}

      addButtonText="+ Add Product"

      newItem={newProduct}

      setNewItem={
        setNewProduct
      }

      handleAdd={
        handleAddProduct
      }

      addFields={addFields}

      // EDIT
      editItem={editProduct}

      setEditItem={
        setEditProduct
      }

      handleUpdate={
        handleUpdate
      }

      editFields={editFields}

      // ACTIONS
      actions={actions}

      emptyMessage="No products found"
    />
  );
};

export default ProductList;