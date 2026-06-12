import ListTemplate from "../components/ListTemplate";

export default function BrandList() {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Identifier", field: "identifier" },
    { label: "Status", field: "status" },
  ];

  return (
    <ListTemplate
      title="Brand Management"
      columns={columns}
      urlName="brand"
      showStatus={true}
      editKey="identifier"
      addButtonLabel="Brand"
      pageSize={2}
    />
  );
}