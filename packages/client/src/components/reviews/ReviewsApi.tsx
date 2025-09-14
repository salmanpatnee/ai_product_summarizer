import axios from 'axios';

type Review = {
   id: number;
   productId: number;
   rating: number;
   body: string;
   createdAt: string;
};

export type GetReviewsResponse = {
   summary: string;
   reviews: Review[];
};

export const reviewsApi = {
   getReviews(productId: number) {
      return axios
         .get<GetReviewsResponse>(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews`
         )
         .then((res) => res.data);
   },

   summarizeReviews(productId: number) {
      return axios
         .post(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews/summarize`
         )
         .then((res) => res.data);
   },
};
