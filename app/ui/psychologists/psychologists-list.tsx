import { psychologists } from '@/mock-data';
import PsychologistCard from './psychologist-card';

export default function PsychologistsList() {
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
