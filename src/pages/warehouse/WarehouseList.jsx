import SimpleListPage from "../../components/common/SimpleListPage";

const WarehouseList = () => {
  return (
    <SimpleListPage
      modelName="warehouse"
      keys={["identifier", "warehouseName", "state","location", "cityName"]}
    />
  );
};

export default WarehouseList;