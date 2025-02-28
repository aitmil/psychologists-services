'use client';

import LoginForm from '@/ui/auth/login-form';

export default function Page() {
  return (
    <div className="flex justify-center ">
      <div className="w-full max-w-[640px] p-[22px] sm:p-[44px]">
        <LoginForm isModal={false} />
      </div>
    </div>
  );
}
