import {PromptTemplate} from "@langchain/core/prompts";
import {JsonOutputParser} from "@langchain/core/output_parsers";
import {OutputFixingParser} from "langchain/output_parsers"
import llm from "../llm.js";

const template = `
    You are an Applicant Tracking Systems(ATS). Based on the resume and role given below, assess how well the resume matches the role.Give priority to the technical
    skills he mentioned in the resume to generate the matching score and also check whether all the details required in the
    resume is written and alter the matching score with this context also.
    Respond ONLY with a JSON object of this format:
    {{ "match": "<percentage_score_as_integer>" }}

    DETAILS:
    Resume: {resume}
    Role: {role}
    {format_instructions}
`
export const get_resume_score = async (role, resume) => {

    const parser = new OutputFixingParser({
        parser: new JsonOutputParser()
    });

    const prompt = new PromptTemplate({
        template: template,
        inputVariables: ["resume", "role"],
        partialVariables: {
            format_instructions: parser.getFormatInstructions()
        }
    })

    const chain = prompt.pipe(llm).pipe(parser);
    const response = await chain.invoke({resume, role});

    return response;
}
