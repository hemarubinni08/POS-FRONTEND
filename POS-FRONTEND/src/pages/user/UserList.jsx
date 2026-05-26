import React from "react";
import List from "../../components/List";

function UserList() {
    const columns = [
        { key: 'identifier', label: 'Identifier' },
        { key: 'name', label: 'Name' },
        { key: 'phoneNo', label: 'Phone No' },
        { key: 'roles', label: 'Roles' },
        { key: 'username', label: 'Username' },
        { key: 'description', label: 'Description' }
    ]
    return (
        <List
            title='User'
            apiPath='user'
            columns={columns}
            addPath='/user/add'
            editPath='/user/edit'
        />
    );
}

export default UserList;