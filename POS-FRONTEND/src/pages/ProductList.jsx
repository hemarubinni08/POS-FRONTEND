import React, { useState } from 'react'
import ListingPage from '../components/ListingPage'
import { useEffect } from 'react'

const ProductList = () => {
   
    const keys = ["id","name","unit","brand","category"]
    
    const urlName = "product"

  return (
    <div>
        <ListingPage urlName= {urlName} keys = {keys}/>
    </div>
  )
}

export default ProductList
