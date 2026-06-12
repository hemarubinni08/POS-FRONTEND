import List from "./List";

const WarehouseList = () => {

  const keys = ["id", "identifier","address","phoneNo","country","region","status",];

  const urlName = "warehouse";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default WarehouseList;