import React, { useState } from 'react';
import Add from '../../components/Add';
import MultiDropdown from '../../components/dropdowns/MultiDropdown';

function NodeAdd() {
    const [roles, setRoles] = useState([]);

    const extraFields = [
        {
            key: 'roles',
            type: 'custom',
            component: (
                <MultiDropdown
                    value={roles}
                    onChange={(val) => setRoles(val)}
                    label='Roles'
                    apiPath='role'
                    required
                />
            )
        },
        { key: 'path', label: 'Path', type: 'text' }
    ];

    return (
        <Add
            title='Node'
            apiPath='node'
            extraFields={extraFields}
            extraData={{ roles }}
        />
    );
}

export default NodeAdd;