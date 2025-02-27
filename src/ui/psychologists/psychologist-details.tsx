import Icon from '../icon';
import { Psychologist } from '@/lib/definitions';

interface PsychologistDetailsProps {
  psychologist: Psychologist;
}

export default function PsychologistDetails({
  psychologist,
}: PsychologistDetailsProps) {
  return (
    <ul className="sm:flex text-black">
      <li className="flex gap-1 items-center mb-1 sm:mb-0">
        <Icon name="icon-star" className="size-[16px]" />
        <h4>Rating:</h4>
        <p className="pr-[16px]">{psychologist.rating}</p>
      </li>
      <li className="flex gap-1 items-center">
        <h4 className="sm:pl-[16px] sm:border-l-[1px] border-l-primary-base/20">
          Price / 1 hour:
        </h4>
        <p className="text-green">{psychologist.price_per_hour}$</p>
      </li>
    </ul>
  );
}
