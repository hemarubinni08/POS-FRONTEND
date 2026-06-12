import React from 'react'
import { useRef } from 'react'
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        const res = await fetch("http://localhost:8080/api/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        console.log(response);

        if (response.token != "Error") {
            localStorage.setItem("token", response.token)
            localStorage.setItem('username', data.username)
            navigate("/")
        } else {
            alert("invalid username or password")
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
            >

                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Login
                </h2>

                
                <div>
                    <input
                        {...register("username", { required: { value: true, message: "Username is required" } })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-black transition"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                
                <div>
                    <input
                        {...register("password", { required: { value: true, message: "Password is required" } })}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-black transition"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-lg 
                 hover:bg-black transition duration-200 font-medium cursor-pointer"
                >
                    Login
                </button>

                
                <p className="text-center text-sm text-gray-500">
                    Forgot password?
                </p>

            </form>
        </div>

    )
}

export default Login
