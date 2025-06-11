import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {

    try{

        const token = req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success: false,
                message: "THERE IS ISSUE WITH LOGIN. PLEASE LOGIN AGAIN",
            })
        }

        try{
            const decode = jwt.verify(token, "AInterview");
            req.user = decode;
        }
        catch(error){

            return res.status(401).json({
                success: false,
                message: "LOGIN TIME EXPIRED. PLEASE LOGIN AGAIN",
            })
        }

        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "SOMETHING WENT WRONG WHILE VALIDATING TOKEN",
        })
    }
}


