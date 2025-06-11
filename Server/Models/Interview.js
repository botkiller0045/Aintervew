import mongoose from "mongoose";

const interview_schema = new mongoose.Schema({
    role : {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    resume_name: {
        type: String,
        required: true,
    },
    match: {
        type: String,
        required: true,
    },
    time:{
        type: Number,
        default: 0
    },
    conversation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    completed: {
        type: Boolean,
        default: false
    },
    feedback: {
        interviewer_analysis: { type: String, default: "" },
        notable_strengths: { type: [String], default: [] },
        areas_for_improvement: { type: [String], default: [] },
        overall_rating: { type: Number, min: 0, max: 10, default: 0 }
    },
    scores: {
        technical_skills: { type: Number, default: 0 },
        problem_solving: { type: Number, default: 0 },
        communication: { type: Number, default: 0 },
        answer_relevance: { type: Number, default: 0 },
        vocabulary: { type: Number, default: 0 },
        example_provision: { type: Number, default: 0 },
        confidence: { type: Number, default: 0 },
        response_structure: { type: Number, default: 0 },
    }
}, {timestamps: true})

export const Interview = mongoose.model("Interview", interview_schema);