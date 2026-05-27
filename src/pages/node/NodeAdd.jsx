import { useEffect, useState } from "react";
import AddPage from "../../components/common/AddPage";
import { useNavigate } from "react-router-dom";
import { getRoles } from "../../components/common/DataDropdowns";

const NodeAdd = () => {
  const navigate = useNavigate();

  const [options, setOptions] = useState({});

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    const roles = await getRoles();

    setOptions({
        roles: roles.map(r => ({identifier: r.identifier,label: r.name || r.identifier}))
    });
  };

  return (
    <AddPage
      title="Add Node"
      modelName="node"

      initialForm={{identifier: "",path: "",roles: []}}

      fields={[
        { name: "identifier", label: "Identifier", type: "text" },
        { name: "path", label: "Path", type: "text" },
        { name: "roles", label: "Roles", type: "multicheck" }
      ]}

      options={options}

      validate={(form) => {
        if (!form.identifier) return "Identifier is required";
        if (!form.path) return "Path is required";
        return null;
      }}

      onSuccess={() => navigate("/node")}
      onCancel={() => navigate("/node")}
    />
  );
};

export default NodeAdd;