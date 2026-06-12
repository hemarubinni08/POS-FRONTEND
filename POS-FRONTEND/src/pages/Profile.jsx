import React, { useEffect,useState } from 'react'
import { useForm } from 'react-hook-form'


const Profile = () => {

    const user = localStorage.getItem("username")
    const token = localStorage.getItem("token")

    async function fetchUserProfile(user,token) {
        const res = await fetch(`http://localhost:8080/api/user/get?username=${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const response = await res.json();
        console.log(response);
        reset(response);
    }

    const [roles, setroles] = useState([]);
    
        const paginationDto = {
            "page": 0,
            "sizePerPage": 50
        }
    
        async function getRoles(paginationDto) {
            const res = await fetch("http://localhost:8080/api/role/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paginationDto)
            });
    
            const response = await res.json();
            console.log(response)
            setroles(response)
        }


    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState:{errors}
    } = useForm()


    useEffect(() => {
            fetchUserProfile(user,token)
            getRoles(paginationDto)
    }, [])


    const onSubmit = async (data) =>{
        const res = await fetch(`http://localhost:8080/api/user/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const response = await res.json();
        console.log(response)
    }

    return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-100">
        
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-96 p-6 bg-white shadow-lg rounded-xl"
        >
            <h2 className="text-xl font-semibold text-center">Profile</h2>

            <input 
                {...register("username")} 
                type="text" 
                placeholder="Username"
                className="border p-2 rounded"
            />

            <input 
                {...register("name")} 
                type="text" 
                placeholder="Name"
                className="border p-2 rounded"
            />

            <input 
                {...register("phoneNo")} 
                type="text" 
                placeholder="Phone Number"
                className="border p-2 rounded"
            />

            <select 
                {...register("roles")} 
                multiple
                className="border p-2 rounded h-32"
            >
                {roles.map((role) => (
                    <option key={role.identifier} value={role.identifier}>
                        {role.identifier}
                    </option>
                ))}
            </select>

            <input 
                type="submit" 
                value="Edit"
                className="bg-black text-white py-2 rounded cursor-pointer"
            />

        </form>
    </div>
);
}

export default Profile
