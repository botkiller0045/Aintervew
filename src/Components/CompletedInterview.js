import React from 'react';
import { Link } from 'react-router-dom';
import { get_rating_colors } from '../Utils';

export default function CompletedInterview({ data }) {
    const { _id, role, resume_name, feedback } = data;
    const overallRating = feedback?.overall_rating || 'N/A';
  
     return (
    
        <div className="w-full py-5 p-3 rounded-xl shadow-lg border-b-2 border-b-gray-700
                        transform hover:scale-[1.005] transition duration-300 ease-in-out
                        flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 md:gap-8 text-gray-100">

            <div className="flex-1 flex flex-col gap-1"> 
                <h3 className="text-white text-xl font-bold truncate"> 
                    {role || "No Role Specified"}
                </h3>
                <p className="text-gray-300 text-base truncate">
                    <span className="font-semibold text-blue-400">Resume:</span> {resume_name || "Untitled Resume"}
                </p>
            </div>

      
            <div className="flex flex-col gap-1 items-start md:items-center"> 
                <p className="text-gray-300 text-sm md:text-base flex items-center gap-2">
                
                    <span className="font-semibold text-gray-400">Overall Rating:</span>
                    <span className={`font-bold text-lg ${get_rating_colors(overallRating)}`}>
                        {overallRating} {overallRating !== 'N/A' ? '/ 10' : ''} 
                    </span>
                </p>
            </div>

            <div className="w-full sm:w-auto">
                <Link
                    to={`/feedback/${_id}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-md
                                transform hover:scale-105 transition duration-300 ease-in-out w-full"
                    >
                    View Feedback
                </Link>
            </div>
        </div>
    );
}