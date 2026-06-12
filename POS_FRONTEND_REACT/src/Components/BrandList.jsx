import List from "./List";

const BrandList = () => {

  const keys = ["id", "identifier","status"];

  const urlName = "brand";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default BrandList;