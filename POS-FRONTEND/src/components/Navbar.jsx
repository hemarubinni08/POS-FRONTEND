import React, { useState } from 'react'
import { Menu, ShoppingBasket, LanguagesIcon, UserCircle,HomeIcon } from 'lucide-react'
import SideBar from './SideBar'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [sideBarFlag, setSideBarFlag] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <div className='fixed w-full'>
        <div className="text-white font-bold p-3 flex justify-between bg-black pt-4 pb-4 ml-13">
          <div>
            <span className="size-6 text-sm shadow hover:shadow-white cursor-pointer" onClick={()=>{navigate("/")}}> Home</span>
          </div>
          <div className='flex gap-1 shadow hover:shadow-white cursor-pointer'>
            <ShoppingBasket />
            <span>POS APPLICATION</span>
          </div>
          <div className='flex gap-6'>
            <LanguagesIcon className="shadow hover:shadow-white cursor-pointer" />
            <UserCircle className='shadow hover:shadow-white cursor-pointer' onClick={()=>{navigate("/profile")}}/>
          </div>
        </div>

      </div>
    </>
  )
}

export default Navbar

//hook
//talk about what - business problem
//solution design - why that solution
//engaging
//communication
//story telling
//stand out - unique idea
//make it intresting
//how do you construct and answer?
//paraphrasing
//answer effectively --> full stop, think in sentences, dont so fast respond
// dont justify - but explain, [this was the problem and this was the solution]
//build a user story