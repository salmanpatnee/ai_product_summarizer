import { PrismaClient, type Review } from "../generated/prisma"

export const reviewRepository = {

    async fetchProductReviews(productId: number): Promise<Review[]> {
        const prisma = new PrismaClient()

        return prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' }
        })
    }
}