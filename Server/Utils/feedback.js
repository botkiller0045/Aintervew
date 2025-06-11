import {PromptTemplate} from "@langchain/core/prompts";
import {JsonOutputParser} from "@langchain/core/output_parsers";
import {OutputFixingParser} from "langchain/output_parsers"
import llm from "../llm.js";

const initial_analysis_template = `
As a senior interview coach, your task is to analyze the candidate's overall performance based on the following:
- Position applied for
- Their Resume
- The Complete Interview Conversation

Focus on identifying:
- award the results by considering the responses given by candidate to the questions asked by interviewer.
- If there is no reply for the question asked by interviewer consider that the candidate failed in that question and reduce the marks.
- Overall impression and recurring themes
- Observable strengths across multiple answers
- Areas where improvement is needed
- An overall readiness rating (on a scale of 0 to 10)

The "interviewer_analysis" should:
- Provide a clear and structured summary
- Mention tone, clarity, and alignment with the role
- Note if answers were consistent and reflective
- Mention how well the candidate fit the role expectations

DETAILS PROVIDED:
Resume: {resume}
Position: {position}
Complete Conversation: {complete_conversation}
{format_instructions}

OUTPUT FORMAT:
Respond with a **valid JSON object** like this:
{{
  "interviewer_analysis": "Detailed, reflective paragraph highlighting the above criteria.",
  "notable_strengths": ["array of specific strengths"],
  "areas_for_improvement": ["array of specific weaknesses"], 
  "overall_rating": "float (0.0 to 10.0)"
}}
`;

const get_score_template = `
As a senior interview coach, your task is to analyze the candidate's overall performance based on the following:
- Position applied for
- Their Resume
- The Complete Interview Conversation

INSTRUCTIONS:
Score each skill area **from 0 to 10**. Be honest and objective.
Each score should be based on the content of the interview, the candidate's expression, and relevance to the job role.

DETAILS PROVIDED:
Resume: {resume}
Position: {position}
Complete Conversation: {complete_conversation}
{format_instructions}

OUTPUT FORMAT:
Respond with a **valid JSON object** like this:
{{
  "technical_skills": number,
  "problem_solving": number,
  "communication": number,
  "answer_relevance": number,
  "vocabulary": number,
  "example_provision": number,
  "confidence": number,
  "response_structure": number
}}
`;

export const get_feedback = async (position, resume, complete_conversation) => {

    const parser = new OutputFixingParser({
        parser: new JsonOutputParser()
    });

    const initial_analysis_prompt = new PromptTemplate({
        template: initial_analysis_template,
        inputVariables: ["resume", "position", "complete_conversation"],
        partialVariables: {
            format_instructions: parser.getFormatInstructions()
        }
    })

    const chain_1 = initial_analysis_prompt.pipe(llm).pipe(parser);
    const response_1 = await chain_1.invoke({resume, position, complete_conversation});

    const get_score_prompt = new PromptTemplate({
        template: get_score_template,
        inputVariables: ["resume", "position", "complete_conversation"],
        partialVariables: {
            format_instructions: parser.getFormatInstructions()
        }
    })

    const chain_2 = get_score_prompt.pipe(llm).pipe(parser);
    const response_2 = await chain_2.invoke({resume, position, complete_conversation});

    return {
        analysis: response_1,
        scores: response_2
    };
}
