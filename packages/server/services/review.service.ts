import { type Review } from "../generated/prisma"
import { reviewRepository } from "../repositories/review.repository"

export const reviewService = {
    async fetchProductReviews(productId: number): Promise<Review[]> {
        return await reviewRepository.fetchProductReviews(productId)
    },

    async summarizeReviews(productId: number): Promise<String> {
        const reviews = await reviewRepository.fetchProductReviews(productId, 10)

        const joinedReviews = reviews.map(review => review.body).join('\n\n')

        const summary = "This is a summary";

        return summary;
    }
}