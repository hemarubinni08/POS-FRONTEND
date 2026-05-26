import React from "react";
import List from "../../components/List";

function UnitList(){
    const columns = [
        {key:'identifier', label:'Identifier'},
        {key:'description', label: 'Description'}
    ]

    return (
        <List
            title='Unit'
            apiPath='unit'
            columns={columns}
            addPath='/unit/add'
            editPath='/unit/edit'
        />
    );
}

export default UnitList;