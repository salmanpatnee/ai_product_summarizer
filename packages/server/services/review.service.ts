import OpenAI from "openai"
import { type Review } from "../generated/prisma"
import { reviewRepository } from "../repositories/review.repository"

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const reviewService = {
    async fetchProductReviews(productId: number): Promise<Review[]> {
        return await reviewRepository.fetchProductReviews(productId)
    },

    async summarizeReviews(productId: number): Promise<String> {
        const reviews = await reviewRepository.fetchProductReviews(productId, 10)

        const joinedReviews = reviews.map(review => review.body).join('\n\n')

        const prompt = `
       Summarize the following customer reviews into a short paragraph. Highlight the main positive aspects customers liked, and the main negative aspects they mentioned. Keep the tone neutral and professional.

        Reviews: ${joinedReviews}
        `
        const response = await client.responses.create({
            'model': 'gpt-4.1',
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 500,
        })

        return response.output_text;
    }
}