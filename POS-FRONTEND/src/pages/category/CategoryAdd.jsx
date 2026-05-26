import React, { useState } from 'react';
import Add from '../../components/Add';
import SingleDropdown from '../../components/dropdowns/SingleDropdown';

function CategoryAdd() {
    const [superCategory, setSuperCategory] = useState('');

    const extraFields = [
        {
            key: 'superCategory',
            type: 'custom',
            component: (
                <SingleDropdown
                    value={superCategory}
                    onChange={(val) => setSuperCategory(val)}
                    label='Super Category'
                    apiPath='category'
                />
            )
        }
    ];

    return (
        <Add
            title='Category'
            apiPath='category'
            extraFields={extraFields}
            extraData={{ superCategory }}
        />
    );
}

export default CategoryAdd;