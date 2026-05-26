import Add from "../../components/Add";

function WarehouseAdd() {
    const extraFields = [
        {key: "address", type: "address", label: "Address"},
        {key: "contactNumber", type: "phone", label: "Contact Number"},
    ];

    return (
        <Add
            title='Warehouse'
            apiPath='warehouse'
            extraFields={extraFields}
        />
    );
}

export default WarehouseAdd;