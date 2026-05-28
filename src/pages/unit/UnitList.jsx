import ListPage from "../../components/common/ListPage";

const UnitList = () => {
  return (
    <ListPage
      modelName="unit"
      keys={["identifier", "unitName"]}
      enableToggle={true}
    />
  );
};

export default UnitList;