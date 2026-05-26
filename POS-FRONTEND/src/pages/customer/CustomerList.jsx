import React from "react";
import List from "../../components/List";

function CustomerList() {
    const columns = [
        { key: 'identifier', label: 'Identifier' },
        { key: 'name', label: 'Name' },
        { key: 'username', label: 'Email' },
        { key: 'phoneNo', label: 'Phone' },
        { key: 'balance', label: 'Balance' },
        { key: 'partyType', label: 'Party Type' },
        { key: 'creditLimit', label: 'Credit Limit' },
        { key: 'balanceType', label: 'Balance Type' },
        { key: 'description', label: 'Description' }
    ]

    return (
        <List
            title='Customer'
            apiPath='customer'
            columns={columns}
            addPath='/customer/add'
            editPath='/customer/edit'
        />
    );
}

export default CustomerList;