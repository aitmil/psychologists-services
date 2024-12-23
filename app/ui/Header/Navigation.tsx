import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();

  const getLinkClass = (path: string): string => {
    const isActive = router.pathname === path;
    return `tracking-[-0.01em] transition-colors duration-200 ${
      isActive
        ? 'relative after:content-[""] after:block after:w-[9px] after:h-[8px] after:bg-orange-light after:rounded-full after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2'
        : ''
    }`;
  };

  return (
    <nav className="flex gap-[40px]">
      <Link href="/">
        <a className={getLinkClass('/')}>Home</a>
      </Link>
      <Link href="/psychologists">
        <a className={getLinkClass('/psychologists')}>Psychologists</a>
      </Link>
      <Link href="/favorites">
        <a className={getLinkClass('/favorites')}>Favorites</a>
      </Link>
    </nav>
  );
}
