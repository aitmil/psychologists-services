'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import HeaderBtns from '@/ui/header/headerBtns';
import Logo from '@/ui/header/logo';
import Navigation from '@/ui/header/navigation';
import Container from '@/ui/container';
import IconButton from '@/ui/icon-button';
import Button from '@/ui/button';
import MobileMenu from '@/ui/header/mobile-menu';
import UserProfile from '@/ui/header/user-profile';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { clearUser } from '@/lib/redux/auth/slice';
import { clearData } from '@/lib/redux/favorites/slice';
import { selectUser } from '@/lib/redux/auth/selectors';

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      dispatch(clearData());
      router.push('/');
      toast.success('You have been logged out');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  const handleLogin = () => router.push('/login', { scroll: false });
  const handleRegister = () => router.push('/register', { scroll: false });
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="py-4 md:py-6 xl:py-8 border-b border-border-color">
      <Container>
        <div className="flex items-center justify-between">
          <Logo />

          <div className="hidden lg:flex">
            <Navigation
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>

          {user ? (
            <div className="hidden lg:flex items-center gap-[28px]">
              <UserProfile name={user.name} />
              <Button type="submit" onClick={handleLogout} variant="outlined">
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex">
              <HeaderBtns
                onClickLogin={handleLogin}
                onClickRegister={handleRegister}
              />
            </div>
          )}

          <IconButton
            icon="icon-IoReorderThreeOutline"
            onClick={toggleMobileMenu}
            title="Toggle Mobile Menu"
            className="lg:hidden hover:fill-gray-600 active:fill-gray-600"
            iconClassName="size-8"
          />
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              isOpen={isMobileMenuOpen}
              toggleMenu={toggleMobileMenu}
              user={user}
              onLogout={handleLogout}
              onLogin={handleLogin}
              onRegister={handleRegister}
            />
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
