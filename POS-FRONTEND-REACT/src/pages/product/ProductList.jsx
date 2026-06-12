import { useEffect, useState } from "react";

import CommonList from "../../components/CommonList.jsx";

import {
  listItems,
  deleteItem,
  toggleItem,
  updateItem,
  addItem,
} from "../../components/api";

const ProductList = () => {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ================= PAGINATION =================

  const [page, setPage] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(0);

  const sizePerPage = 3;

  // ================= ADD MODAL =================

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [newProduct, setNewProduct] =
    useState({
      identifier: "",
      supplierId: "",
      category: "",
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

      console.log(
        "PRODUCT RESPONSE:",
        res
      );

      const data =
        res?.content || [];

      setTotalPages(
        res?.totalPages || 0
      );

      const normalized = data.map(
        (p) => ({
          ...p,
          status:
            p.status === 1 ||
            p.status === true ||
            p.status === "1",
        })
      );

      setProducts(normalized);

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

      const res = await listItems(
        "category"
      );

      setCategoriesList(
        res?.content || res || []
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

    fetchCategories();

  }, [page]);

  // ================= ADD PRODUCT =================

  const handleAddProduct =
    async () => {

      try {

        console.log(
          "ADDING PRODUCT:",
          newProduct
        );

        await addItem(
          "product",
          newProduct
        );

        setShowAddModal(false);

        setNewProduct({
          identifier: "",
          supplierId: "",
          category: "",
        });

        fetchProducts();

      } catch (err) {

        console.error(
          "ADD ERROR:",
          err.response?.data || err
        );

        alert(
          err.response?.data?.message ||
            "Add failed"
        );

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
            p.identifier === identifier
              ? {
                  ...p,
                  status: !p.status,
                }
              : p
          )
        );

      } catch (err) {

        console.error(err);

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

      setProducts((prev) =>
        prev.filter(
          (p) =>
            p.identifier !== identifier
        )
      );

      fetchProducts();

    } catch (err) {

      console.error(err);

      alert("Delete failed");

    }

  };

  // ================= OPEN EDIT =================

  const openEdit = (product) => {

    setEditProduct({
      ...product,
    });

  };

  // ================= UPDATE =================

  const handleUpdate = async () => {

    try {

      console.log(
        "UPDATING PRODUCT:",
        editProduct
      );

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

      fetchProducts();

    } catch (err) {

      console.error(
        "UPDATE ERROR:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.message ||
          "Update failed"
      );

    }

  };

  // ================= TABLE COLUMNS =================

  const columns = [
    {
      label: "SL NO",
      key: "id",
    },
    {
      label: "Product Name",
      key: "identifier",
    },
    {
      label: "Supplier",
      key: "supplierId",
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
      onClick: openEdit,
    },
    {
      label: "🗑 Delete",
      onClick: (row) =>
        handleDelete(row.identifier),
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
        totalPages={totalPages}
        sizePerPage={sizePerPage}
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
              placeholder="Identifier"
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
              placeholder="Supplier Id"
              value={
                newProduct.supplierId
              }
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  supplierId:
                    e.target.value,
                })
              }
            />

            <select
              value={
                newProduct.category
              }
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category:
                    e.target.value,
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
              type="number"
              placeholder="Supplier ID"
              value={
                editProduct.supplierId ||
                ""
              }
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  supplierId: Number(
                    e.target.value
                  ),
                })
              }
            />

            <select
              value={
                editProduct.category ||
                ""
              }
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  category:
                    e.target.value,
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