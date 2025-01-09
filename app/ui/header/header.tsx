'use client';

import HeaderBtns from '@/app/ui/header/headerBtns';
import Logo from '@/app/ui/header/logo';
import Navigation from '@/app/ui/header/navigation';
import Container from '@/app/ui/container';

export default function Header() {
  return (
    <header className="py-8 border-b border-border-color">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[130px]">
            <Logo />
            <Navigation />
          </div>
          <HeaderBtns onClick={() => console.log('handleOpenModal')} />
        </div>
      </Container>
    </header>
  );
}
