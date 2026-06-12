import List from "./List";

const PriceList = () => {

  const keys = ["id", "identifier","product","priceType","sumPrice"];

  const urlName = "price";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default PriceList;