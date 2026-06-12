import List from "./List";

const RackList = () => {

  const keys = ["id", "identifier", "shelfs","description","status"];

  const urlName = "rack";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default RackList;