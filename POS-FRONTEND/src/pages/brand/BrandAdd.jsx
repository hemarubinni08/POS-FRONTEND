import React from 'react';
import Add from '../../components/Add';

function BrandAdd() {
    return (
            <Add
                title='Brand'
                apiPath='brand'
                extraFields={[]}
            />
    );
}

export default BrandAdd;