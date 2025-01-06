import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-bold text-[20px] leading-[120%] tracking-[-0.02em] text-orange-light"
    >
      <span className="font-medium">psychologists</span>
      <span className="font-semibold text-main-color">.</span>
      <span className="font-semibold">services</span>
    </Link>
  );
}
