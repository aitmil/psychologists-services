import { useSelector } from 'react-redux';

import PsychologistCard from './psychologist-card';
import { selectPsychologists } from '@/app/lib/redux/psychologists/selectors';

export default function PsychologistsList() {
  const psychologists = useSelector(selectPsychologists);

  if (!psychologists) {
    return <p>No psychologists found.</p>;
  }
  return (
    <ul className="flex flex-col gap-8">
      {psychologists.map((psychologist, index) => (
        <li
          key={index}
          className="flex gap-[24px] p-[24px] rounded-[24px] bg-[rgb(248,248,248)] font-medium text-base leading-[150%] text-light-color"
        >
          <PsychologistCard psychologist={psychologist} />
        </li>
      ))}
    </ul>
  );
}
