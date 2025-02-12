import Image from 'next/image';

interface AvatarProps {
  imageUrl: string;
  size: number;
}

export default function Avatar({ imageUrl, size }: AvatarProps) {
  return (
    <Image
      width={size}
      height={size}
      src={imageUrl}
      alt="Photo of psychologist"
      className="rounded-[15px]"
    />
  );
}
