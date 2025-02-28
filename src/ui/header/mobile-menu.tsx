import { motion } from 'framer-motion';
import Navigation from '@/ui/header/navigation';
import UserProfile from '@/ui/header/user-profile';
import IconButton from '@/ui/icon-button';
import Button from '@/ui/button';
import HeaderBtns from './headerBtns';
import { useEffect } from 'react';

interface MobileMenuProps {
  user: { name: string } | null;
  isOpen: boolean;
  toggleMenu: () => void;
  onLogout: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export default function MobileMenu({
  user,
  isOpen,
  toggleMenu,
  onLogout,
  onLogin,
  onRegister,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLogout = () => {
    onLogout();
    toggleMenu();
  };
  const handleLogin = () => {
    onLogin();
    toggleMenu();
  };
  const handleRegister = () => {
    onRegister();
    toggleMenu();
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 right-0 h-full overflow-y-auto bg-[#f3f3f3] z-50 flex flex-col items-center gap-10 shadow-lg 
                 w-full sm:w-[375px] px-6 py-20 sm:rounded-l-2xl"
    >
      <IconButton
        icon="icon-cross"
        onClick={toggleMenu}
        title="Close Mobile Menu"
        className="absolute top-5 right-5 bg-transparent stroke-black hover:stroke-gray-600 active:stroke-gray-600"
        iconClassName="size-8"
      />

      {user && (
        <div className="border-b border-border-color w-full pb-10">
          <UserProfile name={user.name} />
        </div>
      )}

      <div className="border-b border-border-color w-full pb-10">
        <Navigation isMobileMenuOpen={isOpen} toggleMobileMenu={toggleMenu} />
      </div>

      {user ? (
        <Button type="submit" onClick={handleLogout} variant="outlined">
          Logout
        </Button>
      ) : (
        <div className="sm:hidden">
          <HeaderBtns
            onClickLogin={handleLogin}
            onClickRegister={handleRegister}
          />
        </div>
      )}
    </motion.div>
  );
}
