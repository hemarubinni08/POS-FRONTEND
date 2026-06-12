import React from 'react'
import ListingPage from '../components/ListingPage'

const UserList = () => {
 const keys = ["id","username","phoneNo","name"]
    
    const urlName = "user"

  return (
    <div>
        <ListingPage urlName= {urlName} keys = {keys}/>
    </div>
  )
}

export default UserList
