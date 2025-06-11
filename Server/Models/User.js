import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    user_name : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    total_interviews: {
        type: Number,
        default: 0
    },
    highest_score: {
        type: Number,
        default: 0
    },
    total_score: {
        type: Number,
        default: 0
    },
    completed_interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interview"
        }
    ],
    incomplete_interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interview"
        }
    ]
})

export const User = mongoose.model("User", user_schema);