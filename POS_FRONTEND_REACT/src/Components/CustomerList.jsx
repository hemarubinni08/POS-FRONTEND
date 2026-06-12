import List from "./List";

const CustomerList = () => {

  const keys = ["id", "identifier","balance","creditLimit","name","partyType","phoneNo"];

  const urlName = "customer";

  return (
    <div>
      <List urlName={urlName} keys={keys} />
    </div>
  );
};

export default CustomerList;