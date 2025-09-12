import { type Review } from "../generated/prisma"
import { llmClient } from "../llm/client"
import { reviewRepository } from "../repositories/review.repository"



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
        const response = await llmClient.generateText({
            prompt,
            maxTokens: 500,
        })

        return response.text
    }
}