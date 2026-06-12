import Edit from "./Edit";

const Models = () => {
  const fields = [
    {
      name: "identifier",
      label: "Models Name",
      type: "text",
      readOnly: true,
    },
    {
      name:"description",
      label:"description",
      type:"text"
    },
  ];

  return <Edit urlName="models" fields={fields} />;
};

export default Models;
