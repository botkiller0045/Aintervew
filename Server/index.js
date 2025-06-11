import express from "express";
import cors from "cors";

const PORT = 4000;
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));


app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});

import { db_connect } from "./Config/database.js";
db_connect();

import auth_router from "./Routes/Auth.js"
import ai_router from "./Routes/Ai.js";

app.use("/api/v1/auth", auth_router);
app.use("/api/v1/ai", ai_router);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Your Server is up and running...... "
    });
});
