import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';
export const reviewsController = {
    async fetchProductReviews(req: Request, res: Response) {

        const productId = Number(req.params.id)

        if (isNaN(productId)) {
            res.status(400).json({ error: "Invalid product ID." })
            return;
        }

        const reviews = await reviewService.fetchProductReviews(productId)

        res.json(reviews)
    },

    async summarizeReviews(req: Request, res: Response) {
        const productId = Number(req.params.id)

        if (isNaN(productId)) {
            res.status(400).json({ error: "Invalid product ID." })
            return;
        }

        const product = await productRepository.getProduct(productId)

        if (!product) {
            res.status(400).json({ error: "Invalid product." })
            return;
        }

        const review = await reviewRepository.fetchProductReviews(productId, 1)

        if (!review.length) {
            res.status(400).json({ error: "Ther are no reviews of this product." })
            return;
        }

        const summary = await reviewService.summarizeReviews(productId)

        res.json(summary)
    }
}