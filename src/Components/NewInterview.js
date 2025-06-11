import React from 'react';
import { format_date } from '../Utils';
import {delete_interview} from "../Services/ServiceFunctions/ai"
import { useDispatch, useSelector } from 'react-redux';

export default function NewInterview({ data, set_start_interview, set_loading }) {

    const { resume_name, role, createdAt, match } = data;
    const { token} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const delete_interview_fun = async () => {
        set_loading("Deleting an Interview...");
        await delete_interview(token, data._id, dispatch);
        set_loading("")
    }

    return (
    
        <div className="w-full p-3 py-5 rounded-xl shadow-lg border-b-2 border-b-gray-700
                    transform hover:scale-[1.005] transition duration-300 ease-in-out
                    flex flex-col md:flex-col lg:flex-row md:items-start lg:items-center gap-4 md:gap-6 lg:gap-8 text-gray-100">

      
            <div className='flex flex-col sm:flex-row sm:flex-1 sm:justify-between w-full gap-4 md:gap-6 lg:gap-8 sm:items-center min-w-0'>
                <div className="flex-1 flex flex-col gap-1"> 
                    <h3 className="text-white text-xl font-bold truncate"> 
                        {role || "No Role Specified"}
                    </h3>
                    <p className="text-gray-300 text-base truncate">
                    <span className="font-semibold text-blue-600">Resume:</span> {resume_name || "Untitled Resume"}
                    </p>
                </div>

        
                <div className="flex-shrink-0 flex flex-col gap-1 items-start md:items-end"> 
                    <p className="text-gray-300 text-sm flex items-center gap-2">
                        <span className="font-semibold text-gray-400">Created At:</span> {format_date(createdAt)}
                    </p>

                    {match && (
                        <p className="text-gray-300 text-sm flex items-center gap-2">
                            <span className="font-semibold text-gray-400">Match Score:</span>
                            <span className={`font-bold ${match >= 80 ? 'text-green-400' : match >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {match}%
                            </span>
                        </p>
                    )}
                </div>
            </div>
      
            <div className="flex flex-col sm:flex-row sm:mx-auto gap-4 mt-4 md:mt-0 flex-shrink-0">
                <button
                    onClick={() => set_start_interview(data)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-md
                                transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                    Start Interview
                </button>

                <button
                    onClick={() => delete_interview_fun()}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-bold rounded-lg shadow-md
                                transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                    Cancel
                </button>
            </div>
        </div>
    );
}