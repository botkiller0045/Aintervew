import React from 'react'
import { useRef, useEffect } from 'react';

export default function ChatArea({messages, state, text}) {

    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {

        if (bottomRef.current) 
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        
    }, [messages]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.scrollLeft = inputRef.current.scrollWidth;
            inputRef.current.selectionStart = inputRef.current.selectionEnd = text.length;
        }
    }, [text]);
    

    return (
        <div className='text-white h-full flex flex-col justify-between bg-black'>
            <div className='border-b-2 flex flex-col border-b-gray-700 sm:flex-row justify-start sm:justify-between items-center p-3'>
                <h1 className='text-2xl p-1 font-bold'> Interview Chat</h1>

                <p
                    className={`px-3 py-1 rounded-md font-semibold text-sm bg-opacity-20 h-fit ${
                        state === "Interviewer speaking"
                        ? "text-blue-400 bg-blue-300"
                        : state === "Candidate speaking"
                        ? "text-green-400 bg-green-300"
                        : "text-yellow-400 bg-yellow-300"
                    }`}
                >{state}</p>
            </div>

            <div className='md:h-full h-[40vh] md:min-h-0 w-full overflow-y-auto flex flex-col gap-4 scrollbar-hide p-4 font-medium'>
                {
                    messages.map((item, index) => (
                        <div
                            key={index}
                            className={`max-w-[80%] px-4 py-2 rounded-lg ${
                                item.user_type === "Interviewer"
                                ? "bg-blue-600 text-white self-start"
                                : "bg-pure-greys-300 text-black self-end"
                            }`}
                            >
                            {item.text}
                        </div>
                    ))
                }

                <div ref={bottomRef}></div>
            </div>
            
            <div className="border-t-2 border-gray-700 flex items-center gap-2 px-4 py-3">
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    readOnly
                    placeholder="Your response will be displayed here"
                    className="w-full p-3 rounded-lg bg-richblack-900 text-white placeholder-richblack-400 outline-none"
                />
            </div>
        </div>
    )
}
