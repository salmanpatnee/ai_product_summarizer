import express from "express";
import { reviewsController } from './controllers/review.controller';

const router = express.Router();

router.get('/api/products/:id/reviews', reviewsController.fetchProductReviews);
router.post('/api/products/:id/reviews/summarize', reviewsController.summarizeReviews);

export default router;