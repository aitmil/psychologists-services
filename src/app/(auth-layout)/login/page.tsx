'use client';

import LoginForm from '@/ui/auth/login-form';
import Container from '@/ui/container';

export default function Page() {
  return (
    <Container>
      <div className="flex justify-center">
        <div className="bg-white max-w-[566px] p-[64px] mt-9 rounded-[30px]">
          <LoginForm />
        </div>
      </div>
    </Container>
  );
}
