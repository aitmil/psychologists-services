'use client';

import { useState, useEffect } from 'react';
import IconButton from '@/ui/icon-button';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <IconButton
          icon="icon-chevron-down"
          onClick={scrollToTop}
          title="Scroll to top"
          iconClassName="rotate-180 size-7 sm:size-8 lg:size-9"
          className="fixed bottom-4 sm:bottom-8 lg:bottom-10 right-4 sm:right-6 lg:right-8 p-1 sm:p-2 bg-orange-light border border-none rounded-full z-50 hover:bg-orange-dark active:bg-orange-dark"
        />
      )}
    </>
  );
};

export default ScrollToTopButton;
