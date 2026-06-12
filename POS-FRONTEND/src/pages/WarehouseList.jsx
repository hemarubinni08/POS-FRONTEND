import React from 'react'
import ListingPage from '../components/ListingPage'


const WarehouseList = () => {
 const keys = ["id", "identifier","status"]

    const urlName = "warehouse"

    return (
        <div>
            <ListingPage urlName={urlName} keys={keys} />
        </div>

    )
}

export default WarehouseList
