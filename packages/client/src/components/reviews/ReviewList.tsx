import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RiSparkling2Fill } from 'react-icons/ri';
import { Button } from '../ui/button';
import ReviewSkeleton from './ReviewSkeleton';
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

// type SummarizeResponse = {
//    summary: string;
// };

const ReviewList = ({ productId }: Props) => {
   const {
      mutate: handleSummarize,
      isPending: isSummaryLoading,
      isError: summaryError,
      data: summarizeResponse,
   } = useMutation({
      mutationFn: () => summarizeReviews(),
   });

   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => getReviews(),
   });

   const getReviews = async () => {
      const { data } = await axios.get<GetReviewsResponse>(
         `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews`
      );

      return data;
   };

   const summarizeReviews = async () => {
      const { data } = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews/summarize`
      );

      return data;
   };

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
               <div key={i}>
                  <ReviewSkeleton />
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

   const currentSummary = reviewData.summary || summarizeResponse;

   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <div>
                  <Button
                     onClick={() => handleSummarize()}
                     disabled={isSummaryLoading}
                     className="cursor-pointer"
                  >
                     <RiSparkling2Fill /> Summarize
                  </Button>
                  {isSummaryLoading && (
                     <div className="py-3">
                        <ReviewSkeleton />
                     </div>
                  )}
                  {summaryError && (
                     <p className="text-red-400">Something went wrong.</p>
                  )}
               </div>
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
