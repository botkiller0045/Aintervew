import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../Images/logo.png"
import small_logo from "../Images/small_logo.png"
import { set_token, set_user_details } from '../Slices/authSlice';
import toast from 'react-hot-toast';

export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout_fun = () => {
        toast.success("LOGGED OUT SUCCESSFULLY.....");
        navigate("/");
        dispatch(set_token(null));
        dispatch(set_user_details(null));
    
        localStorage.clear();
    }
    const {token} = useSelector(state => state.auth);
    
    return (
        <div className='h-[4rem] fixed z-20 bg-black border-b-2 border-b-gray-700 w-full'>
            
            <div className='w-full lg:w-10/12 mx-auto h-full px-5 p-2 flex justify-between'>
                <Link to="/" className='md:block hidden'>
                    <img src={logo} alt="logo" className='h-full'>
                    </img>
                </Link>

                <Link to="/" className='md:hidden block'>
                    <img src={small_logo} alt="logo" className='h-full'>
                    </img>
                </Link>
                <div className='w-fit h-full flex items-center'>
                    {
                        !token && 
                        (<div className='flex gap-2'>
                            <Link to="/log_in" className="flex items-center px-2 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
                                Login
                            </Link>
                            <Link to='/sign_up' className="items-center px-2 md:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
                                Sign Up
                            </Link>
                        </div>)
                    }
                    {
                        token && 
                        (<div className='flex gap-2'>
                            <Link to="/dashboard" className="flex items-center px-2 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
                                dashboard
                            </Link>
                            <button 
                                onClick={() => {
                                    logout_fun();
                                }}
                                 className="items-center px-2 md:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
                                Log out
                            </button>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}
