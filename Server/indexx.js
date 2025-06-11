import express from "express";
import cors from "cors";
import multer from "multer";
import llm from "./llm.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { aiInterview } from "./Utils/prompts.js";

const PORT = 4000;
const upload = multer({ dest: "./uploads" });

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json()); // <== important

app.post('/interview', async (req, res) => {
    try {
      const {
        resume,
        position,
        numberOfQuestionYouShouldAsk,
        numberOfQuestionLeft,
        previousConversation,
        user
      } = req.body;
  
      if (!resume || !position || numberOfQuestionYouShouldAsk === undefined || numberOfQuestionLeft === undefined) {
        return res.status(400).json({ error: 'Missing required fields in the request body.' });
      }
  
      const aiResponse = await aiInterview(
        resume,
        position,
        numberOfQuestionLeft,
        numberOfQuestionYouShouldAsk,
        previousConversation || "",
        user || "Let's start the interview."
      );
        console.log(aiResponse, previousConversation)
      res.status(200).json({ response: aiResponse });
  
    } catch (error) {
      console.error('[server] Interview Error:', error);
      res.status(500).json({ error: 'Internal Server Error', detail: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Your Server is up and running...... "
    });
});
