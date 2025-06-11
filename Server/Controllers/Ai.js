import { User } from "../Models/User.js";
import { Interview } from "../Models/Interview.js";
import { Message } from "../Models/Message.js";
import { get_resume_score } from "../Utils/resume_score.js";
import { interview } from "../Utils/interview.js";
import { get_feedback } from "../Utils/feedback.js";

export const create_interview = async (req, res) => {
    try{
        const id = req.user.id;
        const {role, resume, resume_name} = req.body;
        
        if (!role || !resume) {
            return res.status(400).json({
                success: false,
                message: "ROLE AND RESUME ARE REQUIRED."
            });
        }

        const {match} = await get_resume_score(role, resume);

        const interview = await Interview.create({
            role: role, 
            resume: resume,
            resume_name: resume_name,
            match: match
        })

        const user = await User.findByIdAndUpdate(id, 
            {$push: {incomplete_interviews: interview._id}},
            {new: true})
            .populate(["completed_interviews", "incomplete_interviews"])
        
        return res.status(200).json({
            success: true,
            message: "INTERVIEW CREATED SUCCESSFULLY.",
            user: user
        });

    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "SERVER ERROR OCCURED WHILE CREATING AN INTERVIEW."
        });
    }
}

export const start_interview = async (req, res) => {
    try{
        const id = req.user.id;
        const {interview_id} = req.body;

        const interview_details = await Interview.findById(interview_id)
                                    .populate({
                                        path: 'conversation',
                                        options: { sort: { createdAt: 1 } }  // ascending order by creation time
                                      });
        
        let conversation = interview_details.conversation;
        const time = conversation.length > 0 ? conversation[conversation.length - 1].time + 1 : 0;

        conversation = interview_details.conversation
            .map(msg => `${msg.user_type}: ${msg.text}`)
            .join("\n");

        const response = await interview(interview_details.role, interview_details.resume, conversation, "", time);

        const message = await Message.create({
            user_type: "Interviewer",
            time: time,
            text: response.message
        });

        interview_details.conversation.push(message._id);
        interview_details.time = time
        await interview_details.save();

        await interview_details.populate({
            path: 'conversation',
            options: { sort: { createdAt: 1 } }
        });

        return res.status(200).json({
            success: true,
            message: "INTERVIEW STARTED SUCCESSFULLY.",
            interview_details: interview_details,
            conversation: interview_details.conversation,
            interviewer_text: response.message
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "SERVER ERROR OCCURED WHILE ARRANGING THE INTERVIEW."
        });
    }
}

export const delete_interview = async (req, res) => {
    try{

        const user_id = req.user.id;
        const {interview_id} = req.body;
        
        const user = await User.findById(user_id);

        Interview.findByIdAndDelete(interview_id)
                            
        const inc_index = user.incomplete_interviews.indexOf(interview_id);
        if (inc_index !== -1) 
            user.incomplete_interviews.splice(inc_index, 1);
        await user.save();

        let user_details = await User.findById(user_id).populate(["completed_interviews", "incomplete_interviews"]).exec();

        return res.status(200).json({
            success: true,
            message: "INTERVIEW DELETED SUCCESSFULLY.",
            user_details: user_details
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "SERVER ERROR OCCURED WHILE DELETING THE INTERVIEW."
        });
    }
}

export const interview_response = async (req, res) => {
    try{
    
        const {interview_id, time, text, conversation} = req.body;
        const interview_details = await Interview.findById(interview_id)
        
        if (!interview_details) {
            return res.status(404).json({
                success: false,
                message: "INTERVIEW NOT FOUND."
            });
        }

        const new_conversation = conversation
            .map(msg => `${msg.user_type}: ${msg.text}`)
            .join("\n");

        const response = await interview(interview_details.role, interview_details.resume, new_conversation, text, time);

        const Candidate_message = await Message.create({
            user_type: "Candidate",
            time: time,
            text: text
        });

        const Interviewer_message = await Message.create({
            user_type: "Interviewer",
            time: time + 1,
            text: response.message
        });

        interview_details.conversation.push(Candidate_message._id);
        interview_details.conversation.push(Interviewer_message._id);
        interview_details.time = time + 1
        await interview_details.save();

        return res.status(200).json({
            success: true,
            message: "INTERVIEWER ANALYSED RESPONSE SUCCESSFULLY.",
            interviewer_response: Interviewer_message,
            end_interview: response.end_interview
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "SERVER ERROR OCCURED WHILE ANALYSING THE RESPONSE."
        });
    }
}

export const generate_feedback = async (req, res) => {
    try{
        const user_id = req.user.id;
        const {interview_id} = req.body;

        const user = await User.findById(user_id);
        if (!user){
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const interview_details = await Interview.findById(interview_id)
                                    .populate({
                                        path: 'conversation',
                                        options: { sort: { createdAt: 1 } }  
                                    });
        if (!interview_details) {
            return res.status(404).json({
                success: false,
                message: "INTERVIEW NOT FOUND."
            });
        }

        const conversation = interview_details.conversation
            .map(msg => `${msg.user_type}: ${msg.text}`)
            .join("\n");


        const response = await get_feedback(interview_details.role, interview_details.resume, conversation)
        interview_details.completed = true;
        interview_details.feedback = response.analysis;
        interview_details.scores = response.scores
        await interview_details.save();

        const overall_rating = response.analysis?.overall_rating || 0;
        
        const inc_index = user.incomplete_interviews.indexOf(interview_id);
        if (inc_index !== -1) 
            user.incomplete_interviews.splice(inc_index, 1);

        if(!user.completed_interviews.includes(interview_id)) 
            user.completed_interviews.push(interview_id);
        user.total_score = Number(user.total_score) + Number(overall_rating);
        user.total_interviews = user.completed_interviews.length;
        user.highest_score = Math.max(user.highest_score, overall_rating);
        await user.save();

        const user_details = await User.findById(user_id).populate(["completed_interviews", "incomplete_interviews"]).exec();

        return res.status(200).json({
            success: true,
            message: "INTERVIEW FEEDBACK GENERATED SUCCESSFULLY.",
            interview_details: interview_details,
            user_details: user_details
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "SERVER ERROR OCCURED WHILE GENERATING THE FEEDBACK."
        });
    }
}

export const fetch_feedback = async (req, res) => {
    try{
    
        const {interview_id} = req.body;

        const interview_details = await Interview.findById(interview_id)
                                    .populate({
                                        path: 'conversation',
                                        options: { sort: { createdAt: 1 } }  
                                    });

        if (!interview_details) {
            return res.status(404).json({
                success: false,
                message: "INTERVIEW NOT FOUND."
            });
        }

        if (!interview_details.completed) {
            return res.status(403).json({
                success: false,
                message: "INTERVIEW IS NOT COMPLETED TO FETCH FEEDBACK."
            });
        }

        return res.status(200).json({
            success: true,
            message: "INTERVIEW FEEDBACK FETCHED SUCCESSFULLY.",
            interview_details: interview_details
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "SERVER ERROR OCCURED WHILE FETCHING THE FEEDBACK."
        });
    }
}

