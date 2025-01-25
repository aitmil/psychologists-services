'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Icon from '../icon';
import Button from '../button';
import { Psychologist } from '@/app/lib/definitions';

interface PsychologistCardProps {
  psychologist: Psychologist;
}

export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  const [showReviews, setShowReviews] = useState(false);
  const router = useRouter();

  const handleReadMoreClick = () => {
    setShowReviews(true);
  };

  const renderAvatar = (name: string) => {
    const initial = name.charAt(0).toUpperCase();
    return (
      <div className="flex justify-center items-center size-11 rounded-[100px] bg-orange-transparent text-orange-light text-[20px] leading-[100%]">
        {initial}
      </div>
    );
  };

  return (
    <>
      <div className="size-[120px] p-3 border-2 border-orange-transparent rounded-[30px]">
        <div className="relative">
          <Image
            width={96}
            height={96}
            src={psychologist.avatar_url}
            alt="Photo of psychologist"
            className="rounded-[15px]"
          />
          <Icon
            name="icon-point"
            className="absolute top-0 right-0 w-[14px] h-[14px]"
          ></Icon>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <h2>Psychologist</h2>
          <div className="flex gap-[28px] items-center">
            <ul className="flex text-black">
              <li className="flex gap-1 items-center">
                <Icon name="icon-star" className="size-[16px]"></Icon>
                <h4>Rating:</h4>
                <p className="pr-[16px]">{psychologist.rating}</p>
              </li>
              <li className="flex gap-1 items-center">
                <h4 className="pl-[16px] border-l-[1px] border-l-primary-base/20">
                  Price / 1 hour:
                </h4>
                <p className="text-green">{psychologist.price_per_hour}$</p>
              </li>
            </ul>
            <Icon
              name="icon-heart"
              className="size-[26px] stroke-black fill-transparent"
            ></Icon>
          </div>
        </div>

        <h3 className="mb-6 text-2xl leading-[100%] text-black">
          {psychologist.name}
        </h3>

        <ul className="flex flex-wrap gap-x-1 gap-y-2 max-w-[850px] mb-6">
          <li className="inline-flex items-center gap-1 rounded-3xl py-2 px-4 bg-[#f3f3f3] max-w-max">
            <h4>Experience:</h4>
            <p className="text-black">{psychologist.experience}</p>
          </li>
          <li className="inline-flex items-center gap-1 rounded-3xl py-2 px-4 bg-[#f3f3f3] max-w-max">
            <h4>License:</h4>
            <p className="text-black">{psychologist.license}</p>
          </li>
          <li className="inline-flex items-center gap-1 rounded-3xl py-2 px-4 bg-[#f3f3f3] max-w-max">
            <h4>Specialization:</h4>
            <p className="text-black">{psychologist.specialization}</p>
          </li>
          <li className="inline-flex items-center gap-1 rounded-3xl py-2 px-4 bg-[#f3f3f3] max-w-max">
            <h4>Initial Consultation:</h4>
            <p className="text-black">{psychologist.initial_consultation}</p>
          </li>
        </ul>

        <p className="mb-[14px] font-normal leading-[125%] text-primary-base/50">
          {psychologist.about}
        </p>

        {!showReviews && (
          <button
            onClick={handleReadMoreClick}
            className="text-black underline decoration-skip-ink-none"
          >
            Read more
          </button>
        )}

        {showReviews && (
          <div className="mt-[34px] max-w-[758px]">
            <ul className="mb-10">
              {psychologist.reviews.map((review, index) => (
                <li key={index} className="mb-[25px]">
                  <div className="flex gap-3">
                    {renderAvatar(review.reviewer)}
                    <div>
                      <p className="leading-[125%] text-black">
                        {review.reviewer}
                      </p>
                      <p className="inline-flex items-center text-sm leading-[129%] text-black">
                        <Icon
                          name="icon-star"
                          className="size-[16px] mr-2"
                        ></Icon>
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

            <Button
              type="button"
              variant="filled"
              onClick={() =>
                router.push(`/psychologists/${psychologist.name}/appointment`, {
                  scroll: false,
                })
              }
            >
              Make an appointment
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
