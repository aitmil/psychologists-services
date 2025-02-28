import { MouseEventHandler } from 'react';
import Icon from '@/ui/icon';

interface IconButtonProps {
  icon: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  title: string;
  className?: string;
  iconClassName?: string;
}

export default function IconButton({
  icon,
  onClick,
  title,
  className = '',
  iconClassName = '',
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus:outline-hidden transition-all duration-200 ease-in-out 
			active:scale-90 ${className}`}
      title={title}
      aria-label={title}
    >
      <Icon name={icon} className={iconClassName} />
    </button>
  );
}
