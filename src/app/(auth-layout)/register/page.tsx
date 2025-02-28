'use client';

import RegisterForm from '@/ui/auth/register-form';

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[640px] p-[22px] sm:p-[44px]">
        <RegisterForm />
      </div>
    </div>
  );
}
