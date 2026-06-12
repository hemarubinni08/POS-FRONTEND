import Edit from "./Edit";

const Rack = () => {
  const fields = [
    {
      name: "identifier",
      label: "Rack Name",
      type: "text",
      readOnly: true,
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

  return <Edit urlName="rack" fields={fields} />;
};

export default Rack;
