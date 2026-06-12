import CommonList from "../../components/CommonList";

function Nodes() {

  const columns = [

    {
      header: "Node Name",
      field: "identifier",
    },

    {
      header: "Path",
      field: "path",
    },

    {
      header: "Roles",
      field: "roles",
    },

  ];

  return (

    <CommonList
      title="Nodes"
      subtitle="Manage application navigation nodes"
      entity="node"
      addPath="/nodes/add"
      editPath="/nodes/edit"
      columns={columns}
    />

  );
}

export default Nodes;