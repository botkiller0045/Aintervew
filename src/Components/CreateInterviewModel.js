import React, { useRef } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext';
import { useDispatch, useSelector } from 'react-redux';
import { create_interview } from '../Services/ServiceFunctions/ai';
import { X } from 'lucide-react'; 

export default function CreateInterviewModel({set_create_interview, set_loading}) {
    
    const file_input_ref = useRef();
    const [data, set_data] = useState({
        position: '',
        resume: null,
    });
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);

    const handle_change = (e) => {
        set_data({ 
            ...data, 
            [e.target.name]: e.target.files ? e.target.files[0] : e.target.value 
        });
    };

    const handle_submit = async (event) => {
        event.preventDefault();

        if(data.position === "" || !data.resume ){
            toast.error("ALL DETAILS ARE MANDATORY");
            return;
        }
        try {
            const text = await pdfToText(data.resume); 
            set_loading("Creating an Interview...")
            await create_interview(token, data.position, text, data.resume.name, dispatch); 
            set_loading("")
            set_create_interview(false);
        } 
        catch(error){
            toast.error("FAILED TO EXTRACT DATA FROM THE PDF.");
        }
    }

    return (
        <div className="fixed w-screen h-screen inset-0 right-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm text-white p-5">
            <div className=' bg-richblack-800 h-fit max-w-[400px] w-full flex flex-col gap-6 py-8 px-5 rounded-md border-2 border-richblack-600'>
                
                <div className='flex items-center justify-between border-b-[1px] pb-2 border-b-gray-700'>
                    <h2 className="text-xl font-bold">Create an Interview</h2>
                    
                    <button type='button' className="text-xl" onClick={(event) => {
                        event.preventDefault();
                        set_create_interview(false);
                    }}>
                        <X className="w-5 h-6"/>
                    </button>
                </div>

                <form onSubmit={handle_submit}
                    className='flex flex-col gap-6'>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Position<sup className=" text-red-500">*</sup></label>
                        <select 
                            name="position" 
                            id="position"
                            className="p-2 rounded text-black"
                            value={data.position}
                            onChange={handle_change}
                            required
                            >
                            <option value="">Select a position</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Data Analyst">Data Analyst</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                            <option value="Software Engineer (General)">Software Engineer (General)</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Upload Resume<sup className=" text-red-500">*</sup></label>

                        <input type='file' accept='application/pdf' className='hidden' name='resume'
                            ref={file_input_ref} onChange={handle_change}
                        />

                        <div className='flex items-center gap-3'>
                            <button type='button'
                                className="p-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-base font-bold rounded-lg shadow-md
                                    transform hover:scale-105 transition duration-300 ease-in-out"
                                onClick={(event) => {
                                    event.preventDefault();
                                    file_input_ref.current.click()
                                }}>
                                    Select
                            </button>
                            {data.resume ? <p className="text-sm mt-1 text-green-600 truncate">{data.resume.name}</p> : <p>No resume selected</p>}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-2 p-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-lg shadow-xl
                       transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        Create Interview with resume score
                    </button>
                </form>
            </div>
        </div>
    )
}
