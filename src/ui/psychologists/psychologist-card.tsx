'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import Avatar from '@/ui/psychologists/avatar';
import FavoriteButton from '@/ui/psychologists/favorite-button';
import PsychologistDetails from '@/ui/psychologists/psychologist-details';
import ReviewsSection from '@/ui/psychologists/reviews-section';
import Button from '@/ui/button';
import Icon from '../icon';
import PsychologistInfo from './psychologist-info';
import { Psychologist } from '@/lib/definitions';
import { selectFavorites } from '@/lib/redux/favorites/selectors';
import { toggleFavorite } from '@/lib/redux/favorites/operations';
import { selectUser } from '@/lib/redux/auth/selectors';

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
  const { favorites } = useAppSelector(selectFavorites);

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
      <div className="size-[120px] p-3 border-2 border-orange-transparent rounded-[30px]">
        <div className="relative">
          <Avatar imageUrl={psychologist.avatar_url} size={96} />
          <Icon
            name="icon-point"
            className="absolute top-0 right-0 w-[14px] h-[14px]"
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <h2>Psychologist</h2>
          <div className="flex gap-[28px] items-center">
            <PsychologistDetails psychologist={psychologist} />
            <FavoriteButton
              isFavorite={favorites.some(fav => fav.id === psychologist.id)}
              onClick={handleFavoriteToggle}
            />
          </div>
        </div>
        <PsychologistInfo psychologist={psychologist} />
        {!showReviews ? (
          <button
            onClick={() => setShowReviews(true)}
            className="text-black underline"
          >
            Read more
          </button>
        ) : (
          <div className="mt-[34px] max-w-[758px]">
            <ReviewsSection reviews={psychologist.reviews} />
            <Button
              type="button"
              variant="filled"
              onClick={handleAppointmentClick}
            >
              Make an appointment
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
