'use client';

import Button from '@/app/ui/button';

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
      <Button type="button" variant="filled" onClick={onClickRegister}>
        Registration
      </Button>
    </div>
  );
}
