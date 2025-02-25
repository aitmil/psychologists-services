import Icon from '../icon';
import clsx from 'clsx';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export default function FavoriteButton({
  isFavorite,
  onClick,
}: FavoriteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="focus:outline-hidden bg-transparent border-none"
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Icon
        name="icon-heart"
        className={clsx('size-[26px]', {
          'stroke-black fill-transparent': !isFavorite,
          'stroke-transparent fill-orange-light': isFavorite,
        })}
      />
    </button>
  );
}
