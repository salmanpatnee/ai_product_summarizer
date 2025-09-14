import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
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
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   const getReviews = async () => {
      try {
         setIsLoading(true);
         const { data } = await axios.get<GetReviewsResponse>(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews`
         );

         setReviewData(data);
      } catch (error) {
         console.log(error);
         setError('Something went wrong.');
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      getReviews();
   }, []);

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
               <div key={i}>
                  <Skeleton width={150} />
                  <Skeleton width={100} />
                  <Skeleton count={2} />
               </div>
            ))}
         </div>
      );
   }

   if (error) {
      return <p className="text-red-500">{error}</p>;
   }

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
