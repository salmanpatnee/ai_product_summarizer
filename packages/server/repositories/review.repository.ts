import dayjs from "dayjs"
import { PrismaClient, type Review } from "../generated/prisma"

const prisma = new PrismaClient()

export const reviewRepository = {

    async fetchProductReviews(productId: number, limit?: number): Promise<Review[]> {
        return prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
            take: limit
        })
    },

    async storeReviewSummary(productId: number, summary: string) {
        const now = new Date()
        const expiresAt = dayjs().add(7, 'days').toDate()
        const attributes = {
            body: summary,
            expiresAt,
            generatedAt: now,
            productId: productId
        }

        return prisma.summary.upsert({
            where: { productId },
            create: attributes,
            update: attributes
        })
    }
}