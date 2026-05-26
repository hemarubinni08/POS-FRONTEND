import Add from '../../components/Add';
import {useState} from 'react';
import SingleDropdown from '../../components/dropdowns/SingleDropdown';
import React from 'react';
import HardcodedDropdown from '../../components/dropdowns/hardcodedDropdown';

function CustomerAdd() {

    const [partyType, setPartyType] = useState([]);
    const extraFields = [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'phoneNo', label: 'Phone Number', type: 'text' },
        { key: 'username', label: 'Email', type: 'email' },
        { key: 'balance', label: 'Balance', type: 'number'},
        { key: 'creditLimit', label: 'Credit Limit', type: 'number' },
        { key: 'partyType', label: 'party Type', type: 'custom',
            component: (
                <HardcodedDropdown
                    value={partyType}
                    label='part Type'
                    onChange={(val) => setPartyType(val)}
                    items={ ['Customer', 'Dealer'] }
                    />
            )
        }
    ];

    return (
        <Add
            title="Customer"
            apiPath="customer"
            extraFields={extraFields}
        />
    );
}

export default CustomerAdd;