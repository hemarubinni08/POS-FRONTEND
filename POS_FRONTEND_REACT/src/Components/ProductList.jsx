import List from "./List";

const ProductList = () => {

  const keys = ["id", "identifier", "brand", "models", "unit", "category","status"];

  const urlName = "product";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default ProductList;