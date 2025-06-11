import {User} from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const sign_up = async (req, res) => {
    try{
        
        const { user_name, email, password } = req.body;
        
        if(!user_name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "SOME REQUIRED DETAILS ARE EMPTY",
            })
        }

        const existing_user = await User.findOne({email : email, user_name: user_name});

        if(existing_user){
            return res.status(409).json({
                success: false,
                message: "USER IS ALREADY REGISTERED",
            })
        }

        const hashed_pass = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            user_name: user_name,
            email: email,
            password: hashed_pass,
        })

        return res.status(200).json({
            success: true,
            message: "USER REGISTERED SUCCESSFULLY",
            user: user,
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            message: error.message,
            details: "ERROR DURING SIGN UP PROCESS. PLEASEX TRY AGAIN",
        })
    }
}

export const login = async (req, res) => {

    try{
        const {user_name, password} = req.body;

        if(!user_name || !password){
            return res.status(400).json({
                success: false,
                message: "ALL FIELDS ARE MANDATORY, PLEASE TRY AGAIN",
            })
        };

        let user = await User.findOne({user_name: user_name}).populate(["completed_interviews", "incomplete_interviews"]).exec();

        if(!user){
            return res.status(401).json({
                success: false,
                message: "USER NOT REGISTERED, PLEASE SIGN UP FIRST",
            })
        }
        console.log(user);
        
        if(await bcrypt.compare(password, user.password)){

            const payload = {
                user_name: user_name,
                id : user._id,
            }

            const token = jwt.sign(payload, "AInterview", {
                expiresIn: "10h",
            });
            
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            
            return res.status(200).json({
                success: true,
                user: user,
                message: "LOGGED IN SUCCESSFULLY",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "INVALID PASSWORD. PLEASE TRY AGAIN",
            })
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            details: error.message,
            message: "ERROR OCCURED WHILE LOGGING IN. PLEASE TRY AGAIN",
        })
    }
}