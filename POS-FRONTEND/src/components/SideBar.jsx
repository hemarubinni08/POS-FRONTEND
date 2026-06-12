import React, { useState, useEffect } from 'react'
import axios from "./axiosConfig"
import {Warehouse,ShelvingUnit,Users,LayoutList,Boxes,PersonStanding,Package,UserKey,Ruler,AlignVerticalDistributeEnd,ChartNetwork,Tag,CircleDollarSign,Tags} from "lucide-react"
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {

    const [nodes, setNodes] = useState([]);

    const navigate = useNavigate()

    const location = useLocation();

    const fetchNodes = async () => {
        const res = await axios.get("/node/getNodesForRoles")
        console.log(res.data)
        setNodes(res.data)
    }

    useEffect(() => {
        fetchNodes()
    }, [])
    
    

    const symbols = {
        "Warehouse": <Warehouse />,
        "Shelfs": <ShelvingUnit />,
        "User" : <Users />,
        "Category": <LayoutList />,
        "Stocks" : <Boxes />,
        "Customer":<PersonStanding />,
        "Product" : <Package />,
        "Roles":<UserKey />,
        "Unit":<Ruler />,
        "Racks":<AlignVerticalDistributeEnd />,
        "Nodes":<ChartNetwork />,
        "Brand":<Tag />,
        "Price":<CircleDollarSign />,
        "Models":<Tags />
    }

    return (
        <div className="bg-black fixed  left-0 top-0 h-full w-13 hover:w-56 transition-all duration-300 ease-in-out text-white overflow-x-hidden whitespace-nowrap pt-15 overflow-auto z-10 scrollbar-none">

            <ul>
                {nodes.map((data, index) => (
                    <li key={index} className={`border border-transparent p-2 flex gap-3 cursor-pointer hover:border-2 hover:border-white hover:rounded-sm px-2 mx-1.5 ${location.pathname.split("/")[1]===data.path.split("/")[1]?"bg-emerald-700 rounded-sm":""}`}
                    onClick={()=>{
                        navigate(`/${data.path}`)
                        }}>
                        <div>{symbols[data.identifier]}</div>
                        <div>{data.identifier}</div>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default SideBar
