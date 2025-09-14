import { FaRegStar, FaStar } from 'react-icons/fa';

interface Props {
   value: number;
}

const StarRating = ({ value }: Props) => {
   const placeholder = [1, 2, 3, 4, 5];

   return (
      <div className="flex gap-1 text-yellow-400">
         {placeholder.map((p) =>
            p <= value ? <FaStar key={p} /> : <FaRegStar key={p} />
         )}
      </div>
   );
};

export default StarRating;
