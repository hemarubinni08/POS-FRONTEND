import React from "react";
import { useForm } from "react-hook-form";

const Add = (props) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData) =>{
        alert("the from is submitted")
        reset()
    }

    const formFelids = [
        { name:"identifier", type: "text" }, 
        { name:"description", type: "text" }, 
        { name:"phoneNo",type: "tel" },
        { name:"Country",type: "text" }

    ]

    return (
        <div className="ml-4 flex justify-center h-screen mt-14">
            <form action="" onSubmit={handleSubmit(onSubmit)} className="w-114 flex flex-wrap gap-2 justify-center">

                {formFelids.map((field, index) => {

                    if (["text", "number", "tel", "password"].includes(field.type)) {
                        return (
                            <input 
                            {...register(field.name,{required:true})} 
                            placeholder={"Enter " + field.name} 
                            key={index} 
                            className="h-9 px-4 py-2 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-black transition"
                            />
                        )
                    }
                }
                )}
                <div className="flex justify-center w-full">
                    <button type="submit" className="h-5 text-white bg-black flex justify-center items-center p-4 rounded-lg cursor-pointer text-sm w-25">submit</button>
                </div> 
                
            </form>

        </div>
    )
}

export default Add;

