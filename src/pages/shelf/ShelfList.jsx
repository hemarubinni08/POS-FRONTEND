import ListPage from "../../components/common/ListPage";

const ShelfList = () => {

  return (

    <ListPage
      modelName="shelf"

      keys={[
        "identifier",
        "name"
      ]}

      enableToggle={true}
    />

  );
};

export default ShelfList;