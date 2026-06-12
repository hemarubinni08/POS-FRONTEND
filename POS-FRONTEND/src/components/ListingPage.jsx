import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {Pencil,Trash} from 'lucide-react'
const ListingPage = (props) => {

    const navigate = useNavigate();

    const keys = props.keys
    const urlName = props.urlName

    const token = localStorage.getItem("token")

    const [listData, setListData] = useState([])

    const [paginationDto, setPagination] = useState({
        "page": 0,
        "sizePerPage": 4
    })

    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    async function fetchList() {
        const res = await fetch(`http://localhost:8080/api/${urlName}/list`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(paginationDto)
        });

        const response = await res.json();
        setListData(response.dtoList)
        setTotalPages(response.totalPages)
    }


    useEffect(() => {
        fetchList()
    }, [])

    useEffect(() => {
        fetchList()
        console.log(listData)
    }, [paginationDto])

    const deleteItem = async (identifier) => {
        const res = await fetch(`http://localhost:8080/api/${urlName}/delete?${listData[0].identifier !== null ? "identifier" : "username"}=${identifier}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const response = await res.json();
        fetchList()
    }

    const getItemToUpdate = (identifier) => {
        navigate(`/${urlName}/get?${listData[0].identifier !== null ? "identifier" : "username"}=${identifier}`)
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen ml-4">

            <div className="bg-white shadow-lg rounded-2xl p-4">

                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    {urlName.toUpperCase()} LIST
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">

                        <thead className="bg-black text-white">
                            <tr>
                                {keys.map((data, index) => (
                                    <th key={index} className="p-3 text-left text-sm uppercase tracking-wide w-3xl">
                                        {data}
                                    </th>
                                ))}
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {listData.map((LstData) => (
                                <tr key={LstData.id} className="hover:bg-gray-50 transition">

                                    {keys.map((keyData, index) => (

                                        <td key={index} className="px-2">
                                            {typeof LstData[keyData] === "boolean"
                                                ? LstData[keyData] ? "Active" : "Inactive"
                                                : LstData[keyData]}
                                        </td>

                                    ))}

                                    <td className="p-3 flex gap-2 justify-center">
                                        <button
                                            onClick={() =>
                                                deleteItem(
                                                    LstData.identifier ?? LstData.username
                                                )
                                            }
                                            className="cursor-pointer text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            <Trash className="stroke-red-800"/>
                                        </button>

                                        {/* <button
                                            onClick={() =>
                                                getItemToUpdate(
                                                    LstData.identifier ?? LstData.username
                                                )
                                            }
                                            className="cursor-pointer text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                           <Pencil className="stroke-black hover:stroke-blue-700"/>
                                        </button> */}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-6 gap-2 flex-wrap">
                    {numbers.map((num) => (
                        <button
                            key={num}
                            onClick={() => {
                                setPagination(prev => ({
                                    ...prev,
                                    page: num - 1
                                }));
                            }}
                            className={`px-3 py-1 rounded-lg border text-sm  cursor-pointer
                                ${paginationDto.page === num - 1
                                    ? "bg-black text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {num}
                        </button>
                    ))}
                </div>

            </div>
        </div>

    )
}

export default ListingPage
