import { type Review, type Summary } from "../generated/prisma"
import { llmClient } from "../llm/client"
import { reviewRepository } from "../repositories/review.repository"
import template from "../prompts/review-summarizer.txt"



export const reviewService = {

    async summarizeReviews(productId: number): Promise<String> {

        const existingSummary = await reviewRepository.getReviewSummary(productId)

        if (existingSummary) {
            return existingSummary
        }

        const reviews = await reviewRepository.fetchProductReviews(productId, 10)

        const joinedReviews = reviews.map(review => review.body).join('\n\n')

        const prompt = template.replace('{{reviews}}', joinedReviews)

        // const { text: summary } = await llmClient.generateText({
        //     prompt,
        //     maxTokens: 500,
        // })

        const summary = await llmClient.generateSummary(joinedReviews)

        await reviewRepository.storeReviewSummary(productId, summary)

        return summary
    },


}