'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { selectUser } from '@/lib/redux/auth/selectors';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Psychologists', href: '/psychologists' },
  { name: 'Favorites', href: '/favorites' },
];

export default function Navigation() {
  const pathname = usePathname();
  const user = useSelector(selectUser);

  return (
    <nav className="flex gap-[40px]">
      {links
        .filter(link => !(link.name === 'Favorites' && !user))
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
