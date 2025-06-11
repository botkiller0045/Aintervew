import mongoose from "mongoose";

const message_schema = new mongoose.Schema({
    user_type : {
        type: String,
        enum: ["Interviewer", "Candidate"]
    },
    time: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Message = mongoose.model("Message", message_schema);