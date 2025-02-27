import PsychologistCard from '@/ui/psychologists/psychologist-card';
import { Psychologist } from '@/lib/definitions';

interface PsychologistsListProps {
  psychologists: Psychologist[];
}

export default function PsychologistsList({
  psychologists,
}: PsychologistsListProps) {
  if (!psychologists) {
    return <p>No psychologists found.</p>;
  }

  return (
    <ul className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
      {psychologists.map((psychologist: Psychologist) => (
        <li
          key={psychologist.id}
          className="sm:flex gap-6 p-4 sm:p-5 lg:p-6 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-[rgb(248,248,248)] font-medium text-base leading-[150%] text-light-color"
        >
          <PsychologistCard psychologist={psychologist} />
        </li>
      ))}
    </ul>
  );
}
