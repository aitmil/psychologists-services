'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import Avatar from '@/ui/psychologists/avatar';
import PsychologistDetails from '@/ui/psychologists/psychologist-details';
import ReviewsSection from '@/ui/psychologists/reviews-section';
import Button from '@/ui/button';
import Icon from '../icon';
import PsychologistInfo from './psychologist-info';
import { Psychologist } from '@/lib/definitions';
import { selectFavorites } from '@/lib/redux/favorites/selectors';
import { toggleFavorite } from '@/lib/redux/favorites/operations';
import { selectUser } from '@/lib/redux/auth/selectors';
import IconButton from '../icon-button';
import clsx from 'clsx';

interface PsychologistCardProps {
  psychologist: Psychologist;
}

export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  const [showReviews, setShowReviews] = useState(false);

  const router = useRouter();
  const path = usePathname();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { allFavorites } = useAppSelector(selectFavorites);

  const isFavorite = allFavorites.some(fav => fav.id === psychologist.id);

  const handleFavoriteToggle = () => {
    if (!user) {
      toast.warning('Please log in to add a psychologist to favorites');
      router.push('/login');
      return;
    }
    dispatch(toggleFavorite({ userId: user.id, psychologist }));
  };

  const handleAppointmentClick = () => {
    if (!user) {
      toast.warning('Please log in to make an appointment');
      router.push('/login');
      return;
    } else {
      if (path === '/favorites') {
        router.push(`/favorites/${psychologist.id}/appointment`);
      } else {
        router.push(`/psychologists/${psychologist.id}/appointment`);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-start sm:block">
        <div className="flex sm:block gap-3">
          <div className="size-[100px] sm:size-[120px] p-2 sm:p-3 mb-3 sm:mb-0 flex justify-center items-center border-2 border-orange-transparent rounded-[22px] sm:rounded-[26px] lg:rounded-[30px]">
            <div className="relative">
              <Avatar imageUrl={psychologist.avatar_url} size={96} />
              <Icon
                name="icon-point"
                className="absolute top-0 right-0 w-[14px] h-[14px]"
              />
            </div>
          </div>
          <div className="flex sm:hidden gap-[28px] items-center justify-between sm:justify-start ">
            <PsychologistDetails psychologist={psychologist} />
          </div>
        </div>
        <div className="sm:hidden">
          <IconButton
            icon="icon-heart"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={handleFavoriteToggle}
            iconClassName={clsx('size-[26px]', {
              'stroke-black fill-transparent hover:stroke-gray-600 active:stroke-gray-600':
                !isFavorite,
              'stroke-transparent fill-orange-light hover:fill-orange-dark active:fill-orange-dark':
                isFavorite,
            })}
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="sm:flex justify-between mb-2">
          <h2 className="mb-1 sm:mb-0">Psychologist</h2>
          <h3 className="sm:hidden mb-4 text-2xl leading-[100%] text-black">
            {psychologist.name}
          </h3>
          <div className="hidden sm:flex gap-[28px] items-center justify-between sm:justify-start ">
            <PsychologistDetails psychologist={psychologist} />
            <IconButton
              icon="icon-heart"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              onClick={handleFavoriteToggle}
              iconClassName={clsx('size-[26px]', {
                'stroke-black fill-transparent': !isFavorite,
                'stroke-transparent fill-orange-light': isFavorite,
              })}
            />
          </div>
        </div>
        <h3 className="hidden sm:inline-block sm:mb-5 lg:mb-6 text-2xl leading-[100%] text-black">
          {psychologist.name}
        </h3>
        <PsychologistInfo psychologist={psychologist} />
        {!showReviews ? (
          <button
            onClick={() => setShowReviews(true)}
            className="text-black underline  transition-colors duration-200  hover:text-orange-dark active:text-orange-dark active:opacity-70"
          >
            Read more
          </button>
        ) : (
          <div className="mt-[26px] sm:mt-[30px] lg:mt-[34px] max-w-[758px]">
            <ReviewsSection reviews={psychologist.reviews} />
            <Button
              type="button"
              variant="filled"
              onClick={handleAppointmentClick}
              className="px-[32px] sm:px-[36px] lg:px-[40px] py-[10px] sm:py-[12px] lg:py-[14px] "
            >
              Make an appointment
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
