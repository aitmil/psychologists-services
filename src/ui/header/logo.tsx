import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-base sm:text-lg md:text-xl leading-[120%] tracking-[-0.02em]  transition-colors duration-200  active:opacity-70"
    >
      <span className="font-bold text-orange-light hover:text-orange-dark active:text-orange-dark">
        psychologists
      </span>
      <span className="font-medium text-orange-light hover:text-orange-dark active:text-orange-dark">
        .
      </span>
      <span className="font-semibold hover:text-gray-600 active:text-gray-600">
        services
      </span>
    </Link>
  );
}
