import React from 'react';
import Modal from 'react-modal';

import css from './CustomModal.module.css';

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

Modal.setAppElement('#root');

export default function CustomModal({
  isOpen,
  onRequestClose,
  contentLabel,
  handleCloseModal,
  children,
}: CustomModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button type="button" onClick={handleCloseModal}>
        Close
      </button>
      {children}
    </Modal>
  );
}
