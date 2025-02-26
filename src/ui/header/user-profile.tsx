import Icon from '@/ui/icon';

interface UserProfileProps {
  name: string;
}

export default function UserProfile({ name }: UserProfileProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-[14px]">
      <div className="flex justify-center items-center size-10 rounded-xl bg-orange-light">
        <Icon name="icon-user" className="size-[24px]" />
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
}
