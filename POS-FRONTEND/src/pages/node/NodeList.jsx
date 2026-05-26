import React from "react";
import { useEffect, useState } from "react";
import List from "../../components/List";

function Node() {
    const columns = [
        { key: 'identifier', label: 'Identifier' },
        { key: 'path', label: 'Path' },
        { key: 'roles', label:'Roles'},
        { key: 'description', label: 'Description' }
    ];

    return (
        <List
            title='Node'
            apiPath='node'
            columns={columns}
            addPath='/node/add'
            editPath='/node/edit'
        />
    );
}

export default Node;