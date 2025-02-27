'use client';

import Button from '@/ui/button';

export interface HeaderBtnsProps {
  onClickLogin: React.MouseEventHandler<HTMLButtonElement>;
  onClickRegister: React.MouseEventHandler<HTMLButtonElement>;
}

export default function HeaderBtns({
  onClickLogin,
  onClickRegister,
}: HeaderBtnsProps) {
  return (
    <div className="flex gap-2">
      <Button type="button" variant="outlined" onClick={onClickLogin}>
        Log In
      </Button>
      <Button
        type="button"
        variant="filled"
        onClick={onClickRegister}
        className="px-[32px] sm:px-[36px] lg:px-[40px] py-[10px] sm:py-[12px] lg:py-[14px]"
      >
        Registration
      </Button>
    </div>
  );
}
