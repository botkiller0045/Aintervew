import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaChartLine, FaTrophy, FaUsers } from 'react-icons/fa';
import CreateInterviewModel from '../Components/CreateInterviewModel';
import NewInterview from '../Components/NewInterview';
import StartInterviewModel from '../Components/StartInterviewModel';
import CompletedInterview from '../Components/CompletedInterview';
import { ChevronDown } from 'lucide-react';
import Loading from '../Components/Loading';

export default function Dashboard() {

    const { user_details} = useSelector(state => state.auth);
    const [create_interview, set_create_interview] = useState(false);
    const [start_interview, set_start_interview] = useState(null);
    const [show_available_interviews, set_show_available_interviews] = useState(false);
    const [show_completed_interviews, set_show_completed_interviews] = useState(false);
    const [loading, set_loading] = useState("");

    if(loading !== "")
        return (<Loading text={loading}/>)
    
    return (
        <div className="w-full bg-black min-h-[calc(100vh-4rem)] text-white">
            <div className="w-11/12 lg:w-10/12 mx-auto py-10 flex flex-col gap-6">

                <div className='flex flex-col sm:flex-row gap-3 justify-between'>  
                    <h1 className="text-3xl font-bold">Welcome, {user_details.user_name}</h1>
                    <button 
                        onClick={() => {
                            set_create_interview(true)
                        }}
                        className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-lg shadow-md
                           transform hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap'>
                        + Create Interview
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-200">

                    <div className="flex w-full items-center justify-between bg-gray-900 p-5 rounded-lg transform hover:scale-[1.02] transition duration-300 ease-in-out">
                        <div className='flex flex-row gap-2 items-center'>
                            <FaChartLine className="text-blue-400 text-4xl" />
                            <div className='text-lg'>Average Score :</div>
                        </div>
                        <div className='text-lg'>{user_details.total_score ? (user_details.total_score / user_details.total_interviews).toFixed(2) : "N/A"}</div>
                    </div>

                    <div className="flex w-full items-center justify-between bg-gray-900 p-5 rounded-lg transform hover:scale-[1.02] transition duration-300 ease-in-out">
                        <div className='flex flex-row gap-2 items-center'>
                            <FaTrophy className="text-yellow-400 text-4xl" />
                            <div className='text-lg'>Highest Score : </div>
                        </div>
                        <div className='text-lg'>{user_details.highest_score ? user_details.highest_score : "N/A"}</div>
                    </div>

                    <div className="flex w-full items-center justify-between bg-gray-900 p-5 rounded-lg transform hover:scale-[1.02] transition duration-300 ease-in-out">
                        <div className='flex flex-row gap-2 items-center'>
                            <FaUsers className="text-purple-400 text-4xl" />
                            <div className='text-lg'>Total Interviews : </div>
                        </div>
                        <div className='text-lg'>{user_details.total_interviews}</div>
                    </div>

                </div>
 
                <div className='bg-gray-900 p-7 rounded-md flex flex-col gap-3'>
                    <div className='flex justify-between items-center'>
                        <h1 className="text-[20px] font-bold">Available Interviews</h1>
                        
                        <button
                            onClick={() => set_show_available_interviews(!show_available_interviews)}
                        >
                            <ChevronDown
                                className={`w-7 h-7 text-gray-300 transition-transform duration-300 ${
                                !show_available_interviews ? 'rotate-0' : 'rotate-180'
                                }`}
                            />
                        </button>
                    </div>

                    <div className='border-[1px] border-richblack-300'></div>
                    
                    {
                        show_available_interviews && (
                            <div className="flex flex-col gap-4 pt-4">
                            {
                                (!user_details || user_details?.incomplete_interviews.length === 0) ?
                                (
                                    <div className='text-center'>
                                        No Interview is available right now
                                    </div>
                                ) :
                                (
                                    <div className='flex flex-col gap-5'>
                                        {
                                            user_details.incomplete_interviews.map((item, index) => (
                                                <NewInterview key={index} data={item} set_start_interview={set_start_interview} set_loading={set_loading}/>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            </div>
                        )
                        
                    }
                </div>

                <div className='bg-gray-900 p-7 rounded-md flex flex-col gap-3'>
                    <div className='flex justify-between'>
                        <h1 className="text-[20px] font-bold">Completed Interviews</h1>

                        <button
                            onClick={() => set_show_completed_interviews(!show_completed_interviews)}
                        >
                            <ChevronDown
                                className={`w-7 h-7 text-gray-300 transition-transform duration-300 ${
                                !show_completed_interviews ? 'rotate-0' : 'rotate-180'
                                }`}
                            />
                        </button>
                    </div>

                    <div className='border-[1px] border-richblack-300'> </div>
                        
                    {
                        show_completed_interviews && (
                            <div className="flex flex-col gap-4 pt-4">
                                {
                                    (!user_details || user_details?.completed_interviews.length === 0) ?
                                    (
                                        <div className='text-center'>
                                            No Completed Interview is available right now
                                        </div>
                                    ) :
                                    (
                                        <div className='flex gap-5 flex-col'>
                                            {
                                                user_details.completed_interviews.map((item, index) => (
                                                    <CompletedInterview key={index} data={item}/>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    
                </div>
            </div>

            {create_interview && <CreateInterviewModel set_create_interview={set_create_interview} set_loading={set_loading}/>}
            {start_interview && <StartInterviewModel set_start_interview={set_start_interview} data={start_interview}/>}
        </div>
    )
}
