import SimpleListPage from "../../components/common/SimpleListPage";

const UserList = () => {
  return (
    <SimpleListPage
      modelName="user"
      keys={["username", "name", "phoneNo", "roles"]}
      hideAddButton={true}
    />
  );
};

export default UserList;