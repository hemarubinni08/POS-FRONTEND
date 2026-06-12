import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 
import CommonList from "../../components/CommonList";
 
import {
  listItems,
  deleteItem,
  updateItem,
} from "../../components/api";
 
const UserList = () => {
  const navigate = useNavigate();
 
  const [users, setUsers] = useState([]);
 
  const [loading, setLoading] =
    useState(true);
 
  const [error, setError] =
    useState("");
 
  const [page, setPage] =
    useState(0);
 
  const [totalPages, setTotalPages] =
    useState(1);
 
  const sizePerPage = 5;
 
  // ================= EDIT MODAL =================
  const [editUser, setEditUser] =
    useState(null);
 
  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true);
 
      setError("");
 
      const res = await listItems(
        "user",
        {
          page,
          sizePerPage,
          sortField: "name",
        }
      );
 
      console.log("USER RESPONSE:", res);
 
      // SAFE DATA EXTRACTION
      let data = [];
 
      if (Array.isArray(res)) {
        data = res;
      } else if (
        Array.isArray(res?.content)
      ) {
        data = res.content;
      }
 
      setUsers(data);
 
      // PAGINATION
      setTotalPages(
        res?.totalPages ||
          Math.ceil(
            (res?.totalRecords ||
              data.length) /
              sizePerPage
          ) ||
          1
      );
 
    } catch (err) {
      console.error(err);
 
      setError(
        "Failed to load users"
      );
 
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchUsers();
  }, [page]);
 
  // ================= DELETE =================
  const handleDelete = async (
    username
  ) => {
    const confirmDelete =
      window.confirm(
        `Delete ${username}?`
      );
 
    if (!confirmDelete) return;
 
    try {
      await deleteItem(
        "user",
        username,
        "username"
      );
 
      fetchUsers();
 
    } catch (err) {
      alert("Delete failed");
    }
  };
 
  // ================= OPEN EDIT =================
  const openEdit = (user) => {
    setEditUser(user);
  };
 
  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await updateItem(
        "user",
        editUser
      );
 
      fetchUsers();
 
      setEditUser(null);
 
    } catch (err) {
      alert("Update failed");
    }
  };
 
  return (
    <div>
 
      <CommonList
        title="Users"
        data={users}
        loading={loading}
        error={error}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        sizePerPage={sizePerPage}
 
        columns={[
          {
            label: "Name",
            key: "name",
          },
 
          {
            label: "Phone No",
            key: "phoneNo",
          },
 
          {
            label: "Username",
            key: "username",
          },
 
          {
            label: "Roles",
 
            render: (row) =>
              (row.roles || []).join(
                ", "
              ) || "-",
          },
        ]}
 
        actions={[
          {
            label: "✏️ Edit",
 
            className: "editBtn",
 
            onClick: (row) =>
              openEdit(row),
          },
 
          {
            label: "🗑 Delete",
 
            className: "deleteBtn",
 
            onClick: (row) =>
              handleDelete(
                row.username
              ),
          },
        ]}
      />
 
      {/* ================= EDIT MODAL ================= */}
      {editUser && (
        <div className="modalOverlay">
 
          <div className="modalBox">
 
            <h2>Edit User</h2>
 
            <input
              type="text"
              value={
                editUser.username
              }
              disabled
            />
 
            <input
              type="text"
              value={
                editUser.name || ""
              }
              placeholder="Name"
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  name: e.target.value,
                })
              }
            />
 
            <input
              type="text"
              value={
                editUser.phoneNo ||
                ""
              }
              placeholder="Phone Number"
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  phoneNo:
                    e.target.value,
                })
              }
            />
 
            <input
              type="text"
              value={
                (
                  editUser.roles || []
                ).join(", ")
              }
              placeholder="Roles"
              onChange={(e) =>
                setEditUser({
                  ...editUser,
                  roles:
                    e.target.value
                      .split(",")
                      .map((r) =>
                        r.trim()
                      ),
                })
              }
            />
 
            <div className="modalActions">
 
              <button
                className="actionBtn"
                onClick={
                  handleUpdate
                }
              >
                Update
              </button>
 
              <button
                className="cancelBtn"
                onClick={() =>
                  setEditUser(null)
                }
              >
                Cancel
              </button>
 
            </div>
 
          </div>
 
        </div>
      )}
 
    </div>
  );
};
 
export default UserList;
 