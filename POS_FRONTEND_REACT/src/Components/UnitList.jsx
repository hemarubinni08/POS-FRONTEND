import List from "./List";

const UnitList = () => {

  const keys = ["id", "identifier","status"];

  const urlName = "unit";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default UnitList;