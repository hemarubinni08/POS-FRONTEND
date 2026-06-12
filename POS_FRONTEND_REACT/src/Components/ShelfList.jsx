import List from "./List";

const ShelfList = () => {

  const keys = ["id", "identifier","description","status"];

  const urlName = "shelf";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default ShelfList;