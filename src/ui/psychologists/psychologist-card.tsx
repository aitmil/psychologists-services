'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';

import { Psychologist } from '@/lib/definitions';
import { db } from '@/lib/firebase/firebase';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addFavorite, removeFavorite } from '@/lib/redux/psychologists/slice';
import { selectFavorites } from '@/lib/redux/psychologists/selectors';

import Avatar from '@/ui/psychologists/avatar';
import FavoriteButton from '@/ui/psychologists/favorite-button';
import PsychologistDetails from '@/ui/psychologists/psychologist-details';
import ReviewsSection from '@/ui/psychologists/reviews-section';
import Button from '@/ui/button';
import Icon from '../icon';
import PsychologistInfo from './psychologist-info';

interface PsychologistCardProps {
  psychologist: Psychologist;
}

export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  const [showReviews, setShowReviews] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = getAuth().currentUser;
  const favoritesState = useAppSelector(selectFavorites);
  const userFavoritesRef = ref(db, `users/${user?.uid}/favorites`);

  useEffect(() => {
    if (user) {
      get(userFavoritesRef).then(snapshot => {
        if (snapshot.exists()) {
          const favorites = snapshot.val();
          if (Array.isArray(favorites)) {
            favorites.forEach((id: string) => dispatch(addFavorite(id)));
          }
        }
      });
    }
  }, [user, dispatch, userFavoritesRef]);

  const handleFavoriteToggle = () => {
    if (!user) {
      alert('Please log in to add a psychologist to favorites');
      router.push('/login');
      return;
    }

    get(userFavoritesRef)
      .then(snapshot => {
        let favorites: string[] = snapshot.val() || [];

        if (typeof favorites === 'object' && !Array.isArray(favorites)) {
          favorites = Object.values(favorites);
        }

        if (favorites.includes(psychologist.id)) {
          favorites = favorites.filter(id => id !== psychologist.id);
          dispatch(removeFavorite(psychologist.id));
        } else {
          favorites.push(psychologist.id);
          dispatch(addFavorite(psychologist.id));
        }

        set(userFavoritesRef, favorites).catch(error => {
          console.error('Error updating favorites:', error);
          alert('An error occurred while updating your favorites.');
        });
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
        alert('An error occurred while retrieving your favorites.');
      });
  };

  return (
    <>
      <div className="size-[120px] p-3 border-2 border-orange-transparent rounded-[30px]">
        <div className="relative">
          <Avatar imageUrl={psychologist.avatar_url} size={96} />
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
            <PsychologistDetails psychologist={psychologist} />
            <FavoriteButton
              isFavorite={favoritesState.includes(psychologist.id)}
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
              onClick={() =>
                router.push(`/psychologists/${psychologist.id}/appointment`)
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
