import React from "react";
import CommonEditPage from "../../components/CommonEditPage";
import { ShelfAPI } from "../../api/api";

const pagination = {
    page: 0,
    sizePerPage: 50,
    sortDirection: "ASC",
    sortField: "identifier"
};

const ShelfEdit = () => (
    <CommonEditPage
        title="Edit Shelf"

        getApi={ShelfAPI.get}
        updateApi={ShelfAPI.update}

        redirectRoute="/shelf/list"
        idParam="identifier"
        submitButtonText="Update Shelf"

        initialValues={{
            identifier: "",
            status: true
        }}

        fields={[
            {
                label: "Shelf Name",
                name: "identifier",
                type: "text",
                disabledOnEdit: true
            },

            {
                label: "Status",
                name: "status",
                type: "radio",
                options: [
                    { label: "ACTIVE", value: true },
                    { label: "INACTIVE", value: false }
                ]
            }
        ]}
    />
);

export default ShelfEdit;