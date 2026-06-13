import { useEffect, useState } from "react";

import CommonList from "../../../components/CommonList.jsx";

import {
  listItems,
  deleteItem,
  toggleItem,
  updateItem,
  addItem,
} from "../../../components/api";

const ProductList = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [page, setPage] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  const sizePerPage = 5;

  // ================= ADD MODAL =================
  const [showAddModal, setShowAddModal] =
    useState(false);

  const [newProduct, setNewProduct] =
    useState({
      identifier: "",
      supplierID: "",
      categories: [],
    });

  const [categoriesList, setCategoriesList] =
    useState([]);

  // ================= EDIT MODAL =================
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

      const normalized =
        (res?.content || []).map(
          (p) => ({
            ...p,
            status:
              p.status === 1 ||
              p.status === true ||
              p.status === "1",
          })
        );

      setProducts(normalized);

      setTotalPages(
        res?.totalPages || 1
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

  // ================= FETCH CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res =
        await listItems("category");

      setCategoriesList(
        res?.content || []
      );

    } catch (err) {
      console.error(
        "Failed to load categories",
        err
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================= ADD =================
  const handleAddProduct =
    async () => {
      try {
        await addItem(
          "product",
          newProduct
        );

        setShowAddModal(false);

        setNewProduct({
          identifier: "",
          supplierID: "",
          categories: [],
        });

        fetchProducts();

      } catch (err) {
        console.error(err);

        alert("Add failed");
      }
    };

  // ================= TOGGLE STATUS =================
  const handleToggleStatus =
    async (identifier) => {
      try {
        await toggleItem(
          "product",
          identifier
        );

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

      } catch (err) {
        alert(
          "Failed to update status"
        );
      }
    };

  // ================= DELETE =================
  const handleDelete = async (
    identifier
  ) => {
    const confirmDelete =
      window.confirm(
        `Are you sure you want to delete product ${identifier}?`
      );

    if (!confirmDelete) return;

    try {
      await deleteItem(
        "product",
        identifier
      );

      fetchProducts();

    } catch (err) {
      alert("Delete failed");
    }
  };

  // ================= OPEN EDIT =================
  const openEdit = (product) => {
    setEditProduct(product);
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await updateItem(
        "product",
        editProduct
      );

      setEditProduct(null);

      fetchProducts();

    } catch (err) {
      alert("Update failed");
    }
  };

  // ================= COLUMNS =================
  const columns = [
    {
      label: "SL NO",
      render: (row, index) =>
        page * sizePerPage +
        index +
        1,
    },

    {
      label: "Product Name",
      key: "identifier",
    },

    {
      label: "Supplier",
      key: "supplierID",
    },

    {
      label: "Categories",
      render: (p) =>
        Array.isArray(p.categories)
          ? p.categories.join(", ")
          : "-",
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
      onClick: openEdit,
    },

    {
      label: "🗑 Delete",
      type: "delete",
      onClick: (row) =>
        handleDelete(
          row.identifier
        ),
    },
  ];

  return (
    <>
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
        onAdd={() =>
          setShowAddModal(true)
        }
        addButtonText="+ Add Product"
        actions={actions}
        emptyMessage="No products found"
      />

      {/* ================= ADD MODAL ================= */}
      {showAddModal && (
        <div className="modalOverlay">

          <div className="modal">

            <h2>Add Product</h2>

            <input
              placeholder="Product Name"
              value={
                newProduct.identifier
              }
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  identifier:
                    e.target.value,
                })
              }
            />

            <input
              placeholder="Supplier ID"
              value={
                newProduct.supplierID
              }
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  supplierID:
                    e.target.value,
                })
              }
            />

            <select
              value={
                newProduct
                  .categories[0] || ""
              }
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  categories: [
                    e.target.value,
                  ],
                })
              }
            >
              <option value="">
                Select Category
              </option>

              {categoriesList.map(
                (cat) => (
                  <option
                    key={cat.id}
                    value={
                      cat.identifier
                    }
                  >
                    {cat.identifier}
                  </option>
                )
              )}
            </select>

            <div className="modalActions">

              <button
                onClick={
                  handleAddProduct
                }
              >
                Add
              </button>

              <button
                onClick={() =>
                  setShowAddModal(
                    false
                  )
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editProduct && (
        <div className="modalOverlay">

          <div className="modal">

            <h2>Edit Product</h2>

            <input
              value={
                editProduct.identifier
              }
              disabled
            />

            <input
              value={
                editProduct.supplierID ||
                ""
              }
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  supplierID:
                    e.target.value,
                })
              }
              placeholder="Supplier ID"
            />

            <select
              value={
                editProduct
                  .categories?.[0] || ""
              }
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  categories: [
                    e.target.value,
                  ],
                })
              }
            >
              <option value="">
                Select Category
              </option>

              {categoriesList.map(
                (cat) => (
                  <option
                    key={cat.id}
                    value={
                      cat.identifier
                    }
                  >
                    {cat.identifier}
                  </option>
                )
              )}
            </select>

            <div className="modalActions">

              <button
                onClick={handleUpdate}
              >
                Update
              </button>

              <button
                onClick={() =>
                  setEditProduct(null)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default ProductList;