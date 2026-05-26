import React from 'react';
import Edit from '../../components/Edit';

function BrandEdit() {
    return (
        <Edit
            title='Brand'
            apiPath='brand'
            extraFields={[]}
        />
    );
}

export default BrandEdit;