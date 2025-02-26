import { motion } from 'framer-motion';
import Navigation from '@/ui/header/navigation';
import UserProfile from '@/ui/header/user-profile';
import IconButton from '@/ui/icon-button';
import Button from '@/ui/button';
import HeaderBtns from './headerBtns';

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
      className="fixed top-0 right-0 h-full bg-[#f3f3f3] z-50 flex flex-col items-center gap-10 shadow-lg 
                 w-full sm:w-[375px] px-6 py-8 sm:rounded-l-2xl"
    >
      <IconButton
        icon="icon-cross"
        onClick={toggleMenu}
        title="Close Mobile Menu"
        className="absolute top-4 right-4 stroke-black hover:stroke-gray-600 active:stroke-gray-600"
        iconClassName="size-8"
      />

      {user && <UserProfile name={user.name} />}

      <Navigation isMobileMenuOpen={isOpen} toggleMobileMenu={toggleMenu} />

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
