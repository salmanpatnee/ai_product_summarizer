import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';

interface Props {
   productId: number;
}

type Review = {
   id: number;
   productId: number;
   rating: number;
   body: string;
   createdAt: string;
};

type GetReviewsResponse = {
   summary: string;
   reviews: Review[];
};

const ReviewList = ({ productId }: Props) => {
   const [reviewData, setReviewData] = useState<GetReviewsResponse>();

   const getReviews = async () => {
      const { data } = await axios.get<GetReviewsResponse>(
         `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews`
      );

      setReviewData(data);
   };

   useEffect(() => {
      getReviews();
   }, []);

   return (
      <div className="flex flex-col gap-5">
         {reviewData?.reviews.map((review) => (
            <div key={review.id}>
               <StarRating value={review.rating} />
               <p className="py-2">{review.body}</p>
            </div>
         ))}
      </div>
   );
};

export default ReviewList;
