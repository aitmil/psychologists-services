'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ref, get, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import clsx from 'clsx';
import Icon from '../icon';
import Button from '../button';
import { Psychologist } from '@/lib/definitions';

import { selectFavorites } from '@/lib/redux/psychologists/selectors';
import { db } from '@/lib/firebase/firebase';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addFavorite, removeFavorite } from '@/lib/redux/psychologists/slice';

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
          // Dispatch to update the Redux state with the user's favorites
          const favorites = snapshot.val();
          if (Array.isArray(favorites)) {
            favorites.forEach((id: string) => {
              dispatch(addFavorite(id));
            });
          }
        }
      });
    }
  }, [user, dispatch, userFavoritesRef]);

  const handleFavoriteToggle = () => {
    if (!user) {
      alert('Please log in to add psychologist to favorites');
      router.push('/login');
      return;
    }

    get(userFavoritesRef)
      .then(snapshot => {
        let favorites: string[] = snapshot.val() || [];

        // If the favorites data is an object (nested), convert it to an array
        if (typeof favorites === 'object' && !Array.isArray(favorites)) {
          favorites = Object.values(favorites); // Convert to array if it's an object
        }

        // Check if the psychologist is already in the favorites list
        if (favorites.includes(psychologist.id)) {
          // Remove the psychologist from favorites if already added
          favorites = favorites.filter((id: string) => id !== psychologist.id);
          dispatch(removeFavorite(psychologist.id)); // Remove from Redux
        } else {
          // Add the psychologist to favorites if not already added
          favorites.push(psychologist.id); // Add to the array
          dispatch(addFavorite(psychologist.id)); // Add to Redux
        }

        // Ensure favorites is an array when updating the Firebase database
        update(userFavoritesRef, { favorites }) // Write the flat array of IDs
          .catch(error => {
            console.error('Error updating favorites:', error);
            alert(
              'An error occurred while updating your favorites. Please try again later.'
            );
          });
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
        alert(
          'An error occurred while retrieving your favorites. Please try again later.'
        );
      });
  };

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

  const isUserFavorite = favoritesState.includes(psychologist.id);

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
            <button
              type="button"
              onClick={handleFavoriteToggle}
              className="focus:outline-hidden, bg-transparent, border-none"
            >
              <Icon
                name="icon-heart"
                className={clsx('size-[26px]', {
                  'stroke-black fill-transparent': !isUserFavorite,
                  'stroke-transparent fill-orange-light': isUserFavorite,
                })}
              ></Icon>
            </button>
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
