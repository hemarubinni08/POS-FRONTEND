import SimpleListPage from "../../components/common/SimpleListPage";

const ProductList = () => {
  return (
    <SimpleListPage
      modelName="product"
      keys={["identifier", "productName", "brand", "categories","unit"]}
    />
  );
};

export default ProductList;