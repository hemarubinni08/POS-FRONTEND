import ListPage from "../../components/common/ListPage";

const NodeList = () => {
  return (
    <ListPage
      modelName="node"
      keys={["identifier", "path", "roles"]}
      enableToggle={false}
    />
  );
};

export default NodeList;