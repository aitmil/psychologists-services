'use client';

import RegisterForm from '@/ui/auth/register-form';

export default function Page() {
  return (
    <div className="flex flex-grow justify-center">
      <div className="bg-white max-w-[640px] md:max-w-[566px] md:max-h-[688px] lg:max-h-[738px] p-[22px] sm:p-[44px] lg:p-[64px] md:rounded-[20px] lg:rounded-[30px] md:mt-9">
        <RegisterForm />
      </div>
    </div>
  );
}
