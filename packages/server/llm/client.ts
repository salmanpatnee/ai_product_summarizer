import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

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
        const response = await client.responses.create({
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

}