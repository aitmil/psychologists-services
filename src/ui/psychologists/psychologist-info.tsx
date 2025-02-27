import { Psychologist } from '@/lib/definitions';

interface PsychologistInfoProps {
  psychologist: Psychologist;
}

export default function PsychologistInfo({
  psychologist,
}: PsychologistInfoProps) {
  return (
    <>
      <ul className="flex flex-wrap gap-x-1 gap-y-2 max-w-[850px] mb-4 sm:mb-5 lg:mb-6">
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
      <p className="mb-[10px] sm:mb-[12px] lg:mb-[14px] font-normal leading-[125%] text-primary-base/50">
        {psychologist.about}
      </p>
    </>
  );
}
