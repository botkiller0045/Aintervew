import { api_connector } from "../apiConnector";
import { ai } from "../apis";
import toast from "react-hot-toast";
import {set_user_details} from "../../Slices/authSlice"

export async function create_interview(token, role, resume, resume_name, dispatch){

    const toast_id = toast.loading("LOADING.....")
    let result;
    try{

        const response = await api_connector("POST", ai.create_interview, {role, resume, resume_name},  {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response?.data;
    
        dispatch(set_user_details(response.data.user));
        localStorage.setItem("user_details", JSON.stringify(response.data.user));
    }
    catch(error){

        toast.error(error.response.data.message || "ERROR OCCURED WHILE CREATING AN INTERVIEW");
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}

export async function delete_interview(token, interview_id, dispatch){

    const toast_id = toast.loading("LOADING.....")
    let result;
    try{

        const response = await api_connector("POST", ai.delete_interview, {interview_id},  {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response?.data;
        dispatch(set_user_details(response.data.user_details));
        localStorage.setItem("user_details", JSON.stringify(response.data.user_details));
    }
    catch(error){

        toast.error(error.response.data.message || "ERROR OCCURED WHILE CREATING AN INTERVIEW");
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}

export async function start_interview(token, interview_id, navigate){

    let result;
    try{

        const response = await api_connector("POST", ai.start_interview, {interview_id},  {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response?.data;

    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message || "ERROR OCCURED WHILE ARRANGING AN INTERVIEW");
        result = error.response?.data;
        navigate("/");
    }
    finally{
        return result;
    }
}

export async function interview_response(token, interview_id, time, text, conversation){

    let result;
    try{

        const response = await api_connector("POST", ai.interview_response, {interview_id, time, text, conversation},  {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response?.data;

    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message || "ERROR OCCURED WHILE GENERATING THE RESPONSE");
        result = error.response?.data;
    }
    finally{
        return result;
    }
}

export async function generate_feedback(token, interview_id, dispatch){

    let result;
    try{
        const response = await api_connector("POST", ai.generate_feedback, {interview_id},  {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response?.data;
        
        dispatch(set_user_details(response.data.user_details));
        localStorage.setItem("user_details", JSON.stringify(response.data.user_details));
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message || "ERROR OCCURED WHILE GENERATING THE FEEDBACK");
        result = error.response?.data;
    }
    finally{
        return result;
    }
}

export async function get_feedback(token, interview_id, navigate){

    let result;
    try{
        const response = await api_connector("POST", ai.fetch_feedback, {interview_id},  {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response?.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message || "ERROR OCCURED WHILE FETCHING THE FEEDBACK");
        result = error.response?.data;
        navigate("/")
    }
    finally{
        return result;
    }
}