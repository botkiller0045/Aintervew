import React from 'react';

export default function Loading({text}) {
    return (
    
    <div className="fixed w-screen h-screen inset-0 right-0 z-[1100] !mt-0 grid place-items-center overflow-auto bg-black backdrop-blur-sm text-white p-5">
        <div className="relative z-10 flex flex-col items-center gap-6 p-8 bg-gray-900 rounded-xl shadow-lg border border-gray-700 animate-fade-in">
        
            <div className="animate-spin h-16 w-16 border-4 border-blue-400 border-t-transparent rounded-full animate-pulse-subtle">

            </div>
        
            <p className="text-xl md:text-2xl text-blue-300 font-semibold text-center animate-text-fade">
                {text}
            </p>
            <p className="text-base text-gray-400 text-center">
                Please wait a moment.
            </p>
        </div>
    </div>
  );
}
