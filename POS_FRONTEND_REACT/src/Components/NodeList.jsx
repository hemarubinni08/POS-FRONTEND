import List from "./List";

const NodeList = () => {

  const keys = ["id", "identifier","path","roles"];

  const urlName = "node";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default NodeList;