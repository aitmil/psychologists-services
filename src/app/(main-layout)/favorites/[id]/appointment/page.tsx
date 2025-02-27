import AppointmentForm from '@/ui/psychologists/appointment-form';

export default function Page() {
  return (
    <div className="flex flex-grow justify-center">
      <div className="bg-white w-full max-w-[640px] md:max-w-[566px] p-[22px] sm:p-[44px] lg:p-[64px] md:rounded-[20px] lg:rounded-[30px] md:mt-9">
        <AppointmentForm />
      </div>
    </div>
  );
}
