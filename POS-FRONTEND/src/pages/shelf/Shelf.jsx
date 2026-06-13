import React from "react";
import CommonListPage from "../../components/CommonListPage";

const ShelfList = () => {
  return (
    <CommonListPage
      title="Shelf Management"

      apiUrl="/shelf/list"
      method="POST"

      deleteApi="/shelf/delete"
      deleteParam="identifier"

      editRoute="/shelf/edit/:identifier"
      addRoute="/shelf/add"

      showStatus={true}
      toggleApi="/shelf/toggle-status"
      toggleParam="identifier"
      toggleField="status"
      toggleMethod="POST"

      columns={[
        { header: "ID", field: "id" },
        { header: "Identifier", field: "identifier" },
        { header: "Status", field: "status" },
      ]}
    />
  );
};

export default ShelfList;