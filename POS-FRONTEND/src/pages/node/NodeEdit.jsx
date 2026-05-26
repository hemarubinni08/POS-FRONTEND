import React, { useState } from 'react';
import Edit from '../../components/Edit';
import MultiDropdown from '../../components/dropdowns/MultiDropdown';

function NodeEdit() {
    const [roles, setRoles] = useState([]);
    const [path, setPath] = useState('');

    const handleLoad = (data) => {
        setRoles(data.roles || []);
        setPath(data.path || '');
    };

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
                />
            )
        },
        { key: 'path', label: 'Path', type: 'text' }
    ];

    return (
        <Edit
            title='Node'
            apiPath='node'
            extraFields={extraFields}
            extraData={{ roles, path }}
            onLoad={handleLoad}
        />
    );
}

export default NodeEdit;