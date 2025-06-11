import React from 'react'
import { useState } from 'react';
import { log_in } from '../Services/ServiceFunctions/auth';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Loading from '../Components/Loading';

export default function LogIn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, set_loading] = useState(false);

    const [data, set_data] = useState({
        user_name: "",
        password: "",
    });

    const handle_change = (e) => {

        set_data((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));

    };

    const handle_submit = async (event) => {
        event.preventDefault();

        if(!data.user_name || !data.password) {
            toast.error("PLEASE FILL ALL THE DETAILS");
            return;
        }

        set_loading(true);
        const response = await log_in(data.user_name, data.password, dispatch);
        set_loading(false);
        if(response?.success)
            navigate("/dashboard");

    };  

    if(loading){
        return (<Loading text={"Trying to log in...."}/>)
    }

    return (
        <div className="w-full bg-black min-h-[calc(100vh-4rem)]">
            <div className="w-11/12 lg:w-10/12 mx-auto py-10">

                <form onSubmit={handle_submit} className='flex flex-col gap-4 text-white max-w-[400px] mx-auto bg-gray-900 p-5 rounded-lg'>

                    <div>
                        <h1 className="text-white text-3xl font-bold">Log In</h1>
                        <p className="text-white opacity-70 mt-2">Welcome back to your account.</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">User Name <sup className=" text-red-500 ">*</sup></label>
                        <input type="text" name="user_name" onChange={handle_change}
                            placeholder="Enter user name" className="px-2 py-2 mt-1 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">Password <sup className=" text-red-500 ">*</sup></label>
                        <input type="password" name="password" onChange={handle_change}
                            placeholder="Enter password" className="px-2 py-2 mt-1 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>
                    
                    <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-bold mt-5'>
                        Log In
                    </button>

                    <p className="text-center text-gray-400 text-sm mt-4">
                        Don't have an account?{' '}
                        <Link to="/sign_up" className="text-blue-400 hover:text-blue-300 transition duration-300">
                        Sign Up
                        </Link>
                    </p>
                    
                </form>
            </div>
        </div>
    )
}
