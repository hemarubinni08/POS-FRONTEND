import CommonList from "../../components/CommonList";

function Products() {

  return (

    <CommonList

      title="Products"

      subtitle="Manage inventory products"

      entity="product"

      addPath="/products/add"

      editPath="/products/edit"

      columns={[

        {
          header: "Product Name",
          field: "identifier"
        },

        {
          header: "Brand",
          field: "brand"
        },

        {
          header: "Model",
          field: "model"
        },

        {
          header: "Unit",
          field: "unit"
        },

        {
          header: "Category",
          field: "category"
        }

      ]}

    />

  );

}

export default Products;