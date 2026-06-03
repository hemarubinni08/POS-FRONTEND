import { useEffect, useState } from "react";
import CommonList from "../../components/CommonList";

import {
  listItems,
  deleteItem,
  updateItem,
} from "../../components/api";

const UserList = () => {

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

  // ================= EDIT =================
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

      let data = [];

      if (Array.isArray(res)) {
        data = res;
      } else if (
        Array.isArray(res?.content)
      ) {
        data = res.content;
      }

      setUsers(data);

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

  // ================= COLUMNS =================
  const columns = [
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
  ];

  // ================= ACTIONS =================
  const actions = [
    {
      label: "✏️ Edit",

      onClick: (row) =>
        setEditUser(row),
    },

    {
      label: "🗑 Delete",

      onClick: (row) =>
        handleDelete(
          row.username
        ),
    },
  ];

  // ================= EDIT FIELDS =================
  const editFields = [
    {
      name: "username",
      label: "Username",
      disabled: true,
    },

    {
      name: "name",
      label: "Name",
    },

    {
      name: "phoneNo",
      label: "Phone Number",
    },

    {
      name: "roles",
      label: "Roles",
      customRender: (
        editItem,
        setEditItem
      ) => (
        <input
          type="text"
          value={(
            editItem.roles || []
          ).join(", ")}
          placeholder="Roles"

          onChange={(e) =>
            setEditItem({
              ...editItem,

              roles:
                e.target.value
                  .split(",")
                  .map((r) =>
                    r.trim()
                  ),
            })
          }
        />
      ),
    },
  ];

  return (
    <CommonList
      title="Users"

      data={users}

      loading={loading}

      error={error}

      page={page}

      setPage={setPage}

      totalPages={totalPages}

      sizePerPage={sizePerPage}

      columns={columns}

      actions={actions}

      // EDIT
      editItem={editUser}

      setEditItem={setEditUser}

      handleUpdate={handleUpdate}

      editFields={editFields}

      emptyMessage="No users found"
    />
  );
};

export default UserList;