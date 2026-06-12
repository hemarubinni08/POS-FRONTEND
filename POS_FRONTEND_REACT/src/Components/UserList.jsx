import List from "./List";

const UserList = () => {

  const keys = ["id","name", "username", "roles", "phoneNo"];

  const urlName = "user";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default UserList;