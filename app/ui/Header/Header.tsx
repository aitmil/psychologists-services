import { useState } from "react";
import { Flex } from "antd";
import HeaderBtns from "../HeaderBtns";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Container from "../Container/Container";
import css from "./Header.module.css";
import CustomModal from "../common/CustomModal/CustomModal";

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <header className={css.header}>
      <Container>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={130}>
            <Logo />
            <Navigation />
          </Flex>
          <HeaderBtns onClick={handleOpenModal} />
        </Flex>
      </Container>

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel={"Login Modal"}
        handleCloseModal={handleCloseModal}
      >
        {/* <LoginModalContent /> */}
        <p>hello</p>
      </CustomModal>

      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel={"Registration Modal"}
        handleCloseModal={handleCloseModal}
      >
        {/* <RegistrationModalContent /> */}
        <p>hello</p>
      </CustomModal>
    </header>
  );
}
