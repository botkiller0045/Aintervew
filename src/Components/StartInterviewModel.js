import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { FaClipboardList } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'; 

export default function StartInterviewModel({set_start_interview, data}) {

    const [permissions, set_permissions] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const check_permissions = async () => {
            try{
                const cam_status = await navigator.permissions.query({name : 'camera'});
                const microphone_status = await navigator.permissions.query({name: 'microphone'});

                if(cam_status.state === 'granted' && microphone_status.state === 'granted')
                    set_permissions(true);
                else
                    set_permissions(false);
            }
            catch(error){
                toast.error("PERMISSION CHECK FAILED")
                set_permissions(false);
            }
        }
        
        check_permissions();
    }, [])
    return (
        <div className="fixed w-screen h-screen inset-0 right-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm text-white p-5">
            <div className=' bg-richblack-800 h-fit max-w-[400px] w-full flex flex-col gap-6 p-5 rounded-md border-2 border-richblack-600'>
                
                <div className='flex items-center justify-between border-b-[1px] pb-2 border-b-gray-700'>
                    <h2 className="text-xl font-bold">Instructions</h2>
                    
                    <button type='button' className="text-xl" onClick={(event) => {
                        event.preventDefault();
                        set_start_interview(null);
                    }}>
                        <X className="w-5 h-6"/>
                    </button>
                </div>

                <div className='border-2 border-green-600 rounded-lg p-3 bg-green-900 bg-opacity-20'>

                <div className="flex items-center gap-2 mb-2">
                    <FaCheckCircle className="text-green-500 text-xl" /> 
                    <h3 className="text-green-500 text-xl font-bold">Interview Process</h3>
                </div>

                    <div className='text-green-300 text-[14px] flex flex-col gap-2'>
                        <p>• You will be asked a series of questions related to the job role by the AI.</p>
                        <p>• Answer all questions to the best of your ability.</p>
                        <p>• A summary of your interview will be generated based on conversation and it will be 
                        available in the dashboard under completed interviews section.</p>
                    </div>
                </div>

                <div className='border-2 border-yellow-400 rounded-lg p-3 bg-yellow-300 bg-opacity-20'>
                    <div className="flex items-center gap-2 mb-2">
                        <FaClipboardList className="text-yellow-400 text-xl" /> {/* Yellow icon */}
                        <h3 className="text-yellow-400 text-xl font-bold">Before You Start</h3>
                    </div>
                    
                    <div className='text-yellow-200 text-[14px] flex flex-col gap-2'>
                        <p>• Ensure stable internet communication.</p>
                        <p>• Find a quiet environment.</p>
                        <p>• Position yourself in an appropriate distance from the camera.</p> 
                        <p>• Don't try to check in this interview as this is just a mock interview to test your skills</p>
                        <p>• If you don't talk continuosly for 10 seconds, the response will be automatically sended.</p>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    {permissions ? (
                        <button
                            onClick={() => navigate(`/interview/${data._id}`)}
                            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-xl
                                        transform hover:scale-105 transition duration-300 ease-in-out"
                            >
                            Start Interview
                        </button>
                    ) : (
                        <p className="text-center text-red-500 text-[16px] py-2">
                            Please grant camera and microphone access and refresh the page to proceed.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
