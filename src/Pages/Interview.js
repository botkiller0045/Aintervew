import React, { useEffect, useState, useRef } from 'react'
import { format_time } from '../Utils';
import ChatArea from '../Components/ChatArea';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generate_feedback, interview_response, start_interview } from '../Services/ServiceFunctions/ai';
import toast from 'react-hot-toast';
import Loading from '../Components/Loading';
import interviewer from "../Images/Interviewer.png"

export default function Interview() {

    const [time, set_time] = useState(0);
    const [msgs, set_msgs] = useState([]);
    const [data, set_data] = useState("")
    const [loading, set_loading] = useState("");
    const [interviewer_text, set_interviewer_text] = useState("");
    const [state, set_state] = useState("")
    const [is_processing, set_is_processing] = useState(true);
    const [text, set_text] = useState("");
    const [end_interview, set_end_interview] = useState(false);
    const stream_ref = useRef(null);
    const video_ref = useRef(null);
    const {id} = useParams();
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const init_interview = async () => {
            set_loading("Preparing the interview...");
        
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                toast.error("SPEECH RECOGNITION IS NOT SUPPORTED IN THIS BROWSER.");
                stop_camera();
                navigate("/dashboard");
                return;
            }
        
            try{
                const reply = await start_interview(token, id, navigate);
        
                if (reply.success) {
                    set_msgs(reply.conversation);
                    set_data(reply.interview_details);
                    set_time(reply.interview_details.time);
                    set_interviewer_text(reply.interviewer_text);
                }
                set_loading("");
                const media_stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video_ref.current.srcObject = media_stream;
                stream_ref.current = media_stream;
        
            }
            catch (error) {
                console.log(error);
                if(video_ref.current){
                    toast.error("CAMERA NOT AVAILABLE.");
                    stop_camera();
                    navigate("/dashboard");
                }
            }
        };
        
    
        init_interview();
    
        return () => {
            if(stream_ref.current){
                stream_ref.current.getTracks().forEach((track) => track.stop());
                stream_ref.current = null;
            }
        };
        
        // eslint-disable-next-line
    }, []);
    

    useEffect(() => {
        const synth = window.speechSynthesis;
    
        if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) {
            toast.error("SPEECH SYNTHESES IS NOT SUPPORTED IN THIS BROWSER.");
            stop_camera();
            navigate("/dashboard");  
            return;
        }
    
        const voices = synth.getVoices();

        const indianFemaleVoice = voices.find(voice =>
            voice.lang.toLowerCase().includes('en-in') &&
            voice.name.toLowerCase().includes('female')
        ) || voices.find(voice => voice.lang.toLowerCase().includes('en-in')) || voices[0];

        const utter = new SpeechSynthesisUtterance(interviewer_text);
        utter.voice = indianFemaleVoice;
        utter.lang = indianFemaleVoice?.lang || 'en-IN';
    
        const speak = async () => {
            set_state("Interviewer Speaking");
    
            utter.onend = async () => {
                set_is_processing(false);
    
                if (end_interview)
                    await generate_feedback_fun();
                else {
                    set_state("Candidate Speaking");
                    start_recording();
                }
            };
    
            synth.speak(utter);
        };
    
        speak();
    
        return () => {
            synth.cancel();  // stops any ongoing speech
        };
        // eslint-disable-next-line
    }, [interviewer_text]);

    useEffect(() => {
        const timer = setTimeout(() => {
            set_time((prev) => prev + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [time]);

    const generate_response_fun = async (message) => {
        set_state("Auto Sending The Response");
        set_msgs((prev) => [
            ...prev, {
                user_type : "Candidate",
                text: message,
                time: time
            }
        ])
        set_state("Interviewer Analysing...");

        const reply = await interview_response(token, id, time, message, msgs);
        set_text("");

        if(reply.success){
            set_msgs((prev) => [...prev, reply.interviewer_response]);
            set_end_interview(reply.end_interview)
            set_interviewer_text(reply.interviewer_response.text);
        }
        set_is_processing(false);
    }

    const generate_feedback_fun = async () => {
        set_loading("Generating the feedback...");
        await generate_feedback(token, id, dispatch);
        stop_camera();
        set_loading("");
        navigate("/dashboard");
    }

    const stop_camera = () => {
        if (stream_ref.current) {
            stream_ref.current.getTracks().forEach((track) => track.stop());
            stream_ref.current = null;
        }
    };

    const start_recording = () => {

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
    
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';
    
        let speech_detected = false;
        let silenceTimeout;
        let full_transcript_accumulator = "";
    
        const stopAfterSilence = () => {
            silenceTimeout = setTimeout(() => {
                recognition.stop();
            }, 10000);
        };
    
        recognition.onstart = () => {
            speech_detected = false;
            stopAfterSilence();
        };
    
        recognition.onspeechstart = () => {
            speech_detected = true;
        };
    
        recognition.onresult = function (event) {
            let full_transcript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) 
                full_transcript += event.results[i][0].transcript + " ";
            
            set_text((prev) => prev + " " + full_transcript);
            full_transcript_accumulator += full_transcript;

            clearTimeout(silenceTimeout);
            stopAfterSilence();
        };
    
        recognition.onerror = (error) => {
            console.log(error);
            if(error.error === "aborted")
                toast.error("Speech aborted. Please try again.");
            else if(error.error === 'network'){
                toast.error("SPEECH RECOGNITION IS NOT SUPPORTED IN THIS BROWSER.");
                stop_camera();
                navigate("/dashboard");
            }
            else
                toast.error("SPPECH ERROR + ", error.error)
            
            set_is_processing(false);
            set_state("Candidate Speaking");
        };
    
        recognition.onend = () => {
            if(is_processing) 
                return;

            console.log(speech_detected, full_transcript_accumulator)
            if (!speech_detected || full_transcript_accumulator.trim() === "") {
                toast("NO SPEECH DETECTED. PLEASE SPEAK AGAIN.");
                set_is_processing(false);
                set_state("Candidate Speaking");
                return;
            }
            
            set_is_processing(true);
            generate_response_fun(full_transcript_accumulator);
        };
    
        recognition.start();
    };
    
    if(loading !== ""){
        return (<Loading text={loading}/>)
    }
    return (
        <div className="w-full bg-richblack-900 min-h-[calc(100vh-4rem)] flex flex-col gap-5 p-5">
            <div className="w-full max-w-7xl mx-auto rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
                <h1 className="text-xl md:text-3xl font-bold text-white text-center sm:text-left">
                    <span className="text-blue-400">{data.role}</span> Interview
                </h1>

                <div className="flex items-center gap-4">
                <div className="text-white text-2xl md:text-3xl font-extrabold px-3 py-1 bg-gray-700 rounded-lg">
                    {format_time(time)}
                </div>
                <button
                    onClick={generate_feedback_fun}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-base font-bold rounded-lg shadow-md
                            transform hover:scale-105 transition duration-300 ease-in-out whitespace-nowrap"
                    disabled={is_processing} // Disable if AI is processing
                >
                    End Interview
                </button>
                </div>
            </div>

            <div className="bg-gray-900 p-5 rounded-lg w-full justify-evenly max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:h-[calc(100vh-300px)] lg:h-[calc(100vh-180px)]">
                <div className='flex-1 lg:w-[65%] rounded-xl shadow-lg overflow-hidden flex flex-col md:h-1/2 lg:h-full h-full'>
                    <ChatArea messages={msgs} state={state} text={text}/>
                </div>

                <div className='flex-shrink-0 w-full lg:w-[35%] flex flex-col md:flex-row lg:flex-col gap-6'>
                    <div className="lg:h-1/2 md:w-1/2 lg:w-full w-full">
                        <video
                            ref={video_ref}
                            autoPlay
                            playsInline
                            muted
                            className="rounded-lg w-full h-full object-cover"
                        />
                    </div>

                    <div className="mx-auto h-1/2 w-full md:w-1/2 lg:w-full bg-black rounded-md flex items-center justify-center min-h-[25vh] relative overflow-hidden">

                        {state === "Interviewer Speaking" && (
                            <>
                            <span className="absolute w-[140px] h-[140px] rounded-full border-4 border-red-500 animate-ping opacity-75"></span>
                            <span className="absolute w-[180px] h-[180px] rounded-full border-2 border-red-400 animate-ping delay-200 opacity-50"></span>
                            </>
                        )}
                        
                        <img src={interviewer} alt='interviewer' className="w-[100px] h-[100px] rounded-full relative z-10"></img>
                    </div>

                </div>

            </div>
        </div>
    )
}
