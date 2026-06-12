import List from "./List";

const ModelsList = () => {

  const keys = ["id", "identifier","description","status"];

  const urlName = "models";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default ModelsList;