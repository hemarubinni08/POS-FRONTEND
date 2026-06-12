import List from "./List";

const RoleList = () => {

  const keys = ["id", "identifier"];

  const urlName = "role";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default RoleList;