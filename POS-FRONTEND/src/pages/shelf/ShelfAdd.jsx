import React from "react";
import CommonAddPage from "../../components/CommonAddPage";
import { ShelfAPI } from "../../api/api";

const ShelfAdd = () => (
    <CommonAddPage
        title="Add Shelf"
        submitApi={ShelfAPI.add}
        redirectRoute="/shelf/list"
        submitButtonText="Save Shelf"
        initialValues={{
            identifier: "",
            status: true
        }}
        fields={[
            {
                label: "Shelf Name",
                name: "identifier",
                type: "text"
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

export default ShelfAdd;