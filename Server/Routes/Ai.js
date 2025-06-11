import express from "express";
const ai_router = express.Router();

import {auth} from "../Middlewares/Auth.js"
import { create_interview, start_interview, interview_response, delete_interview, generate_feedback, fetch_feedback } from "../Controllers/Ai.js";

ai_router.post("/create_interview", auth, create_interview);
ai_router.post("/delete_interview", auth, delete_interview);
ai_router.post("/start_interview", auth, start_interview);
ai_router.post("/interview_response", auth, interview_response);
ai_router.post("/generate_feedback", auth, generate_feedback);
ai_router.post("/fetch_feedback", auth, fetch_feedback);

export default ai_router;