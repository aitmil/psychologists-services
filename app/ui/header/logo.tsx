import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className=" text-[20px] leading-[120%] tracking-[-0.02em] ">
      <span className="font-bold text-orange-light">psychologists</span>
      <span className="font-medium text-orange-light">.</span>
      <span className="font-semibold">services</span>
    </Link>
  );
}
