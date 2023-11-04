require('dotenv').config();
const db = require('./db.json');
const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
const { LLMChain } = require("langchain/chains");

const llm = new OpenAI(
{
    openAIApiKey: process.env.OPEN_AI_KEY,
}
);

const prompt = PromptTemplate.fromTemplate(
    "You are an helpful assistant who can take the orderId from the user and provide them the details for that particular orderId.\n Provide the details in a readable text format for orderId {orderId} by reading the JSON {data}." 
);

async function result(){
    const chain = new LLMChain({ llm: llm, prompt });
    const llmResult = await chain.call({orderId: 1, data: db });
    console.log(llmResult);
}
 
result();

