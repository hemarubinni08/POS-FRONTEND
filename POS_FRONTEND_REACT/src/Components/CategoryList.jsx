import List from "./List";

const CategoryList = () => {

  const keys = ["id", "identifier","superCategory","status"];

  const urlName = "category";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default CategoryList;