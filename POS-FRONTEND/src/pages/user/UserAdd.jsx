import Add from '../../components/Add';
import MultiDropdown from '../../components/dropdowns/MultiDropdown';
import { useState } from 'react';

function UserAdd() {
    const [roles, setRoles] = useState('');

    const extraFields = [
        { key: 'roles', type: 'custom',
            component: (
                <MultiDropdown
                    value={roles}
                    apiPath='role'
                    onChange={(val) => setRoles(val)}
                    label='Roles'
                    required
                />               
            )
        },
        { key: 'name', type: 'text', label: 'Name'},
        { key: 'password', type: 'password', label: 'Password'},
        { key: 'phoneNo', type: 'phone', label: 'Phone Number'},
        { key: 'username', type: 'email', label: 'E-Mail'}
    ];

return (
    <Add
        title='User'
        apiPath='user'
        extraFields={extraFields}
        extraData={{ roles }}
        />
);
}

export default UserAdd;