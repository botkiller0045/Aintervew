import express from "express";
const auth_router = express.Router();

import {login, sign_up} from "../Controllers/Auth.js"

auth_router.post("/log_in", login);
auth_router.post("/sign_up", sign_up);

export default auth_router;