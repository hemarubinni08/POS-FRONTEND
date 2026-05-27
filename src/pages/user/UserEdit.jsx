import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import EditPage from "../../components/common/EditPage";

const UserEdit = () => {

  const { username } = useParams();

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const [roles, setRoles] = useState([]);

  useEffect(() => {

    loadUser();

    loadRoles();

  }, [username]);

  const loadUser = async () => {

    try {

      const res = await api.get("/user/get", {
        params: { username }
      });

      setUserData(res.data);

    } catch (err) {

      console.log("GET ERROR:", err);

    }
  };

  const loadRoles = async () => {

    const res = await api.post("/role/list", {
      page: 0,
      sizePerPage: 100
    });

    setRoles(
      (res.data.dtoList || []).map(r => ({
        identifier: r.identifier,
        label: r.name || r.identifier
      }))
    );
  };

  if (!userData) {

    return <div className="p-6">Loading...</div>;
  }

  return (

    <EditPage

      title="Edit User"

      modelName="user"

      options={{ roles }}

      fields={[

        {
          name: "id",
          label: "ID",
          type: "text",
          disabled: true
        },

        {
          name: "name",
          label: "Name",
          type: "text"
        },

        {
          name: "username",
          label: "Username",
          type: "text",
          disabled: true
        },

        {
          name: "phoneNo",
          label: "Phone",
          type: "text"
        },

        {
          name: "roles",
          label: "Roles",
          type: "multicheck"
        }

      ]}

      initialForm={{
        id: userData.id || "",
        name: userData.name || "",
        username: userData.username || "",
        phoneNo: userData.phoneNo || "",

        roles: Array.isArray(userData.roles)
          ? userData.roles
          : []
      }}

      validate={(form) => {

        if (!form.name) {
          return "Name required";
        }

        if (!/^[0-9]{10}$/.test(form.phoneNo || "")) {
          return "Phone must be 10 digits";
        }

        if (!form.roles.length) {
          return "Select roles";
        }

        return null;
      }}

      onSuccess={() => navigate("/user")}

      onCancel={() => navigate("/user")}

    />
  );
};

export default UserEdit;