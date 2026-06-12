import React from 'react'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setError,
        formState: { errors },
    } = useForm()


    const onSubmit = async (data) => {
        const res = await fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log(res)
        const response = await res.json();

        console.log(response);
        console.log(response.success);

        if(response.success == true){
            alert("register success, login to your account")
            navigate("/login")
            reset()
        }else{
            setError("myForm", {message : response.message})
        }
       
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

        setroles(response)
    }

    useEffect(() => {
        getRoles(paginationDto)
    }, [])



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
  >

    <h2 className="text-2xl font-semibold text-center text-gray-700">
      Register User
    </h2>

    <div>
      <input
        type="text"
        {...register("username", {
          required: { value: true, message: "Required field" }
        })}
        placeholder="Email / Username"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.username && (
        <p className="text-red-500 text-sm mt-1">
          {errors.username.message}
        </p>
      )}
    </div>

    <div>
      <input
        type="text"
        {...register("name")}
        placeholder="Name"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <input
        type="tel"
        {...register("phoneNo", {
          minLength: { value: 10, message: "Number must be 10 digits" },
          maxLength: { value: 10, message: "Number must be 10 digits" }
        })}
        placeholder="Phone Number"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.phoneNo && (
        <p className="text-red-500 text-sm mt-1">
          {errors.phoneNo.message}
        </p>
      )}
    </div>

    <div>
      <select
        {...register("roles")}
        multiple
        className="w-full border border-gray-300 p-2 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {roles.map((role) => (
          <option key={role.identifier} value={role.identifier}>
            {role.identifier}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple roles</p>
    </div>

    <div>
      <input
        type="password"
        {...register("password", { required: true })}
        placeholder="Password"
        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">
          Password is required
        </p>
      )}
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
    >
      Register
    </button>

    {errors.myForm && (
      <p className="text-red-500 text-sm text-center">
        {errors.myForm.message}
      </p>
    )}

  </form>
</div>
    )
}

export default Register
