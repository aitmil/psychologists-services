'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import HeaderBtns from '@/ui/header/headerBtns';
import Logo from '@/ui/header/logo';
import Navigation from '@/ui/header/navigation';
import Container from '@/ui/container';
import { auth } from '@/lib/firebase/firebase';
import Icon from '@/ui/icon';
import Button from '@/ui/button';
import { setUser, clearUser } from '@/lib/redux/auth/slice';
import { clearData } from '@/lib/redux/favorites/slice';
import { selectUser } from '@/lib/redux/auth/selectors';

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        dispatch(
          setUser({
            name: currentUser.displayName || 'Anonymous',
            email: currentUser.email || '',
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

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

  return (
    <header className="py-8 border-b border-border-color">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[130px]">
            <Logo />
            <Navigation />
          </div>
          {user ? (
            <div className="flex items-center gap-[28px]">
              <div className="flex items-center gap-[14px]">
                <div className="flex justify-center items-center size-10 rounded-xl bg-orange-light">
                  <Icon name="icon-user" className="size-[24px]"></Icon>
                </div>
                <span className="font-medium">{user.name}</span>
              </div>

              <Button type="submit" onClick={handleLogout} variant="outlined">
                Logout
              </Button>
            </div>
          ) : (
            <HeaderBtns
              onClickLogin={() => router.push('/login', { scroll: false })}
              onClickRegister={() =>
                router.push('/register', { scroll: false })
              }
            />
          )}
        </div>
      </Container>
    </header>
  );
}
