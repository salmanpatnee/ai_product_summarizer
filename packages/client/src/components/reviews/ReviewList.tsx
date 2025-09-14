import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import StarRating from './StarRating';
import { RiSparkling2Fill } from 'react-icons/ri';
import { Button } from '../ui/button';
import { useState } from 'react';

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

type SummaryResponse = {
   summary: string;
};

const ReviewList = ({ productId }: Props) => {
   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => getReviews(),
   });

   const [summary, setSummary] = useState('');

   const getReviews = async () => {
      const { data } = await axios.get<GetReviewsResponse>(
         `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews`
      );

      return data;
   };

   const handleSummary = async () => {
      const { data } = await axios.post<SummaryResponse>(
         `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews/summarize`
      );

      setSummary(data.summary);
   };

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
      return <p className="text-red-500">Something went wrong.</p>;
   }

   if (!reviewData?.reviews.length) {
      return null;
   }

   const currentSummary = reviewData.summary || summary;

   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <Button onClick={handleSummary}>
                  <RiSparkling2Fill /> Summarize
               </Button>
            )}
         </div>
         <div className="flex flex-col gap-5">
            {reviewData?.reviews.map((review) => (
               <div key={review.id}>
                  <StarRating value={review.rating} />
                  <p className="py-2">{review.body}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ReviewList;
