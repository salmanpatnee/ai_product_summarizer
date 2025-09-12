import { type Review } from "../generated/prisma"
import { llmClient } from "../llm/client"
import { reviewRepository } from "../repositories/review.repository"
import template from "../prompts/review-summarizer.txt"



export const reviewService = {
    async fetchProductReviews(productId: number): Promise<Review[]> {
        return await reviewRepository.fetchProductReviews(productId)
    },

    async summarizeReviews(productId: number): Promise<String> {
        const reviews = await reviewRepository.fetchProductReviews(productId, 10)

        const joinedReviews = reviews.map(review => review.body).join('\n\n')

        const prompt = template.replace('{{reviews}}', joinedReviews)

        const response = await llmClient.generateText({
            prompt,
            maxTokens: 500,
        })

        return response.text
    }
}