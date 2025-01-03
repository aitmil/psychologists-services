'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Psychologists', href: '/psychologists' },
  { name: 'Favorites', href: '/favorites' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-[40px]">
      {links
        .filter(link => !(link.name === 'Favorites' && pathname === '/'))
        .map(link => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'tracking-[-0.01em] transition-colors duration-200',
              {
                'relative after:content-[""] after:block after:w-[9px] after:h-[8px] after:bg-orange-light after:rounded-full after:absolute after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2':
                  pathname === link.href,
              }
            )}
          >
            {link.name}
          </Link>
        ))}
    </nav>
  );
}
