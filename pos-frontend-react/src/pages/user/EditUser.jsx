import { useState } from "react";
import EditFormSkeleton from "../../components/EditFormSkeleton";
import MultiDropDown from "../../components/dropdowns/MultiDropDown";

export default function EditUser() {

  const [roles, setRoles] = useState([]);

  const extraFields = [
    {
      key: "name",
      label: "Full Name",
      type: "text",
      required: true,
    },
    {
      key: "phoneNo",
      label: "Phone Number",
      type: "text",
      required: true,
    },
    {
      key: "roles",
      type: "custom",
      component: (
        <MultiDropDown
          label="Assign Role(s)"
          apiUrl="/role/findByStatus"
          valueField="identifier"
          labelField="identifier"
          selectedValues={roles}
          onChange={(val) => setRoles(val)}
        />
      ),
    },
  ];

  return (
    <EditFormSkeleton
      title="User"
      apiPath="user"
      paramName="username"
      identifierField="username"
      extraFields={extraFields}
      extraData={{ roles }}
      setters={{ roles: setRoles }}
    />
  );
}