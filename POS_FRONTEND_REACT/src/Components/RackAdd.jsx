import Add from "./Add";

const RackAdd = () => {

  const fields = [
    {
      name: "identifier",
      label: "Rack Name",
      type: "text",
    },
    {
      name: "shelfs",
      label: "shelf",
      type: "multiDropdown",
      api: "/shelf/list",
    },
    {
      name: "description",
      label: "description",
      type: "text",
    },
  ];

  return <Add urlName="rack" fields={fields} />;
};

export default RackAdd;