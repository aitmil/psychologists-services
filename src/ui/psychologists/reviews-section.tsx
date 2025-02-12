import { Review } from '@/lib/definitions';
import Icon from '@/ui/icon';

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <ul className="mb-10">
      {reviews.map((review, index) => (
        <li key={index} className="mb-[25px]">
          <div className="flex gap-3">
            <div className="flex justify-center items-center size-11 rounded-[100px] bg-orange-transparent text-orange-light text-[20px] leading-[100%]">
              {review.reviewer.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="leading-[125%] text-black">{review.reviewer}</p>
              <p className="inline-flex items-center text-sm leading-[129%] text-black">
                <Icon name="icon-star" className="size-[16px] mr-2" />
                {review.rating}
              </p>
            </div>
          </div>
          <p className="font-normal leading-[125%] text-primary-base/50 mt-[18px]">
            {review.comment}
          </p>
        </li>
      ))}
    </ul>
  );
}
