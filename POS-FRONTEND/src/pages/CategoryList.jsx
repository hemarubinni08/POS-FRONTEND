import React from 'react'
import ListingPage from '../components/ListingPage'

const CategoryList = () => {


    const keys = ["id", "identifier","superCategory","status"]

    const urlName = "category"

    return (
        <div>
            <ListingPage urlName={urlName} keys={keys} />
        </div>

    )
}

export default CategoryList
