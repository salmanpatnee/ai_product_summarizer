import OpenAI from "openai";
import { InferenceClient } from "@huggingface/inference";
import summarizePrompt from "../llm/prompts/review-summarizer.txt"

const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

interface GenerateTextParams {
    model?: string
    prompt: string
    temperature?: number
    maxTokens?: number
}

interface GeneratedTextResponse {
    id: string
    text: string
}

export const llmClient = {

    async generateText({ model = 'gpt-4.1', prompt, temperature = 0.2, maxTokens = 300 }: GenerateTextParams): Promise<GeneratedTextResponse> {
        const response = await openAIClient.responses.create({
            model,
            input: prompt,
            temperature,
            max_output_tokens: maxTokens,
        })

        return {
            id: response.id,
            text: response.output_text
        }
    },

    // async generateSummary(text: string) {
    //     const output = await inferenceClient.summarization({
    //         model: "facebook/bart-large-cnn",
    //         inputs: text,
    //         provider: "hf-inference",
    //     });

    //     return output.summary_text
    // },

    async summarizeReviews(reviews: string) {
        const chatCompletion = await inferenceClient.chatCompletion({
            provider: "cerebras",
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content: summarizePrompt,
                },
                {
                    role: "user",
                    content: reviews,
                },
            ],
        });

        return chatCompletion.choices[0]?.message.content || ''
    },

}