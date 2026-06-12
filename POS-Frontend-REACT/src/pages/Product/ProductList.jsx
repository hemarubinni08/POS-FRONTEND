import ListComp8Cols from "../../components/Lists/ListComp8Cols";

const ProductList = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "identifier", label: "SKU Code" },
    { key: "name", label: "Product Name" },
    { 
      key: "categories", 
      label: "Category",
      render: (val) => {
        if (!val) return <span className="text-slate-300">-</span>;
        if (Array.isArray(val)) {
          return val.map(c => typeof c === 'object' ? c.identifier || c.name : c).join(", ");
        }
        return typeof val === 'object' ? val.identifier : val;
      }
    },
    { key: "brand", label: "Brand" },
    { key: "model", label: "Model" },
    { key: "status", label: "Status" }
  ];

  return (
    <ListComp8Cols
      title="Product Management"
      entity="product"
      columns={columns}
      addPath="/product/add"
      editPath="/product/edit" // Will resolve to /product/edit/[identifier_or_id] dynamically
    />
  );
};

export default ProductList;