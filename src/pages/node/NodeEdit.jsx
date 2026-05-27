import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import EditPage from "../../components/common/EditPage";
import api from "../../services/api";

import { getRoles } from "../../components/common/DataDropdowns";

const NodeEdit = () => {

  const { identifier } = useParams();

  const navigate = useNavigate();

  const [initialForm, setInitialForm] = useState(null);

  const [options, setOptions] = useState({});

  useEffect(() => {
    loadData();
  }, [identifier]);

  const loadData = async () => {

    try {

      /* LOAD NODE */

      const nodeRes = await api.get("/node/get", {
        params: { identifier }
      });

      /* LOAD ROLES */

      const roles = await getRoles();

      setOptions({
        roles: roles.map(r => ({
          identifier: r.identifier,
          label: r.name || r.identifier
        }))
      });

      setInitialForm({
        ...nodeRes.data,

        /* IMPORTANT */
        roles: Array.isArray(nodeRes.data.roles)
          ? nodeRes.data.roles
          : []
      });

    } catch (err) {

      console.log(err);

      alert("Failed to load node");

    }
  };

  if (!initialForm) {

    return (

      <div className="flex justify-center items-center h-[60vh]">

        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>

      </div>
    );
  }

  return (

    <EditPage

      title="Edit Node"

      modelName="node"

      initialForm={initialForm}

      options={options}

      fields={[

        {
          name: "identifier",
          label: "Identifier",
          type: "text",
          disabled: true
        },

        {
          name: "path",
          label: "Path",
          type: "text"
        },

        {
          name: "roles",
          label: "Roles",
          type: "multicheck"
        }

      ]}

      validate={(form) => {

        if (!form.path) {
          return "Path is required";
        }

        return null;
      }}

      onSuccess={() => navigate("/node")}

      onCancel={() => navigate("/node")}

    />
  );
};

export default NodeEdit;