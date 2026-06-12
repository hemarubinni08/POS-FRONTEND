import React from 'react'
import ListingPage from '../components/ListingPage'

const Stocks = () => {

    const keys = ["id", "identifier","superCategory","status"]

    const urlName = "stock"

    return (
        <div>
            <ListingPage urlName={urlName} keys={keys} />
        </div>

    )
}

export default Stocks
