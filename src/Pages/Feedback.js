import React, { useEffect, useState } from 'react'
import { get_feedback } from '../Services/ServiceFunctions/ai';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTools, FaPuzzlePiece, FaComments, FaRegLightbulb, FaSmileBeam, FaWrench, FaThumbsUp, FaRegFileAlt } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { GiTalk } from "react-icons/gi";
import { BiGitCompare } from "react-icons/bi";
import { format_date, get_rating_colors } from '../Utils';
import Loading from '../Components/Loading';

export default function Feedback() {

    const {token} = useSelector(state => state.auth);
    const {id} = useParams();
    const [data, set_data] = useState({});
    const [state, set_state] = useState("feedback");
    const [loading, set_loading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const fetch_feed_back = async () => {
            set_loading(true);
            const reply = await get_feedback(token, id, navigate);
            console.log(reply);
            if(reply?.interview_details)
                set_data(reply.interview_details);
            set_loading(false);
        }

        fetch_feed_back();
        // eslint-disable-next-line
    }, [id]);

    if(loading || Object.keys(data).length === 0)
        return (<Loading text="Fetching feedback for the interview"/>)

    return (
        <div className="w-full bg-black min-h-[calc(100vh-4rem)] text-white">
            <div className="w-11/12 lg:w-10/12 mx-auto py-10">

                <div className="bg-gray-900 p-5 rounded-xl shadow-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                            <span className="text-blue-400">{data.role}</span> Interview Feedback
                        </h1>
                        <p className="text-gray-300 text-lg">
                            Resume: <span className="font-semibold">{data.resume_name}</span> | Date:{' '}
                            <span className="font-semibold">{format_date(data.createdAt)}</span>
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                        <div className="text-gray-300 text-lg">Final Score</div>
                        <div className={`text-5xl font-extrabold ${get_rating_colors(data.feedback.overall_rating)}`}>
                            {data.feedback.overall_rating}/10
                        </div>
                    </div>
                </div>

                <div className="p-2 flex justify-center gap-4 my-4 border-b-2 border-b-gray-700 py-5">
                    <button
                        onClick={() => set_state('feedback')}
                        className={`px-6 py-2 rounded-lg text-lg font-bold transition duration-300 w-full sm:w-auto
                                    ${state === 'feedback' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        Detailed Feedback
                    </button>

                    <button
                        onClick={() => set_state('conversation')}
                        className={`px-6 py-2 rounded-lg text-lg font-bold transition duration-300 w-full sm:w-auto
                                    ${state === 'conversation' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        Conversation Transcript
                    </button>
                </div>

                <div className='flex flex-col gap-4'>

                <div className={`${state === 'feedback' ? 'hidden' : 'block'} space-y-6 max-h-[70vh] overflow-y-auto`}>
                    {data.conversation.length === 0 ? 
                    (
                    <p className="text-center text-gray-400 text-lg py-4">No conversation data available.</p>
                    ) 
                    : 
                    (
                    data.conversation.map((message, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg shadow-md max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]
                                ${message.user_type === 'Interviewer'
                                ? 'bg-gray-700 text-gray-100 mr-auto rounded-tl-none' 
                                : 'bg-blue-800 text-blue-100 ml-auto rounded-tr-none'
                                }`}
                            >
                            <p className="font-bold text-xl">
                                {message.user_type === 'Interviewer' ? 'Interviewer' : 'You'}
                            </p>
                            <p className="text-base">{message.text}</p>
                        </div>
                    ))
                    )}
                </div>
                    
                    <div className={`flex flex-col gap-8 font-bold ${state === "conversation" ? "hidden" : "block"}`}>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {Object.keys(data.scores).map((scoreKey, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-900 p-2 rounded-lg shadow-md  flex flex-col items-center justify-center gap-2">
                                    <div className="flex items-center gap-2">
                                        {scoreKey === 'technical_skills' && <FaTools className="text-blue-400 text-3xl" />}
                                        {scoreKey === 'problem_solving' && <FaPuzzlePiece className="text-blue-400 text-3xl" />}
                                        {scoreKey === 'communication' && <FaComments className="text-blue-400 text-3xl" />}
                                        {scoreKey === 'answer_relevance' && <BiGitCompare className="text-blue-400 text-3xl" />}
                                        {scoreKey === 'vocabulary' && <HiOutlineSpeakerphone className="text-blue-400 text-3xl" />}
                                        {scoreKey === 'example_provision' && <FaRegLightbulb className="text-blue-400 text-3xl" />}
                                        {scoreKey === 'confidence' && <FaSmileBeam className="text-blue-400 text-3xl" />}
                                        {scoreKey === 'response_structure' && <GiTalk className="text-blue-400 text-3xl" />}
                                        <div className="text-gray-300 text-base capitalize">{scoreKey.replace(/_/g, ' ')}:</div>
                                    </div>
                                    <div className={`text-white text-3xl font-bold ${get_rating_colors(data.scores[scoreKey])}`}>
                                        {data.scores[scoreKey]}/10
                                    </div>
                                </div>
                            ))}
                        </div>

                        
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="flex-1 border-2 border-green-600 rounded-lg p-5 bg-green-900 bg-opacity-20 flex flex-col gap-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaThumbsUp className="text-green-400 text-2xl" />
                                    <h3 className="text-xl font-bold text-green-400">Strengths</h3>
                                </div>

                                {
                                    data.feedback.notable_strengths.length === 0 ? 
                                    (
                                    <p className="text-green-200 text-base">No notable strengths identified.</p>
                                    ) : 
                                    (
                                    <ul className="list-disc list-inside text-green-200 text-base space-y-1">
                                        {data.feedback.notable_strengths.map((item, index) => (
                                        <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

            
                            <div className="flex-1 border-2 border-red-600 rounded-lg p-5 bg-red-900 bg-opacity-20 flex flex-col gap-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaWrench className="text-red-400 text-2xl" />
                                    <h3 className="text-xl font-bold text-red-400">Areas for Improvement</h3>
                                </div>

                                {
                                    data.feedback.areas_for_improvement.length === 0 ? 
                                    (
                                    <p className="text-red-200 text-base">No notable areas for improvement identified.</p>
                                    ) : 
                                    (
                                    <ul className="list-disc list-inside text-red-200 text-base space-y-1">
                                        {data.feedback.areas_for_improvement.map((item, index) => (
                                        <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="border-2 border-yellow-600 rounded-lg p-5 bg-yellow-600 bg-opacity-20 flex flex-col gap-3">

                            <div className="flex items-center gap-2 mb-2">
                                <FaRegFileAlt className="text-yellow-400 text-2xl" />
                                <h3 className="text-xl font-bold text-yellow-400">Interviewer Analysis</h3>
                            </div>

                            {
                            data.feedback.interviewer_analysis === '' || !data.feedback.interviewer_analysis ? 
                            (
                                <p className="text-yellow-200 text-base">Analysis is not available.</p>
                            ) : 
                            (
                                <p className="text-yellow-200 text-base">{data.feedback.interviewer_analysis}</p>
                            )}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
