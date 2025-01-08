'use client';

// import { useState } from 'react';
import HeaderBtns from '@/app/ui/header/headerBtnss';
import Logo from '@/app/ui/header/logos';
import Navigation from '@/app/ui/header/navigations';
import Container from '@/app/ui/containers';
// import CustomModal from '@/app/ui/CustomModal';

export default function Header() {
  //   const [isModalOpen, setModalOpen] = useState(false);

  //   const handleOpenModal = () => setModalOpen(true);
  //   const handleCloseModal = () => setModalOpen(false);

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

      {/* <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel={'Login Modal'}
        handleCloseModal={handleCloseModal}
      >
        <LoginModalContent />
        <p>hello</p>
      </CustomModal>

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel={'Registration Modal'}
        handleCloseModal={handleCloseModal}
      >
        <RegistrationModalContent />
        <p>hello</p>
      </CustomModal> */}
    </header>
  );
}
