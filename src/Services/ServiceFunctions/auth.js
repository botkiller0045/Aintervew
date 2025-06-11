import { api_connector } from "../apiConnector";
import { auth } from "../apis";
import toast from "react-hot-toast";
import {set_token, set_user_details} from "../../Slices/authSlice"

export async function sign_up(user_name, email, password){

    const toast_id = toast.loading("LOADING.....")
    let result;
    try{

        const response = await api_connector("POST", auth.SIGNUP, {user_name, email, password});

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response?.data;
    }
    catch(error){

        toast.error(error.response.data.message || "ERROR OCCURED WHILE DOING SIGN UP");
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}

export async function log_in(user_name, password, dispatch){

    const toast_id = toast.loading("LOADING.....")
    let result;
    try{

        const response = await api_connector("POST", auth.LOGIN, {user_name, password});

        if(!response.data.success)
            throw new Error(response.data.message);
        
        toast.success(response.data.message);
        result = response?.data;

        localStorage.setItem("token", JSON.stringify(response.data.user.token));
        localStorage.setItem("user_details", JSON.stringify(response.data.user));

        dispatch(set_token(response.data.user.token));
        dispatch(set_user_details(response.data.user));
    }
    catch(error){

        toast.error(error.response.data.message || "ERROR OCCURED WHILE DOING SIGN UP");
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}
