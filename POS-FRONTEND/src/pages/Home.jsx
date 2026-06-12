import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const Home = () => {
  return (
    <div className=''>

      <Navbar />

      <SideBar />

      <div className='pl-9 pt-16'>
        <Outlet />
      </div>

    </div>
  )
}

export default Home
