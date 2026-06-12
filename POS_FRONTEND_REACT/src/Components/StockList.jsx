import List from "./List";

const StockList = () => {

  const keys = ["id", "identifier","minimumstock","quantity","product","warehouse",];

  const urlName = "stock";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default StockList;