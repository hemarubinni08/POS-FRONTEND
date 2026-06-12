import EditFormSkeleton from "../../components/EditFormSkeleton";

export default function EditBrand() {
  const fields = [
    {
      name: "description",
      label: "Description",
      type: "text",
    },
  ];

  return (
    <EditFormSkeleton
      title="Brand"
      apiPath="brand"
      fields={fields}
    />
  );
}