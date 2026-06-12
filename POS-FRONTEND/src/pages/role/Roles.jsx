import CommonList from "../../components/CommonList";

function Roles() {

  const columns = [

    {
      header: "Role Name",
      field: "identifier",
    },

    {
      header: "Description",
      field: "description",
    },

  ];

  return (

    <CommonList
      title="Roles"
      subtitle="Manage Roles in the Application"
      entity="role"
      addPath="/roles/add"
      editPath="/roles/edit"
      columns={columns}
    />

  );
}

export default Roles;