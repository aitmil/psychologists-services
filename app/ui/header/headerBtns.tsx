import Button from '@/app/ui/buttons';

export interface HeaderBtnsProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function HeaderBtns({ onClick }: HeaderBtnsProps) {
  return (
    <div className="flex gap-2">
      <Button type="button" variant="outlined" onClick={onClick}>
        Log In
      </Button>
      <Button type="button" variant="filled" onClick={onClick}>
        Registration
      </Button>
    </div>
  );
}
