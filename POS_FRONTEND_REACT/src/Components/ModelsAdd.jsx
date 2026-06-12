import Add from "./Add";

const ModelsAdd = () => {

  const fields = [
    {
      name: "identifier",
      label: "model Name",
      type: "text",
    },
    {
      name:"description",
      label:"description",
      type:"text"
    },
  ];

  return <Add urlName="models" fields={fields} />;
};

export default ModelsAdd;