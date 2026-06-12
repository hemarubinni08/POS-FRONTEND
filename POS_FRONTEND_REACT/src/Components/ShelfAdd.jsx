import Add from "./Add";

const ShelfAdd = () => {

  const fields = [
    {
      name: "identifier",
      label: "shelf Name",
      type: "text",
    },
    {
      name:"description",
      label:"description",
      type:"text"
    },
  ];

  return <Add urlName="shelf" fields={fields} />;
};

export default ShelfAdd;