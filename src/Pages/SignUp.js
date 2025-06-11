import React from 'react'
import { useState } from 'react';
import { sign_up } from '../Services/ServiceFunctions/auth';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../Components/Loading';

export default function SignUp() {

    const navigate = useNavigate();
    const [loading, set_loading] = useState(false);

    const [data, set_data] = useState({
        user_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handle_change = (e) => {

        set_data((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));

    };

    const handle_submit = async (event) => {
        event.preventDefault();

        if(!data.user_name || !data.email || !data.password || !data.confirm_password) {
            toast.error("PLEASE FILL ALL THE DETAILS");
            return;
        }
          
        if(data.password !== data.confirm_password) {
            toast.error("PASSWORDS DO NOT MATCH.");
            return;
        }

        set_loading(true);
        const response = await sign_up(data.user_name, data.email, data.password);
        set_loading(false);
        
        if(response?.success)
            navigate("/log_in");

    };  

    if(loading)
        return (<Loading text="Creating an Account..."/>)

    return (
        <div className="w-full bg-black min-h-[calc(100vh-4rem)]">
            <div className="w-11/12 lg:w-10/12 mx-auto py-6">

                <form onSubmit={handle_submit} className='flex flex-col gap-4 text-white max-w-[400px] mx-auto bg-gray-900 p-5 rounded-lg'>

                    <div>
                        <h1 className="text-white text-3xl font-bold">SignUp</h1>
                        <p className="text-white opacity-70 mt-2">Get started with your account.</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">User Name <sup className=" text-red-500">*</sup></label>
                        <input type="text" name="user_name" onChange={handle_change}
                            placeholder="Enter user name" className="px-2 py-2 mt-1 rounded-md w-full bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">Email <sup className=" text-red-500">*</sup></label>
                        <input type="email" name="email" onChange={handle_change}
                            placeholder="Enter email" className="px-2 py-2 mt-1 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">Password <sup className=" text-red-500 ">*</sup></label>
                        <input type="password" name="password" onChange={handle_change}
                            placeholder="Enter password" className="px-2 py-2 mt-1 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">Confirm password <sup className=" text-red-500">*</sup></label>
                        <input type="password" name="confirm_password" onChange={handle_change}
                            placeholder="Confirm password" className="px-2 py-2 mt-1 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>
                    
                    <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md text-white font-bold mt-5'>
                        Create Account
                    </button>

                    <p className="text-center text-gray-400 text-sm mt-4">
                        Already have an account?{' '}
                        {/* Make sure to import Link from 'react-router-dom' if you use it */}
                        <Link to="/log_in" className="text-blue-400 hover:text-blue-300 transition duration-300">
                        Log In
                        </Link>
                    </p>
                </form>
            </div>
            
        </div>
    )
}
