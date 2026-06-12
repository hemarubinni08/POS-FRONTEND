import Edit from "./Edit";

const Shelf = () => {
  const fields = [
    {
      name: "identifier",
      label: "Shelf Name",
      type: "text",
      readOnly: true,
    },
    {
      name:"description",
      label:"description",
      type:"text"
    },
  ];

  return <Edit urlName="shelf" fields={fields} />;
};

export default Shelf;
