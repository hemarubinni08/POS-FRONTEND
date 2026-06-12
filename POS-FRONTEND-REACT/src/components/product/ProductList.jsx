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

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ================= PAGINATION =================
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
      supplierId: "",
      category: "",
    });

  // ================= EDIT MODAL =================
  const [editProduct, setEditProduct] =
    useState(null);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {

    try {

      setLoading(true);

      setError("");

      const res =
        await listItems(
          "product",
          {
            page,
            sizePerPage,
            sortField: "id",
          }
        );

      // ================= DATA =================
      const data =
        res?.content || [];

      // ================= NORMALIZE =================
      const normalized =
        data.map((p) => ({
          ...p,

          status:
            p.status === 1 ||
            p.status === true ||
            p.status === "1",

          category:
            p.category || "",
        }));

      setProducts(normalized);

      // ================= TOTAL PAGES =================
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

      console.error(
        "Category fetch failed",
        err
      );

    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    fetchCategory();
  }, []);

  // ================= ADD PRODUCT =================
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
          supplierId: "",
          category: "",
        });

        fetchProducts();

      } catch (err) {

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
                  status:
                    !p.status,
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
  const handleDelete =
    async (identifier) => {

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
              p.identifier !==
              identifier
          )
        );

      } catch (err) {

        alert("Delete failed");

      }
    };

  // ================= OPEN EDIT =================
  const openEdit = (product) => {

    setEditProduct({
      ...product,

      category:
        product.category || "",
    });
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

      className: "editBtn",

      onClick: openEdit,
    },

    {
      label: "🗑 Delete",

      className: "deleteBtn",

      onClick: (row) =>
        handleDelete(
          row.identifier
        ),
    },
  ];

  return (
    <>

      {/* ================= TABLE ================= */}
      <CommonList
        title="Products"
        data={products}
        columns={columns}
        loading={loading}
        error={error}

        // ================= PAGINATION =================
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
              placeholder="Supplier ID"
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

              {categories.map(
                (cat) => (

                  <option
                    key={
                      cat.identifier
                    }
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
                editProduct.supplierId ||
                ""
              }
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,

                  supplierId:
                    e.target.value,
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

              {categories.map(
                (cat) => (

                  <option
                    key={
                      cat.identifier
                    }
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
                  handleUpdate
                }
              >
                Update
              </button>

              <button
                onClick={() =>
                  setEditProduct(
                    null
                  )
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