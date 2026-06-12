import React from 'react'
import ListingPage from '../components/ListingPage'

const ShelfsList = () => {


    const keys = ["id", "identifier","status"]

    const urlName = "shelfs"

    return (
        <div>
            <ListingPage urlName={urlName} keys={keys} />
        </div>

    )
}

export default ShelfsList
