import { llmClient } from "../llm/client"
import { reviewRepository } from "../repositories/review.repository"

export const reviewService = {

    async summarizeReviews(productId: number): Promise<String> {

        const existingSummary = await reviewRepository.getReviewSummary(productId)

        if (existingSummary) return existingSummary

        const reviews = await reviewRepository.fetchProductReviews(productId, 10)

        const joinedReviews = reviews.map(review => review.body).join('\n\n')

        const summary = await llmClient.summarizeReviews(joinedReviews)

        await reviewRepository.storeReviewSummary(productId, summary)

        return summary
    },

}