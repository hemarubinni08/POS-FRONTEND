import { useState } from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";
import MultiDropDown from "../../components/dropdowns/MultiDropDown";

export default function AddNode() {

  const [roles, setRoles] = useState([]);

  const extraFields = [
    {
      key: "identifier",
      label: "Node Name",
      type: "text",
      required: true,
    },
    {
      key: "path",
      label: "Path",
      type: "text",
      required: true,
    },
    {
      key: "roles",
      type: "custom",
      component: (
        <MultiDropDown
          label="Roles"
          valueField="identifier"
          labelField="identifier"
          apiUrl="/role/findByStatus"
          onChange={(val) => setRoles(val)}
          selectedValues={roles}
        />
      ),
    },
  ];

  return (
    <AddFormSkeleton
      title="Node"
      apiPath="node"
      extraFields={extraFields}
      extraData={{ roles }}
    />
  );
}