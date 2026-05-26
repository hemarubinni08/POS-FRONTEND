import Edit from "../../components/Edit";
import SingleDropdown from "../../components/dropdowns/SingleDropdown";
import React, { useState } from "react";

function CategoryEdit() {
    const [superCategory, setSuperCategory] = useState('');

    const handleLoad = (data) => {
        setSuperCategory(data.superCategory || '');
    };

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
        <Edit
            title='Category'
            apiPath='category'
            extraFields={extraFields}
            extraData={{ superCategory }}
            onLoad={handleLoad}
        />
    );
}

export default CategoryEdit;