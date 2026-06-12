import React from "react";
import DynamicList from "../../components/common/DynamicList";
import POSLayout from "../../components/POSLayout";

function UserList() {

  const columns = [
     {
      key: "name",
      label: "Name",
      type: "text",
    },
    {
      key: "username",
      label: "Email",
      type: "text",

    },
    {
      key: "roles",
      label: "Roles",
      type: "list",

    },
     {
      key: "phoneNo",
      label: "Phone No",
      type: "text",
    },
  ];

  return (

    <POSLayout>
      <DynamicList
        title="User List"
        routeName="user"
        columns={columns}

        editUrl="/user/edit"
        addUrl="/user/add"
      />
    </POSLayout>

  );
}

export default UserList;